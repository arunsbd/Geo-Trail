import { ClueLadderGame } from '@/components/ClueLadderGame';
import { loadPlayablePuzzles } from '@/lib/clue-ladder/playable';
export const metadata = { title: 'GeoTrail — Clue Ladder', description: 'Guess a mystery U.S. state in seven clues. Play the three-state Clue Ladder preview.' };
export default function ClueLadderPage() {
 return <ClueLadderGame puzzles={loadPlayablePuzzles()} />;
}
