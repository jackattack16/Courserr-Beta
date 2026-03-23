import type Class from './Class';
import type { FilterState } from './filterTypes';

export default function applyFilters(course: Class, activeFilters: FilterState): boolean {
  const { Subject, ClassType, Duration, DualCredit, GradeLevel } = activeFilters;

  if (Subject.length > 0 && !Subject.includes(course.getSubject())) {
    return false;
  }

  if (ClassType.length > 0) {
    const courseType = course.getHonorsAP();
    if (!ClassType.includes(courseType)) return false;
  }

  if (Duration.length > 0 && !Duration.includes(course.getDuration())) {
    return false;
  }

  if (DualCredit.length > 0) {
    const courseDC = course.dualCredit ? 'Yes' : 'No';
    if (!DualCredit.includes(courseDC)) return false;
  }

  if (GradeLevel.length > 0) {
    const courseGrades = course.getUsualGrade().split(',');
    const match = GradeLevel.some(g => courseGrades.includes(g));
    if (!match) return false;
  }

  return true;
}
