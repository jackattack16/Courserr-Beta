import '../Styles/CardArea.css'
import ClassCard from './ClassCard';
import courseMap from '../assets/ClassInstantiation';
import Class from '../assets/Class';
import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import useWindowDimensions from '../assets/windowSizeHook';
import { calculateScore } from '../assets/classUtilities';

type CardAreaProps = {
  searchQuery: string;
  bookmark: (course: number) => void;
  bookmarkedClasses: number[];
}

function CardArea({ searchQuery: propSearchQuery, bookmark, bookmarkedClasses }: CardAreaProps) {
  const { width } = useWindowDimensions();

  const numberOfColumns = useMemo(() => {
    const calculated = Math.floor((0.00189189 * width) + 0.635135);
    return Math.max(1, Math.min(6, calculated)); // Clamp between 1 and 6 columns
  }, [width]);

  const [searchParams] = useSearchParams();
  const courses: Class[] = Array.from(courseMap.values());
  
  const urlQuery = searchParams.get('q') || '';
  
  // Use prop search query if available, otherwise use URL query
  const effectiveSearchQuery = propSearchQuery || urlQuery;
  const q = effectiveSearchQuery.toLowerCase();
  const filteredCourses = useMemo(() => {
    if (!effectiveSearchQuery) return courses;  
    return courses
      .map(course => ({course, score: calculateScore(course, q, true)}))
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .map(item => item.course);
  }, [effectiveSearchQuery, courses]);
  
  const columns: Class[][] = Array.from({ length: numberOfColumns }, () => []);
  filteredCourses.forEach((course, idx) => {
    // console.log(course.getClassName());
    const colIndex = idx % numberOfColumns;
    columns[colIndex].push(course);
  });

  return (
    <>
      <main>
        {columns.map((col, ci) => (
          <div className='class-column' key={ci}>
            {col.map((course) => (
              <ClassCard course={course} key={course.getCourseId()} bookmark={bookmark} filled={bookmarkedClasses.includes(course.getCourseId())} query={q}/>
            ))}
          </div>
        ))}
      </main>
    </>
  )
}

export default CardArea;
