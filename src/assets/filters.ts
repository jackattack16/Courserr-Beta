const subjects: string[] = [
  "Agriculture",
  "Arts",
  "Business",
  "CTE",
  "English",
  "Mathematics",
  "Music",
  "Physical Education",
  "Science",
  "Social Studies",
  "World Languages",
  "Information Solutions",
];

const classTypes: string[] = ["Normal", "Honors", "AP"];
const durations: string[] = ["Semester", "Year"];
const dualCreditOptions: string[] = ["Yes", "No"];
const gradeLevels: string[] = ["9", "10", "11", "12"];

const filters = {
  Subject: subjects,
  ClassType: classTypes,
  Duration: durations,
  DualCredit: dualCreditOptions,
  GradeLevel: gradeLevels,
};

export type FilterCategory = keyof typeof filters;

export default filters;
