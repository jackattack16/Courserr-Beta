import '../Styles/ClassInfoArea.css'
import Prerequisite from './Prerequisite';
import Icon from './Icon';
import ListElement from './ListElement';
import type Class from '../assets/Class';
import { getSubjectClass, subjectToIcon, titleCase, getPrereqCourseId } from '../assets/classUtilities';
import { useParams } from 'react-router-dom';
import courseMap from '../assets/ClassInstantiation';



function ClassInfoArea() {
  const { id } = useParams();
  const course: Class = courseMap.get(Number(id));

  const nameOfClass:string = course.getClassName() || 'Untitled Class';
  const subjectClass:string = getSubjectClass(course.getSubject());
  const iconName = subjectToIcon[subjectClass] || 'science_off';


  const prerequisitesArray:string[] = course.getPrerequisite().split(/[,;]|\s+or\s+/i);
  
  const showPrereqs: boolean = prerequisitesArray[0] !== "None";
  console.log(showPrereqs);
  return (
    <main>
      <section className={`class-info-header ${subjectClass}`}>
        <div className='class-info-half'>
          <div className='class-info-title'>
            <h1>{nameOfClass}</h1>
            <hr></hr>
            <div>
              <Icon name={iconName}/>
              <h2 className='department'>{titleCase(subjectClass + " department")}</h2>
            </div>
          </div>
        </div>
        <div className='class-info-half'>
          <div className='class-info-fourth tags'>
            <h2>Prerequisites</h2>
            <ul className='no-bullets'>
              {
                showPrereqs ?
                  prerequisitesArray.map((course, index) => (
                    <Prerequisite key={index} course={course} courseId={getPrereqCourseId(course)}/>
                  ))
                  :
                  <ListElement/>
                }
            </ul>
          </div>
          <div className='class-info-fourth'>
            <h2>Quick Look</h2>
            <ul className='no-bullets'>
              <ListElement/>
            </ul>
          </div>
        </div>
      </section>
    </main>
  )
}

export default ClassInfoArea;