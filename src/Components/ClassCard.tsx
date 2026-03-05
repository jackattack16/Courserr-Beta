import Icon from "./Icon";
import '../Styles/ClassCard.css'
import '../Styles/classColours.css'
import Class from '../assets/Class';

interface Props {
  course: Class;
}

function getSubjectClass(subject?: string): string {
  if (!subject) return 'misc';
  const s = subject.toLowerCase();

  if (s.includes('agri') || s.includes('agriculture')) return 'agriculture';
  if (s.includes('cte') || s.includes('manufactur') || s.includes('technology') || s.includes('engineering') || s.includes('applied')) return 'cte';
  if (s.includes('art') || s.includes('arts') || s.includes('arteducation')) return 'arts';
  if (s.includes('business') || s.includes('finance') || s.includes('marketing') || s.includes('management')) return 'business';
  if (s.includes('human') || s.includes('services') || s.includes('humanservices')) return 'humanservices';
  if (s.includes('information') || s.includes('solution')) return 'informationsolutions';
  if (s.includes('math') || s.includes('mathematics')) return 'mathematics';
  if (s.includes('music')) return 'music';
  if (s.includes('physical') || s === 'pe' || s.includes('education')) return 'physical';
  if (s.includes('science') || s.includes('chem') || s.includes('bio') || s.includes('physics')) return 'science';
  if (s.includes('social') || s.includes('history') || s.includes('studies')) return 'socialstudies';
  if (s.includes('world') || s.includes('language') || s.includes('foreign')) return 'language';
  if (s.includes('english')) return 'english';
  if (s.includes('health')) return 'health';

  return 'misc';
}

function ClassCard({ course }: Props) {
  const title = course.getShortName() || 'Untitled Class';
  const description = course.getDescription() || '';
  const subjectClass = getSubjectClass(course.getSubject());
  const subjectToIcon: Record<string, string> = {
    "agriculture": "agriculture",
    "arts": "palette",
    "business": "business_center",
    "cte": "handyman",
    "english": "auto_stories",
    "mathematics": "calculate",
    "music": "music_note_2",
    "pe": "exercise",
    "science": "rocket",
    "socialstudies": "globe",
    "language": "translate",
    "humanservices": "accessibility_new",
    "informationsolutions": "climate_mini_split",
    "exampleclass": "flutter_dash",
  };
  
  const iconName = subjectToIcon[subjectClass] || 'science_off';
  return (
    <>
      <div className={`class-card ${subjectClass}`}>
        <div className="class-card-header">
          <Icon name={iconName} className="class-card-icon" />
          <h1><a>{title}</a></h1>
          <Icon name="bookmark" className="class-card-icon" />
        </div>
        <p className="class-card-description">{description}</p>
      </div>
    </>
  );
}

export default ClassCard;
