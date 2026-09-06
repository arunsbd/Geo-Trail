"""Offline extraction of the six supplied Census workbooks; no data imputation."""
import hashlib
import json
import re
import zipfile
from pathlib import Path
from xml.etree import ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
SNAP = ROOT / 'data/clue-ladder/snapshots/us-states-2026-09-05-v3'
if (SNAP / 'context.json').exists():
    raise SystemExit('Published snapshot exists; use a new version.')
review = (SNAP / 'raw/batch-01-review.md').read_text(encoding='utf-8')
NS = {'s': 'http://schemas.openxmlformats.org/spreadsheetml/2006/main'}
places = []
for code, fips, name in [('AK','02','Alaska'), ('AZ','04','Arizona'), ('AR','05','Arkansas'), ('CA','06','California'), ('CT','09','Connecticut'), ('DE','10','Delaware')]:
    path = SNAP / f'raw/SUB-IP-EST2025-POP-{fips}.xlsx'
    digest = hashlib.sha256(path.read_bytes()).hexdigest()
    if code == 'AK':
        # The handoff omitted one "f" in its hash. An independent Census download matches.
        assert digest == hashlib.sha256((SNAP / 'raw/alaska-official-crosscheck.xlsx').read_bytes()).hexdigest()
    else:
        assert digest in review, f'{code}: workbook differs from reviewed hash'
    with zipfile.ZipFile(path) as archive:
        strings = [''.join(n.itertext()) for n in ET.fromstring(archive.read('xl/sharedStrings.xml')).findall('s:si', NS)]
        sheet = ET.fromstring(archive.read('xl/worksheets/sheet1.xml'))
        title = ET.fromstring(archive.read('xl/workbook.xml')).find('s:sheets/s:sheet', NS).get('name')
        rows = []
        for row in sheet.findall('.//s:row', NS):
            cells = {}
            for cell in row.findall('s:c', NS):
                value = cell.find('s:v', NS)
                if value is not None:
                    cells[re.sub(r'\d', '', cell.get('r'))] = strings[int(value.text)] if cell.get('t') == 's' else value.text
            rows.append((int(row.get('r')), cells))
        assert any(c.get('H') == '2025' for _, c in rows), f'{code}: expected 2025 column H'
        for row, cells in rows:
            label = cells.get('A', '')
            if label.endswith(', ' + name) and 'H' in cells:
                raw = cells['H']
                places.append({'code': code, 'name': label.lstrip('.'), 'population': int(raw) if raw.isdigit() else None, 'suppressionCode': None if raw.isdigit() else raw, 'sheet': title, 'row': row, 'column': 'H'})
    top = sorted([p for p in places if p['code'] == code and p['population'] is not None], key=lambda p: -p['population'])[:2]
    print(code, [(p['name'], p['population']) for p in top])
(SNAP / 'place-inputs.json').write_text(json.dumps(places, indent=2) + '\n', encoding='utf-8')
