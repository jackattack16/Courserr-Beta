import '../Styles/CardArea.css'
import ClassCard from './ClassCard';
import courseMap from '../assets/ClassInstantiation';
import Class from '../assets/Class';

function CardArea() {
  // Convert courseMap to array of Class instances
  const courses: Class[] = Array.from(courseMap.values());

  // Distribute courses into 4 columns (round-robin)
  const columns: Class[][] = [[], [], [], []];
  courses.forEach((course, idx) => {
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

export default CardArea;