import { loadDataset } from '../lib/clue-ladder/load';
import { validateDataset } from '../lib/clue-ladder/validate';
import { compileAllLadders } from '../lib/clue-ladder/compile';

const data=loadDataset('us-states-2026-09-06-v1');
const diagnostics=validateDataset(data,true);
let ladders=0;
if(!diagnostics.some(d=>d.severity==='error')) {
  try { ladders=compileAllLadders(data,data.snapshot.clueSetVersion).length; }
  catch(error) { diagnostics.push({severity:'error',code:'COMPILE',path:data.snapshot.snapshotId,message:String(error)}); }
}
const errors=diagnostics.filter(d=>d.severity==='error');
console.log(`Clue Ladder dataset\nStates loaded: ${data.states.length}\nFacts validated: ${data.facts.length}\nApproved clues: ${data.clues.filter(c=>c.review.status==='approved').length}\nLadders compiled: ${ladders}\nErrors: ${errors.length}\nWarnings: ${diagnostics.filter(d=>d.severity==='warning').length}`);
for(const diagnostic of diagnostics) console.log(`${diagnostic.severity.toUpperCase()} ${diagnostic.code}: ${diagnostic.path}: ${diagnostic.message}`);
if(errors.length) process.exitCode=1;
