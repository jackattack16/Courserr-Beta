import "../Styles/ClassInfoArea.css";
import "../Styles/Chart.css";
import Prerequisite from "./Prerequisite";
import Icon from "./Icon";
import ListElement from "./ListElement";
import type Class from "../assets/Class";
import {
  getSubjectClass,
  subjectToIcon, getPrereqCourseId,
  calculateScore,
  getDepartment
} from "../assets/classUtilities";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useCallback, useEffect, useRef, useMemo } from "react";
import courseMap from "../assets/ClassInstantiation";
import Chart from "./Chart";
import ClassCard from "./ClassCard";

interface classInfoAreaProps {
  onHomeClick: () => void;
  bookmark: (course: number) => void;
  bookmarkedClasses: number[];
  registerExitTrigger?: (fn: () => void) => void;
}
function ClassInfoArea({ bookmark, bookmarkedClasses, onHomeClick, registerExitTrigger }: classInfoAreaProps) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isExiting, setIsExiting] = useState(false);
  const isAnimatingRef = useRef(false);

  const triggerExit = useCallback(() => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    setIsExiting(true);
    onHomeClick();
  }, [onHomeClick]);

  useEffect(() => {
    registerExitTrigger?.(triggerExit);
  }, [registerExitTrigger, triggerExit]);

  // Browser back button: push extra history entry so first back triggers animation
  useEffect(() => {
    window.history.pushState(null, '', '');
    const onPopState = () => {
      if (!isAnimatingRef.current) {
        triggerExit();
      }
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, [triggerExit]);

  useEffect(() => {
    if (isExiting) {
      const timer = setTimeout(() => {
        navigate('/', { replace: true });
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [isExiting, navigate]);
  const course: Class = courseMap.get(Number(id));

  const nameOfClass: string = useMemo(() => course.getClassName() || "Untitled Class", [course]);
  const subjectClass: string = useMemo(() => getSubjectClass(course.getSubject()), [course]);
  const iconName = subjectToIcon[subjectClass] || "science_off";
  const description: string = course.getDescription();

  const prerequisitesArray: string[] = useMemo(() => 
    course.getPrerequisite().split(/[,;]|\s+or\s+/i),
    [course]
  );

  // Creates an array of JSX elements that map to the prerequsites by catching an error thrown if the class does not exist
  const mapedPrereqs = useMemo(() => {
    let hasAddedCheckHandbook = false;
    const results = [];
    
    for (let index = 0; index < prerequisitesArray.length; index++) {
      const prereqCourse = prerequisitesArray[index];
      if (prereqCourse === "None") {
        results.push(<ListElement key={index} text="None" />);
        continue;
      }
      let courseId;
      try {
        courseId = getPrereqCourseId(prereqCourse);
      } catch {
        if(!hasAddedCheckHandbook) {
          hasAddedCheckHandbook = true;
          results.push(<ListElement key={index} text="See handbook for more details" type="warning" />);
        }
        continue;
      }
      results.push(
        <Prerequisite key={index} course={prereqCourse} courseId={courseId} />
      );
    }
    
    return results;
  }, [prerequisitesArray]);
  const updateBookmark = () => {
    bookmark(course.getCourseId());
  }

  const courses: Class[] = useMemo(() => Array.from(courseMap.values()), []);

  const moreLikeThis = useMemo(() => 
    courses.filter((courseForFilter) => courseForFilter.getSubject() === course.getSubject()),
    [courses, course]
  );
  
  // Memoize the first word of the class name for search
  const firstWord = useMemo(() => nameOfClass.split(" ")[0].toLowerCase(), [nameOfClass]);
  
  // Memoize evenMoreLikeThis calculation
  const evenMoreLikeThis = useMemo(() => {
    const results = moreLikeThis
      .map(c => ({course: c, score: calculateScore(c, firstWord, true)}))
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .map(item => item.course);

    // Fill to at least 4 items if possible
    let i = -1;
    while (results.length < 4 && i < moreLikeThis.length - 1) {
      i++;
      if (!results.includes(moreLikeThis[i])) {
        results.push(moreLikeThis[i]);
      }
    }
    
    // If still not enough, fill from all courses
    if (results.length < 4) {
      let j = 0;
      while (results.length < 4 && j < courses.length) {
        if (!results.includes(courses[j])) {
          results.push(courses[j]);
        }
        j++;
      }
    }

    // Skip the first item (current course) and take next 4
    return results.slice(1, 5);
  }, [moreLikeThis, firstWord, courses]);
  
  const quickLookItems = useMemo(() => [
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
  ], [course]);


  return (
     <main className={`class-info-main${isExiting ? ' page-exit' : ''}`}>
      <section className={`class-info-header ${subjectClass}`}>
        <div className="class-info-half">
          <div className="class-info-title">
             <button className="invisible-button" onClick={triggerExit}><Icon name="arrow_back" className="class-card-icon" /></button>
            <h1>{nameOfClass}</h1>
            <hr></hr>
            <div>
              <Icon name={iconName} />
              <h2 className="department">
                {getDepartment(course.getSubject())}
              </h2>
              <button className="invisible-button" onClick={updateBookmark}><Icon name="bookmark" className="class-card-icon" filled={bookmarkedClasses.includes(course.getCourseId())}/></button>
            </div>
          </div>
        </div>
        <div className="class-info-half">
          <div className="class-info-fourth tags">
            <h2><Icon name="inbox_text_asterisk"/>Prerequisites<Icon name="inbox_text_asterisk"/></h2>
            <ul className="no-bullets">
              {mapedPrereqs.map((course) => course)}
            </ul>
          </div>
          <div className="class-info-fourth">
            <h2><Icon name="eyeglasses_2"/>Quick Look<Icon name="eyeglasses_2"/></h2>
            <ul className="no-bullets">
              {quickLookItems.map((item, index) => ( <ListElement key={index} text={`${item.label}: ${item.value}`}/> ))}
            </ul>
          </div>
        </div>
      </section>
      <div className={`class-info-half-content ${subjectClass}`}><p>{description}</p></div>
      <div className={`class-info-half-content ${subjectClass}`}><Chart course={course} subjectClass={subjectClass}></Chart></div>

      <div className={`more-like-this ${subjectClass}`}>
        <div style={{width: "100"}}><h2><Icon name="neurology"/>More Like This</h2></div>
        <section className={"more-like-this-container"}>
          {evenMoreLikeThis.map((course) => (
                <ClassCard course={course} key={course.getCourseId()} bookmark={bookmark} filled={bookmarkedClasses.includes(course.getCourseId())} query={""}/>
              ))}
        </section>
      </div>
      
    </main>
    
  );
}

export default ClassInfoArea;
