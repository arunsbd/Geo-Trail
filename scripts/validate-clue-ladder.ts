import { loadDataset } from '../lib/clue-ladder/load';
import { validateDataset, validateLadder } from '../lib/clue-ladder/validate';
import { compileLadder, cumulativeCandidates, publishManifest } from '../lib/clue-ladder/compile';
import { readFileSync, writeFileSync } from 'node:fs';
const data = loadDataset('us-states-2026-09-05-v1');
const diagnostics = validateDataset(data, true);
const compiled = [];
for (const state of data.states) {
    try {
        const manifest = compileLadder(data, state.stateId, 'milestone-v1');
        const clues = manifest.orderedClueIds.map(id => data.clues.find(c => c.clueId === id)!);
        compiled.push({ answerStateId: state.stateId, manifest, cumulativeCandidateCounts: cumulativeCandidates(clues, data.universe) });
        if (process.argv.includes('--write-manifests'))
            publishManifest(`data/clue-ladder/ladders/manifests/${manifest.puzzleId}.json`, manifest, data);
    }
    catch (error) {
        diagnostics.push({ severity: 'error', code: 'COMPILE', path: state.stateId, message: String(error) });
    }
}
const audit = JSON.parse(readFileSync('data/clue-ladder/review/audited-examples.json', 'utf8'));
const samples = Object.entries(audit.sampleLadders as Record<string, string[]>).map(([code, ids]) => {
    const clues = ids.map(id => data.clues.find(c => c.clueId === id)!);
    const errors = validateLadder(clues, data);
    return { state: code, expectedEarlyCounts: audit.earlyCounts[code], knownEarlyCounts: cumulativeCandidates(clues, data.universe).slice(0, 4), fullyValidated: errors.length === 0, errors };
});
for (const entry of compiled)
    for (const [i, count] of entry.cumulativeCandidateCounts.slice(0, 4).entries()) {
        const [min, max] = data.rules.preferredEarlyCounts[i];
        if (count < min || count > max)
            diagnostics.push({ severity: 'warning', code: 'EARLY_SELECTIVITY', path: `${entry.answerStateId}/rung-${i + 1}`, message: `${count} candidates outside preferred ${min}–${max}; editorial review recommended` });
    }
const summary = { statesLoaded: data.states.length, factsValidated: data.facts.length, approvedClues: data.clues.filter(c => c.review.status === 'approved').length, laddersCompiled: compiled.length, errors: diagnostics.filter(d => d.severity === 'error').length, warnings: diagnostics.filter(d => d.severity === 'warning').length, auditedSampleLaddersValidated: samples.filter(s => s.fullyValidated).length };
const report = { snapshotId: data.snapshot.snapshotId, summary, diagnostics, samples, compiled };
if (process.argv.includes('--json'))
    console.log(JSON.stringify(report, null, 2));
else {
    console.log(`Clue Ladder dataset\nStates loaded: ${summary.statesLoaded}\nFacts validated: ${summary.factsValidated}\nApproved clues: ${summary.approvedClues}\nLadders compiled: ${summary.laddersCompiled}\nErrors: ${summary.errors}\nWarnings: ${summary.warnings}\nAudited sample ladders fully validated: ${summary.auditedSampleLaddersValidated}/${samples.length}`);
    for (const d of diagnostics)
        console.log(`${d.severity.toUpperCase()} ${d.code} ${d.path}: ${d.message}`);
    for (const sample of samples.filter(s => !s.fullyValidated))
        console.log(`BLOCKED audited ${sample.state} sample: ${sample.errors.map(e => e.message).join('; ')}`);
}
if (process.argv.includes('--write-report'))
    writeFileSync('data/clue-ladder/review/validation-report.json', JSON.stringify(report, null, 2) + '\n');
if (summary.errors || (process.argv.includes('--require-audited-samples') && samples.some(s => !s.fullyValidated)))
    process.exitCode = 1;
