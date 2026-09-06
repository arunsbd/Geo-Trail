/** Research handoff batch 01; exact clue rows are parsed from the archived review. */
export const BATCH_01 = {
  AK: {name: 'Alaska', fips: '02', capital: 'Juneau', order: ['population.0_5-1m', 'history.1950s', 'area.rank-1-5', 'highpoint.15000-plus', 'time.alaska-aleutian', 'parks.formal-8', 'postal']},
  AZ: {name: 'Arizona', fips: '04', capital: 'Phoenix', order: ['time.mountain-all', 'highpoint.12000-13000', 'parks.formal-3', 'history.1900-1920', 'population.7-8m', 'cities.top2-2025', 'postal']},
  AR: {name: 'Arkansas', fips: '05', capital: 'Little Rock', order: ['parks.formal-1', 'time.central-all', 'population.3-3_5m', 'history.1830s', 'area.rank-26-30', 'cities.top2-2025', 'postal']},
  CA: {name: 'California', fips: '06', capital: 'Sacramento', order: ['history.1840-1860', 'area.rank-1-5', 'population.30m-plus', 'time.pacific-all', 'business.google-first-office', 'cities.top2-2025', 'postal']},
  CT: {name: 'Connecticut', fips: '09', capital: 'Hartford', order: ['history.1788', 'parks.formal-0', 'time.eastern-all', 'area.rank-46-50', 'highpoint.2000-2500', 'cities.top2-2025', 'postal']},
  DE: {name: 'Delaware', fips: '10', capital: 'Dover', order: ['parks.formal-0', 'population.1-1_5m', 'area.rank-46-50', 'history.1787', 'time.eastern-all', 'highpoint.under-500', 'postal']},
} as const;
