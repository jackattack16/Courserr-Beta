import type Class from './Class';
import type { FilterState } from './filterTypes';
import { getSubjectClass } from './classUtilities';

const subjectMap: Record<string, string> = {
  "Agriculture": "agriculture",
  "Arts": "arts",
  "Business": "business",
  "CTE": "cte",
  "English": "english",
  "Mathematics": "mathematics",
  "Music": "music",
  "Physical Education": "physical",
  "Science": "science",
  "Social Studies": "socialstudies",
  "World Languages": "language",
  "Information Solutions": "informationsolutions",
};

export default function applyFilters(course: Class, activeFilters: FilterState): boolean {
  const { Subject, ClassType, Duration, DualCredit, GradeLevel } = activeFilters;

  if (Subject.length > 0) {
    const courseSubject = getSubjectClass(course.getSubject());
    const normalizedFilters = Subject.map(s => subjectMap[s] || s.toLowerCase());
    if (!normalizedFilters.includes(courseSubject)) return false;
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
