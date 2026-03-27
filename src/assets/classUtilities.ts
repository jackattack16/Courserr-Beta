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
  if (s.includes('physical') || s === 'pe' || s.includes('education')) return 'pe';
  if (s.includes('science') || s.includes('chem') || s.includes('bio') || s.includes('physics')) return 'science';
  if (s.includes('social') || s.includes('history') || s.includes('studies')) return 'socialstudies';
  if (s.includes('world') || s.includes('language') || s.includes('foreign')) return 'language';
  if (s.includes('english')) return 'english';
  if (s.includes('health')) return 'health';

  return 'misc';
}

export function getDepartment(subject?: string): string {
  if (!subject) return 'misc';
  const s = subject.toLowerCase();

  if (s.includes('agri') || s.includes('agriculture')) return 'Agriculture Department';
  if (s.includes('cte') || s.includes('manufactur') || s.includes('technology') || s.includes('engineering') || s.includes('applied')) return 'Career Technical Education Department';
  if (s.includes('art') || s.includes('arts') || s.includes('arteducation')) return 'Arts Department';
  if (s.includes('business') || s.includes('finance') || s.includes('marketing') || s.includes('management')) return 'Business Department';
  if (s.includes('human') || s.includes('services') || s.includes('humanservices')) return 'Human Services Department'; 
  if (s.includes('information') || s.includes('solution')) return 'Information Solutions Department';
  if (s.includes('math') || s.includes('mathematics')) return 'Mathematics Department';
  if (s.includes('music')) return 'Music Department';
  if (s.includes('physical') || s === 'pe' || s.includes('education')) return 'Physical Education Department';
  if (s.includes('science') || s.includes('chem') || s.includes('bio') || s.includes('physics')) return 'Science Department';
  if (s.includes('social') || s.includes('history') || s.includes('studies')) return 'Social Studies Department';
  if (s.includes('world') || s.includes('language') || s.includes('foreign')) return 'Foreign Language Department';
  if (s.includes('english')) return 'English Department';
  if (s.includes('health')) return 'Health Department';

  return 'Misc Department';
}


// Thanks Genini
export function titleCase(inputString: string) {
  // Convert to lowercase and split into words
  const words = inputString.toLowerCase().split(' ');

  // Capitalize the first letter of each word
  for (let i = 0; i < words.length; i++) {
    words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
  }

  // Join the words back into a sentence and return
  return words.join(' ');
}


// Old function
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

export function calculateScore(course: Class, query: string, fuzzyMatch?: boolean): number {
  let score = 0;
  const className = course.getClassName().toLowerCase();
  const shortName = course.getShortName().toLowerCase();
  const tags = course.getTags().join(' ').toLowerCase();
  const subject = course.getSubject().toLowerCase();
  const description = course.getDescription().toLowerCase();
  
  switch (query) {
    case className:
      score += 10;
      break;
  
    case shortName:
      score += 8;
      break;

    default: {
      if (!fuzzyMatch) break;
      const classNameArray = className.split(" ");
      const queryArray = query.split(" ");

      for (query of queryArray) {
        if (classNameArray.find((namePart) => namePart.includes(query))) {
          score += 2;
        }
      }
      break;
    }
  }

  if (className.startsWith(query)) score += 6;
  if (className.includes(query) || shortName.includes(query)) score += 4;
  if (tags.includes(query)) score += 3;
  if (subject.includes(query)) score += 2;
  if (description.includes(query)) score += 1;

  return score;
}

export function isCloseMatch(course: Class, query: string): boolean {
  const className = course.getClassName().toLowerCase();
  const shortName = course.getShortName().toLowerCase();
  const q = query.toLowerCase();

  return (
    className === q ||
    shortName === q ||
    className.startsWith(q) ||
    (q.length >= 3 && className.includes(q))
  );
}

export function* incrementNumber(start: number) {
  let n = start;
  while(true) {
    yield n++;
  }
}
