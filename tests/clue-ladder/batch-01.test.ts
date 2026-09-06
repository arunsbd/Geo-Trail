import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { loadDataset } from '../../lib/clue-ladder/load';
import { loadPlayablePuzzles } from '../../lib/clue-ladder/playable';
import { candidates } from '../../lib/clue-ladder/predicates';
import { compileLadder, cumulativeCandidates } from '../../lib/clue-ladder/compile';
import { validateDataset, validateManifest } from '../../lib/clue-ladder/validate';
import { choosePuzzle, newRound, play } from '../../lib/clue-ladder/play';
import type { StateId } from '../../lib/clue-ladder/types';

const data = loadDataset('us-states-2026-09-05-v3');
const puzzles = loadPlayablePuzzles();
const report = JSON.parse(readFileSync('data/clue-ladder/review/batch-01-integration.json', 'utf8'));
describe('batch 01 local integration', () => {
  it('validates nine states and 63 approved clues against archived sources', () => {
    expect(validateDataset(data,true).filter(d=>d.severity==='error')).toEqual([]);
    expect(puzzles.map(p=>p.answer).sort()).toEqual(['AK','AL','AR','AZ','CA','CO','CT','DE','RI']);
    expect(data.clues.filter(c=>c.review.status==='approved')).toHaveLength(63);
    expect(puzzles.every(p=>p.clues.length===7)).toBe(true);
  });
  it('reproduces the reviewed candidate memberships and six early-count sequences', () => {
    for (const [id, stored] of Object.entries(report.reviewedCandidateSets)) {
      const clue = data.clues.find(c=>c.clueId===id)!;
      const fresh = candidates(clue.predicate,data.universe,data.facts,data.snapshot.snapshotId);
      expect(fresh.unknownStateIds).toEqual([]);
      expect([...fresh.stateIds].sort()).toEqual(stored);
    }
    const expected = {AK:[5,1,1,1,1,1,1],AZ:[6,2,1,1,1,1,1],AR:[17,4,1,1,1,1,1],CA:[7,2,2,1,1,1,1],CT:[8,6,6,1,1,1,1],DE:[19,3,2,1,1,1,1]};
    for (const [code, counts] of Object.entries(expected)) {
      const manifest = report.compiled.find((p: {manifest:{answerStateId:string}})=>p.manifest.answerStateId===`US-${code}`).manifest;
      expect(validateManifest(manifest,data)).toEqual([]);
      expect(cumulativeCandidates(manifest.orderedClueIds.map((id:string)=>data.clues.find(c=>c.clueId===id)!),data.universe)).toEqual(counts);
      expect(compileLadder(data,`US-${code}` as StateId,'short-seven-batch-01-v1')).toEqual(manifest);
    }
  // Rebuilds six ladders against the full archived fact set; allow for slower CI runners.
  }, 60000);
  it('preserves special cases and exact incorporated-place populations', () => {
    const value = (subject:string, metric:string)=>data.facts.find(f=>f.subjectId===subject && f.metricId===metric)!.value;
    expect(value('US-AK','time.standard_zone')).toEqual(['Alaska','Hawaii-Aleutian']);
    expect(value('US-AZ','boundary.point_contacts')).toContain('US-CO');
    expect(value('US-AZ','boundary.shared_segments')).not.toContain('US-CO');
    expect(value('US-CA','nps.formal_national_park_count')).toBe(9);
    expect(value('US-CT','nps.formal_national_park_count')).toBe(0);
    expect(value('US-DE','nps.formal_national_park_count')).toBe(0);
    expect(value('US-AK','place.top_two')).toEqual(['place:AK:anchorage-municipality','place:AK:juneau-city-and-borough']);
    expect(value('place:AK:anchorage-municipality','place.population_estimate')).toBe(287155);
    expect(value('US-CT','place.top_two')).toEqual(['place:CT:bridgeport-city','place:CT:stamford-city']);
    expect(value('US-AR','place.top_two')).toEqual(['place:AR:little-rock-city','place:AR:fayetteville-city']);
    const google = data.clues.find(c=>c.clueId==='ca.business.google-first-office')!;
    expect(google.render.text?.en).toContain('first office');
    expect(google.candidateSet.stateIds).toEqual(['US-CA']);
    expect(data.clues.filter(c=>c.review.status==='approved').some(c=>c.clueId.includes('borders.segment-count'))).toBe(false);
  });
  it('preserves the original three clue sequences and keeps visual identifiers late', () => {
    for (const old of loadPlayablePuzzles('us-states-2026-09-05-v2')) {
      expect(puzzles.find(p=>p.answer===old.answer)!.clues).toEqual(old.clues);
    }
    for (const puzzle of puzzles) {
      expect(puzzle.clues.slice(0,6).some(c=>c.image || /postal abbreviation/.test(c.text))).toBe(false);
      let round=newRound();
      for(let i=0;i<6;i++) round=play(puzzle,round);
      expect(play(puzzle,round,puzzle.answer).score).toBe(400);
      expect(play(puzzle,round).status).toBe('lost');
    }
  });
  it('makes every state reachable without immediate repeats', () => {
    expect(Array.from({length:puzzles.length},(_,i)=>choosePuzzle(puzzles.length,null,(i+.5)/puzzles.length))).toEqual([0,1,2,3,4,5,6,7,8]);
    for (let previous=0;previous<puzzles.length;previous++) for(let i=0;i<puzzles.length-1;i++) expect(choosePuzzle(puzzles.length,previous,(i+.5)/(puzzles.length-1))).not.toBe(previous);
  });
});
