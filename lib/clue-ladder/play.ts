import type { StateCode } from '../../data/states';
import type { ClueCategory } from './types';
export type MapHintTopic = 'time-zones' | 'parks';
export type PlayablePuzzle = {
 id: string; answer: StateCode; name: string;
 clues: { text: string; category: ClueCategory; mapHintTopics: MapHintTopic[]; image?: string }[];
 maxByRung: number[]; wrongGuessPenalty: number;
};
export type Round = { rung: number; guesses: StateCode[]; status: 'playing' | 'won' | 'lost'; score: number };
export const MAP_HINT_PENALTY = 150;
export const newRound = (): Round => ({rung: 0, guesses: [], status: 'playing', score: 0});
export function availableScore(puzzle: PlayablePuzzle, round: Round, extraPenalty = 0): number {
 return Math.max(0, puzzle.maxByRung[round.rung] - round.guesses.length * puzzle.wrongGuessPenalty - extraPenalty);
}
export function play(puzzle: PlayablePuzzle, round: Round, guess?: StateCode, extraPenalty = 0): Round {
 if (round.status !== 'playing' || (guess && round.guesses.includes(guess))) return round;
 if (guess === puzzle.answer) return {...round, guesses: [...round.guesses, guess], status: 'won', score: availableScore(puzzle, round, extraPenalty)};
 const guesses = guess ? [...round.guesses, guess] : round.guesses;
 return {...round, guesses, rung: Math.min(round.rung + 1, puzzle.clues.length - 1), status: round.rung === puzzle.clues.length - 1 ? 'lost' : 'playing'};
}
export function choosePuzzle(count: number, previous: number | null, random: number): number {
 if (count < 1 || random < 0 || random >= 1) throw new Error('Invalid puzzle selection');
 if (count === 1) return 0;
 const index = Math.floor(random * (previous === null ? count : count - 1));
 return previous !== null && index >= previous ? index + 1 : index;
}

export function hasRevealedMapHint(
 puzzle: PlayablePuzzle,
 rung: number,
 topic: MapHintTopic,
): boolean {
 return puzzle.clues.slice(0, rung + 1).some(clue => clue.mapHintTopics.includes(topic));
}
