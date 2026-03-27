import Icon from "./Icon";
import '../Styles/ClassCard.css'
import '../Styles/classColours.css'
import Class from '../assets/Class';
import { Link } from "react-router-dom";
import { getSubjectClass, subjectToIcon } from "../assets/classUtilities";
import { memo } from 'react';

interface Props {
  course: Class;
  bookmark: (course: number) => void;
  filled: boolean;
  query: string;
}

const ClassCard = memo(function ClassCard({ course, bookmark, filled, query }: Props) {
  const title:string = course.getShortName() || 'Untitled Class';
  const description:string = course.getDescription() || '';
  const subjectClass:string = getSubjectClass(course.getSubject());
  const courseID:number = course.getCourseId();
  
  const iconName = subjectToIcon[subjectClass] || 'science_off';

  const preloadClassInfo = () => {
    import('./ClassInfoArea');
  };

  const updateBookmark = () => {
    bookmark(courseID);
  }

  const scrollUp = () => {
    document.documentElement.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    const mainElement = document.querySelector('main');
    if (mainElement) {
      mainElement.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
  }

  return (
    <>
      <div className={`class-card ${subjectClass}`}>
        <div className="class-card-header">
          <Icon name={iconName} className="class-card-icon" />
          <h1><Link to={`/class/${courseID}`} className="card-link" onMouseEnter={preloadClassInfo} onClick={scrollUp}><span>{highlightText(title, query)}</span></Link></h1>
          <button className="invisible-button" onClick={updateBookmark}><Icon name="bookmark" className="class-card-icon" filled={filled}/></button>
          
        </div>
        <p className="class-card-description"><span>{highlightText(description, query)}</span></p>
      </div>
    </>
  );
});

function highlightText(text: string, query: string) {
  if (!query) return text;
  // return text;
  const parts = text.split(new RegExp(`(${query})`, 'gi'));

  return parts.map((part, i) => 
    part.toLowerCase() === query.toLowerCase() 
      ? <mark key={i} style={{ background: "#fde68a", borderRadius: '2px'}}>{part}</mark>
      : part
  );
}

export default ClassCard;
