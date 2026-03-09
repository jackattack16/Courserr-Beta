import type Class from "./Class";
import courseMap from "./ClassInstantiation";
export const subjectToIcon: Record<string, string> = {
  "agriculture": "agriculture",
  "arts": "palette",
  "business": "business_center",
  "cte": "handyman",
  "english": "auto_stories",
  "mathematics": "calculate",
  "music": "music_note_2",
  "pe": "exercise",
  "science": "rocket",
  "socialstudies": "globe",
  "language": "translate",
  "humanservices": "accessibility_new",
  "informationsolutions": "climate_mini_split",
  "exampleclass": "flutter_dash",
};

export function getSubjectClass(subject?: string): string {
  if (!subject) return 'misc';
  const s = subject.toLowerCase();

  if (s.includes('agri') || s.includes('agriculture')) return 'agriculture';
  if (s.includes('cte') || s.includes('manufactur') || s.includes('technology') || s.includes('engineering') || s.includes('applied')) return 'cte';
  if (s.includes('art') || s.includes('arts') || s.includes('arteducation')) return 'arts';
  if (s.includes('business') || s.includes('finance') || s.includes('marketing') || s.includes('management')) return 'business';
  if (s.includes('human') || s.includes('services') || s.includes('humanservices')) return 'humanservices';
  if (s.includes('information') || s.includes('solution')) return 'informationsolutions';
  if (s.includes('math') || s.includes('mathematics')) return 'mathematics';
  if (s.includes('music')) return 'music';
  if (s.includes('physical') || s === 'pe' || s.includes('education')) return 'physical';
  if (s.includes('science') || s.includes('chem') || s.includes('bio') || s.includes('physics')) return 'science';
  if (s.includes('social') || s.includes('history') || s.includes('studies')) return 'socialstudies';
  if (s.includes('world') || s.includes('language') || s.includes('foreign')) return 'language';
  if (s.includes('english')) return 'english';
  if (s.includes('health')) return 'health';

  return 'misc';
}


// Thanks Genini
export function titleCase(inputString: string) {
  // Convert to lowercase and split into words
  let words = inputString.toLowerCase().split(' ');

  // Capitalize the first letter of each word
  for (let i = 0; i < words.length; i++) {
    words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
  }

  // Join the words back into a sentence and return
  return words.join(' ');
}


// Old function
// TODO: Rewrite this to make it better
export function getPrereqCourseId(className: string):number {

  // Find course by name to get its ID
  const allCourses = Array.from(courseMap.values());

  // 1. Try exact match
  let targetCourse:Class = allCourses.find(c => c.getClassName() === className);

  // 2. Try case-insensitive exact match
  if (!targetCourse) {
    targetCourse = allCourses.find(c => c.getClassName().toLowerCase() === className.toLowerCase());
  }

  if (!targetCourse) {
    throw new Error('Course Not Found');
  }



  return targetCourse.getCourseId();
}