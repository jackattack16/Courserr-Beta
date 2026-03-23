import type { FilterCategory } from './filters';

export type FilterState = Record<FilterCategory, string[]>;

export const emptyFilters: FilterState = {
  Subject: [],
  ClassType: [],
  Duration: [],
  DualCredit: [],
  GradeLevel: [],
};

export function filtersCount(filters: FilterState): number {
  return Object.values(filters).reduce((sum, arr) => sum + arr.length, 0);
}
