import { describe, it, expect } from 'vitest';
import { loadPlayablePuzzles } from '../../lib/clue-ladder/playable';
import { choosePuzzle, newRound, play } from '../../lib/clue-ladder/play';
import { loadDataset } from '../../lib/clue-ladder/load';
import { compileLadder } from '../../lib/clue-ladder/compile';
import { validateDataset, validateLadder } from '../../lib/clue-ladder/validate';
const puzzles = loadPlayablePuzzles();
describe('seven-round playable edition', () => {
 it('loads three independently validated manifests with no economy or industry clues', () => {
  const data = loadDataset('us-states-2026-09-05-v2');
  expect(validateDataset(data, true).filter(d => d.severity === 'error')).toEqual([]);
  expect(puzzles).toHaveLength(3);
  for (const puzzle of puzzles) {
   expect(puzzle.clues).toHaveLength(7);
   expect(puzzle.clues.slice(0, 6).every(c => !c.image)).toBe(true);
   expect(puzzle.clues[6].image).toMatch(/^data:image\/svg\+xml;base64,/);
   expect(puzzle.clues.every(c => !/GDP|contributed|manufacturing/i.test(c.text))).toBe(true);
  }
  for (const state of data.states) {
   expect(compileLadder(data, state.stateId, 'short-seven-v1')).toEqual(compileLadder(data, state.stateId, 'short-seven-v1'));
  }
  const ladder = compileLadder(data, 'US-AL', 'short-seven-v1').orderedClueIds.map(id => data.clues.find(c => c.clueId === id)!);
  [ladder[0], ladder[6]] = [ladder[6], ladder[0]];
  expect(validateLadder(ladder, data).some(d => d.code === 'LADDER_RUNG')).toBe(true);
 });
 it('wins at every rung, scores correctly, and locks after a win', () => {
  for (const puzzle of puzzles) for (let rung = 0; rung < 7; rung++) {
   let round = newRound();
   for (let i = 0; i < rung; i++) round = play(puzzle, round);
   round = play(puzzle, round, puzzle.answer);
   expect(round.status).toBe('won');
   expect(round.score).toBe(1000 - rung * 100);
   expect(play(puzzle, round, 'CA')).toEqual(round);
  }
 });
 it('handles wrong guesses, duplicates, skips, penalties, and loss', () => {
  const puzzle = puzzles[0];
  let round = play(puzzle, newRound(), 'CA');
  expect(round.rung).toBe(1);
  expect(play(puzzle, round, 'CA')).toBe(round);
  expect(play(puzzle, round, puzzle.answer).score).toBe(850);
  for (let i = 0; i < 6; i++) round = play(puzzle, round);
  expect(round.status).toBe('lost');
  expect(round.rung).toBe(6);
  expect(round.score).toBe(0);
  expect(play(puzzle, round, puzzle.answer)).toBe(round);
 });
 it('selects every puzzle and never repeats the previous state', () => {
  for (const random of [0, .33, .66, .9999]) for (const previous of [0, 1, 2]) {
   expect(choosePuzzle(3, previous, random)).not.toBe(previous);
   expect(choosePuzzle(3, previous, random)).toBeLessThan(3);
  }
  expect([0, .34, .67].map(r => choosePuzzle(3, null, r))).toEqual([0,1,2]);
 });
});
