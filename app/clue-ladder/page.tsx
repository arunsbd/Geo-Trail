import { ClueLadderGame } from '@/components/ClueLadderGame';
import { loadPlayablePuzzles } from '@/lib/clue-ladder/playable';
export const metadata = { title: 'GeoTrail — Clue Ladder', description: 'Guess a mystery U.S. state in seven clues. Explore all 50 states in Clue Ladder.' };
export default function ClueLadderPage() {
 return <ClueLadderGame puzzles={loadPlayablePuzzles()} />;
}
