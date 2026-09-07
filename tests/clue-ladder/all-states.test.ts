import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { loadDataset } from '../../lib/clue-ladder/load';
import { compileAllLadders, cumulativeCandidates } from '../../lib/clue-ladder/compile';
import { candidates } from '../../lib/clue-ladder/predicates';
import { deriveValue } from '../../lib/clue-ladder/derive';
import { validateDataset, validateLadder } from '../../lib/clue-ladder/validate';
import { STATE_CODES } from '../../data/states';
import type { PuzzleManifest } from '../../lib/clue-ladder/types';
import { loadPlayablePuzzles } from '../../lib/clue-ladder/playable';

const data = loadDataset('us-states-2026-09-06-v1');
const report = JSON.parse(readFileSync('data/clue-ladder/review/all-states-integration.json','utf8'));
const value = (subject:string,metric:string) => data.facts.find(f=>f.subjectId===subject&&f.metricId===metric)!;
describe('all-state local Clue Ladder',()=>{
  it('serves all 50 states through the default game loader',()=>{
    const puzzles=loadPlayablePuzzles();
    expect(puzzles.map(p=>p.answer).sort()).toEqual([...STATE_CODES].sort());
    expect(puzzles.every(p=>p.clues.length===7)).toBe(true);
  },180000);
  it('validates all 50 fixtures, 350 approved clues and every archived source hash',()=>{
    expect(data.states.map(s=>s.postalCode).sort()).toEqual([...STATE_CODES].sort());
    expect(data.clues.filter(c=>c.review.status==='approved')).toHaveLength(350);
    expect(validateDataset(data,true).filter(d=>d.severity==='error')).toEqual([]);
    expect(data.sources.filter(s=>s.sourceId.startsWith('ALL50:'))).toHaveLength(150);
  },30000);
  it('recompiles all saved manifests deterministically and respects seven-rung restrictions',()=>{
    const compiled=compileAllLadders(data,'short-seven-all-states-v1');
    expect(compiled).toEqual(report.compiled.map((entry:{manifest:PuzzleManifest})=>entry.manifest));
    for(const manifest of compiled){
      const persisted=JSON.parse(readFileSync(`data/clue-ladder/ladders/manifests/${manifest.puzzleId}.json`,'utf8'));
      expect(manifest).toEqual(persisted);
      expect(manifest.dataSnapshotId).toBe('us-states-2026-09-06-v1');
      const clues=manifest.orderedClueIds.map(id=>data.clues.find(c=>c.clueId===id)!);
      expect(validateLadder(clues,data)).toEqual([]);
      expect(clues).toHaveLength(7);
      expect(clues.slice(0,6).some(c=>['abbreviation','silhouette','map_position'].includes(c.category))).toBe(false);
      expect(cumulativeCandidates(clues,data.universe).at(-1)).toBe(1);
    }
  },180000);
  it('reproduces every approved candidate set without missing-state assumptions',()=>{
    for(const clue of data.clues.filter(c=>c.review.status==='approved')){
      const fresh=candidates(clue.predicate,data.universe,data.facts,data.snapshot.snapshotId);
      expect(fresh.unknownStateIds,clue.clueId).toEqual([]);
      expect(fresh.stateIds,clue.clueId).toEqual([...clue.candidateSet.stateIds].sort());
      expect(fresh.stateIds).toContain(clue.answerStateId);
    }
  });
  it('derives city pairs from complete observations and retains legal entity names',()=>{
    for(const sid of data.universe.filter(s=>s!=='US-HI')){
      const fact=value(sid,'place.top_two');
      expect(deriveValue(fact,data.facts)).toEqual(fact.value);
      const published=data.facts.filter(f=>f.metricId==='place.population_estimate'&&f.universe===`${sid}:published-incorporated-place-estimates`&&typeof f.value==='number');
      expect(new Set(fact.derivation!.inputFactIds)).toEqual(new Set(published.map(f=>f.factId)));
    }
    expect(value('US-AL','place.top_two').value).toContain('place:AL:huntsville-city');
    expect(value('US-KY','place.top_two').value).toEqual(['place:KY:louisville-jefferson-county-metro-government-balance-','place:KY:lexington-fayette-urban-county']);
    const kentucky=data.facts.find(f=>f.subjectId===(value('US-KY','place.top_two').value as string[])[0]&&f.metricId==='place.population_estimate')!;
    expect(kentucky.sourceRefs[0].rowKey).toContain('Louisville/Jefferson County metro government (balance), Kentucky');
    expect(value('US-ME','place.top_two').value).toEqual(['place:ME:portland-city','place:ME:lewiston-city']);
    expect(value('US-MD','place.top_two').value).toEqual(['place:MD:baltimore-city','place:MD:frederick-city']);
  },30000);
  it('distinguishes Hawaii CDPs, duplicate place names and multistate NPS associations',()=>{
    expect(value('US-HI','place.incorporated_ids').value).toEqual([]);
    expect(value('US-HI','place.incorporated_place_count').value).toBe(0);
    expect(value('US-HI','place.top_two').value).toEqual([]);
    expect(data.facts.filter(f=>f.metricId==='place.population_estimate'&&f.subjectId.startsWith('place:MN:st-anthony-city:'))).toHaveLength(2);
    const yellowstone=data.clues.find(c=>c.clueId==='wy.nps.yellowstone')!;
    expect(yellowstone.candidateSet.stateIds).toEqual(['US-ID','US-MT','US-WY']);
    expect(yellowstone.render.text?.en).toContain('NPS lists');
    expect(data.clues.find(c=>c.clueId==='nv.nps.lake-mead')!.candidateSet.stateIds).toEqual(['US-AZ','US-NV']);
    expect(value('US-NM','boundary.point_contacts').value).toContain('US-UT');
    expect(value('US-NM','boundary.shared_segments').value).not.toContain('US-UT');
    expect(value('US-RI','boundary.audited_water').value).toContain('US-NY');
  });
  it('preserves the previous nine states and rejects tampered candidate membership',()=>{
    const previous=loadDataset('us-states-2026-09-05-v3');
    for(const old of previous.clues.filter(c=>c.review.status==='approved')){
      const current=data.clues.find(c=>c.clueId===old.clueId)!;
      expect(current.render).toEqual(old.render);
      expect(current.ladderPolicy).toEqual(old.ladderPolicy);
    }
    const clue=data.clues.find(c=>c.clueId==='wy.nps.yellowstone')!;
    const changed={...data,clues:data.clues.map(c=>c===clue?{...c,candidateSet:{...c.candidateSet,stateIds:['US-WY' as const],count:1}}:c)};
    expect(validateDataset(changed).some(d=>d.code==='CANDIDATE_STALE'&&d.path===clue.clueId)).toBe(true);
  },30000);
});
