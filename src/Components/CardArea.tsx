import '../Styles/CardArea.css'
import ClassCard from './ClassCard';
import Icon from './Icon';
import courseMap from '../assets/ClassInstantiation';
import Class from '../assets/Class';
import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import useWindowDimensions from '../assets/windowSizeHook';
import { calculateScore } from '../assets/classUtilities';
import type { FilterState } from '../assets/filterTypes';
import applyFilters from '../assets/applyFilters';
import AddReview from './addReview';

type CardAreaProps = {
  searchQuery: string;
  bookmark: (course: number) => void;
  bookmarkedClasses: number[];
  activeFilters: FilterState;
}

function CardArea({ searchQuery: propSearchQuery, bookmark, bookmarkedClasses, activeFilters }: CardAreaProps) {
  const { width } = useWindowDimensions();

  const numberOfColumns = useMemo(() => {
    const calculated = Math.floor((0.00189189 * width) + 0.635135);
    return Math.max(1, Math.min(6, calculated)); // Clamp between 1 and 6 columns
  }, [width]);

  const [searchParams] = useSearchParams();
  const courses: Class[] = useMemo(() => Array.from(courseMap.values()), []);

  const urlQuery = searchParams.get('q') || '';

  const filteredCourses = useMemo(() => {
    // Apply filters first
    let filtered = courses.filter(course => applyFilters(course, activeFilters));

    // Then apply search
    const effectiveSearchQuery = propSearchQuery || urlQuery;
    if (effectiveSearchQuery) {
      const q = effectiveSearchQuery.toLowerCase();
      filtered = filtered
        .map(course => ({ course, score: calculateScore(course, q, true) }))
        .filter(item => item.score > 0)
        .sort((a, b) => b.score - a.score)
        .map(item => item.course);
    }

    return filtered;
  }, [courses, activeFilters, propSearchQuery, urlQuery]);

  const columns: Class[][] = Array.from({ length: numberOfColumns }, () => []);
  filteredCourses.forEach((course, idx) => {
    const colIndex = idx % numberOfColumns;
    columns[colIndex].push(course);
  });

  const effectiveSearchQuery = propSearchQuery || urlQuery;
  const q = effectiveSearchQuery.toLowerCase();

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
      <AddReview/>
    </>
  )
}

export default CardArea;
