import "../Styles/ClassInfoArea.css";
import "../Styles/Chart.css";
import Prerequisite from "./Prerequisite";
import Icon from "./Icon";
import ListElement from "./ListElement";
import type Class from "../assets/Class";
import {
  getSubjectClass,
  subjectToIcon,
  titleCase,
  getPrereqCourseId,
  calculateScore,
} from "../assets/classUtilities";
import { useParams } from "react-router-dom";
import courseMap from "../assets/ClassInstantiation";
import Chart from "./Chart";
import ClassCard from "./ClassCard";

interface classInfoAreaProps {
  bookmark: (course: number) => void;
}
function ClassInfoArea({ bookmark }: classInfoAreaProps) {
  const { id } = useParams();
  const course: Class = courseMap.get(Number(id));

  const nameOfClass: string = course.getClassName() || "Untitled Class";
  const subjectClass: string = getSubjectClass(course.getSubject());
  const iconName = subjectToIcon[subjectClass] || "science_off";
  const description: string = course.getDescription();

  const prerequisitesArray: string[] = course
    .getPrerequisite()
    .split(/[,;]|\s+or\s+/i);

  // Creates an array of JSX elements that map to the prerequsites by catching an error thrown if the class does not exist

  let hasAddedCheckHandbook:boolean = false;
  const mapedPrereqs = prerequisitesArray.map(
    (prereqCourse: string, index: number) => {
      if (prereqCourse === "None") {
        return <ListElement key={index} text="None" />;
      }
      try {
        const courseId = getPrereqCourseId(prereqCourse);
        return (
          <Prerequisite key={index} course={prereqCourse} courseId={courseId} />
        );
      } catch {
        if(!hasAddedCheckHandbook) {
          hasAddedCheckHandbook = true;
          return <ListElement key={index} text="See handbook for more details" type="warning" />;
        }  
      }
    },
  );

  const courses: Class[] = Array.from(courseMap.values());

  const moreLikeThis = courses.filter((courseForFilter) => courseForFilter.getSubject() === course.getSubject());
  console.log(nameOfClass.split(" ")[0]);
  let evenMoreLikeThis = moreLikeThis
    .map(course => ({course, score: calculateScore(course, nameOfClass.split(" ")[0].toLowerCase(), true)}))
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map(item => item.course);

    let i = -1;
    while (evenMoreLikeThis.length < 4) {
      i++;
      if (!evenMoreLikeThis.includes(moreLikeThis[i])) evenMoreLikeThis.push(moreLikeThis[i]);
      if (i > moreLikeThis.length) {
        evenMoreLikeThis.push(courses[i]);
      }
    }

  evenMoreLikeThis = evenMoreLikeThis.slice(1, 5);
  
  console.log(evenMoreLikeThis);
  
  const quickLookItems = [
    {
      label: "Homework",
      value: `${course.getAverageTimePerWeek()} hours / week`,
    },
    { label: "Average Grade", value: course.getAverageGrade() },
    { label: "Duration", value: course.getDuration() },
    { label: "Grade Level", value: course.getUsualGrade() },
    { label: "Dual Credit", value: course.getDualCredit() },
    { label: "Class Type", value: course.getHonorsAP() },
    { label: "Reviews", value: course.getTimePerWeekLog().length },
  ];



  return (
    <main className="class-info-main">
      <section className={`class-info-header ${subjectClass}`}>
        <div className="class-info-half">
          <div className="class-info-title">
            <h1>{nameOfClass}</h1>
            <hr></hr>
            <div>
              <Icon name={iconName} />
              <h2 className="department">
                {titleCase(subjectClass + " department")}
              </h2>
            </div>
          </div>
        </div>
        <div className="class-info-half">
          <div className="class-info-fourth tags">
            <h2>Prerequisites</h2>
            <ul className="no-bullets">
              {mapedPrereqs.map((course) => course)}
            </ul>
          </div>
          <div className="class-info-fourth">
            <h2>Quick Look</h2>
            <ul className="no-bullets">
              {quickLookItems.map((item, index) => ( <ListElement key={index} text={`${item.label}: ${item.value}`}/> ))}
            </ul>
          </div>
        </div>
      </section>
      <div className={`class-info-half-content ${subjectClass}`}><p>{description}</p></div>
      <div className={`class-info-half-content ${subjectClass}`}><Chart course={course} subjectClass={subjectClass}></Chart></div>

      <div className={`more-like-this ${subjectClass}`}>
        <div style={{width: "100"}}><h2>More Like This</h2></div>
        <section className={"more-like-this-container"}>
          {evenMoreLikeThis.map((course) => (
                <ClassCard course={course} key={course.getCourseId()} bookmark={bookmark} filled={false} query={""}/>
              ))}
        </section>
      </div>
      
    </main>
    
  );
}

export default ClassInfoArea;
