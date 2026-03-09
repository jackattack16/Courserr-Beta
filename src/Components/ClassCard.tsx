import Icon from "./Icon";
import '../Styles/ClassCard.css'
import '../Styles/classColours.css'
import Class from '../assets/Class';
import { Link } from "react-router-dom";
import { getSubjectClass, subjectToIcon } from "../assets/classUtilities";

interface Props {
  course: Class;
}

function ClassCard({ course }: Props) {
  const title:string = course.getShortName() || 'Untitled Class';
  const description:string = course.getDescription() || '';
  const subjectClass:string = getSubjectClass(course.getSubject());
  const courseID:number = course.getCourseId();
  
  const iconName = subjectToIcon[subjectClass] || 'science_off';

  const preloadClassInfo = () => {
    import('./ClassInfoArea')
  };

  return (
    <>
      <div className={`class-card ${subjectClass}`}>
        <div className="class-card-header">
          <Icon name={iconName} className="class-card-icon" />
          <h1><Link to={`/class/${courseID}`} className="card-link" onMouseEnter={preloadClassInfo}>{title}</Link></h1>
          <Icon name="bookmark" className="class-card-icon" />
        </div>
        <p className="class-card-description">{description}</p>
      </div>
    </>
  );
}

export default ClassCard;
