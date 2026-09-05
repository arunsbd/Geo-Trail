import { createGenerator } from 'ts-json-schema-generator';
import { writeFileSync } from 'node:fs';
const types = {
  state: 'StateRecord', source: 'SourceRecord', 'source-locator': 'SourceLocator',
  metric: 'MetricDefinition', fact: 'FactRecord', boundary: 'BoundaryRecord',
  park: 'ParkAssociation', asset: 'AssetRecord', clue: 'ClueRecord',
  predicate: 'Predicate', 'puzzle-manifest': 'PuzzleManifest',
};
for (const [name, type] of Object.entries(types)) {
  const schema = createGenerator({ path: 'lib/clue-ladder/types.ts', type,
    tsconfig: 'tsconfig.json', additionalProperties: false }).createSchema(type);
  writeFileSync(`data/clue-ladder/schema/${name}.schema.json`, JSON.stringify(schema, null, 2) + '\n');
}
