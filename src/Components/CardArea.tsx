import '../Styles/CardArea.css'
import ClassCard from './ClassCard';
import courseMap from '../assets/ClassInstantiation';
import Class from '../assets/Class';
import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

type CardAreaProps = {
  searchQuery: string;
}

function CardArea({ searchQuery: propSearchQuery }: CardAreaProps) {
  const [searchParams] = useSearchParams();
  const courses: Class[] = Array.from(courseMap.values());
  
  const urlQuery = searchParams.get('q') || '';
  
  // Use prop search query if available, otherwise use URL query
  const effectiveSearchQuery = propSearchQuery || urlQuery;

  const filteredCourses = useMemo(() => {
    if (!effectiveSearchQuery) return courses;
    
    const q = effectiveSearchQuery.toLowerCase();
    
    return courses
      .map(course => ({
        course,
        score: calculateScore(course, q)
      }))
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .map(item => item.course);
  }, [effectiveSearchQuery, courses]);

  const columns: Class[][] = [[], [], [], []];
  filteredCourses.forEach((course, idx) => {
    const colIndex = idx % 4;
    columns[colIndex].push(course);
  });

  return (
    <>
      <main>
        {columns.map((col, ci) => (
          <div className='class-column' key={ci}>
            {col.map((course) => (
              <ClassCard course={course} key={course.getCourseId()} />
            ))}
          </div>
        ))}
      </main>
    </>
  )
}

function calculateScore(course: Class, query: string): number {
  let score = 0;
  const className = course.getClassName().toLowerCase();
  const shortName = course.getShortName().toLowerCase();
  const tags = course.getTags().join(' ').toLowerCase();
  const subject = course.getSubject().toLowerCase();
  const description = course.getDescription().toLowerCase();

  if (className === query) score += 10;
  if (shortName === query) score += 8;

  if (className.includes(query)) score += 5;
  if (shortName.includes(query)) score += 4;
  if (tags.includes(query)) score += 3;
  if (subject.includes(query)) score += 2;
  if (description.includes(query)) score += 1;

  return score;
}

export default CardArea;
