import { Link } from 'react-router-dom';
import '../Styles/List-Elements.css'

type prereqPorps = {
  course: string;
  courseId: number;
}

function Prerequisite({ course, courseId }: prereqPorps) {
  return (
    <Link to={`/class/${courseId}`} className='no-color-link'>
      <li>
        <button className='list-element prereq-button'>
          {course}
        </button>
      </li>
    </Link>
  )
}

export default Prerequisite;