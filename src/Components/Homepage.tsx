import { Link } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import '../Styles/Homepage.css';
import Icon from './Icon';
import courseMap from '../assets/ClassInstantiation';

const features = [
  {
    icon: 'search',
    label: '01 — Search',
    title: 'Smart Search',
    desc: 'Find any course instantly with fuzzy matching. Start typing a name, subject, or keyword and results appear ranked by relevance.',
  },
  {
    icon: 'tune',
    label: '02 — Filter',
    title: 'Powerful Filters',
    desc: 'Narrow down by subject, grade level, duration, class type (AP/Honors), and dual credit availability. Combine filters freely.',
  },
  {
    icon: 'eyeglasses_2',
    label: '03 — Details',
    title: 'Course Deep-Dive',
    desc: 'Tap into any course for prerequisites, grade distributions, workload data, and time commitment — everything in one view.',
  },
  {
    icon: 'bookmark',
    label: '04 — Bookmark',
    title: 'Save Favorites',
    desc: 'Bookmark courses you\'re interested in. Your selections persist across sessions so you can build your schedule over time.',
  },
  {
    icon: 'neurology',
    label: '05 — Discover',
    title: 'Related Courses',
    desc: 'Every course page suggests similar classes based on subject and name matching — discover options you didn\'t know existed.',
  },
  {
    icon: 'dark_mode',
    label: '06 — Theme',
    title: 'Dark & Light Mode',
    desc: 'Switch between dark and light themes with a single click. Your preference is saved and applied automatically.',
  },
];

const steps = [
  {
    number: '1',
    title: 'Browse or Search',
    desc: 'Use the search bar in the header or scroll through the full catalog of courses.',
  },
  {
    number: '2',
    title: 'Explore Details',
    desc: 'Click any course card to see grade data, workload charts, prerequisites, and more.',
  },
  {
    number: '3',
    title: 'Plan Your Schedule',
    desc: 'Bookmark courses you like and compare details to build your ideal course plan.',
  },
];

function Homepage() {
  const [isLaunching, setIsLaunching] = useState(false);
  const courseCount = useMemo(() => courseMap.size, []);
  const subjectCount = useMemo(() => {
    const subjects = new Set<string>();
    courseMap.forEach((course) => subjects.add(course.getSubject()));
    return subjects.size;
  }, []);

  const handleLaunch = () => {
    setIsLaunching(true);
    setTimeout(() => {
      setIsLaunching(false);
    }, 4500); // Resets after 4.5 seconds for full animation
  };

  return (
    <main className="homepage-main">
      <div className="homepage">
        {/* Hero */}
        <section className="homepage-hero" id="homepage-hero">
          <div className="hero-sticker">
            <svg viewBox="0 0 100 100">
              <path id="circlePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="transparent" />
              <text>
                <textPath href="#circlePath" textLength="230">
                  • EXPLORE • DISCOVER • PLAN 
                </textPath>
              </text>
            </svg>
            <button 
              className={`sticker-icon ${isLaunching ? 'blast-off' : ''}`}
              onClick={handleLaunch}
              aria-label="Launch rocket"
            >
               <Icon name="rocket" />
            </button>
          </div>
          <span className="hero-eyebrow">Course Discovery Platform</span>
          <h1 className="hero-title">
            Find your next <span className="accent">class.</span>
          </h1>
          <p className="hero-subtitle">
            Courserr puts every course at your fingertips — search, filter, compare grades, and plan your schedule in one place.
          </p>
          <div className="hero-actions">
            <Link to="/" className="hero-cta" id="hero-browse-cta">
              <Icon name="flood" />
              Browse Courses
            </Link>
            <a
              href="https://docs.google.com/document/d/1n4HRkpug7Vh7ZYWIeSQcKXRjLHPDzmVj/edit?tab=t.0#heading=h.gjdgxs"
              target="_blank"
              rel="noreferrer"
              className="hero-cta secondary"
              id="hero-handbook-cta"
            >
              <Icon name="menu_book" />
              View Handbook
            </a>
          </div>
        </section>

        {/* Marquee Strip */}
        <div className="marquee-divider">
          <div className="marquee-track">
            <span>DISCOVER YOUR NEXT FAVORITE CLASS • PLAN YOUR SCHEDULE • COMPARE GRADES • BROWSE THE FULL CATALOG • </span>
            <span>DISCOVER YOUR NEXT FAVORITE CLASS • PLAN YOUR SCHEDULE • COMPARE GRADES • BROWSE THE FULL CATALOG • </span>
          </div>
        </div>

        {/* Stats Strip */}
        <div className="homepage-stats" id="homepage-stats">
          <div className="stat-item">
            <span className="stat-value">{courseCount}</span>
            <span className="stat-label">Courses</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">{subjectCount}</span>
            <span className="stat-label">Subjects</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">9–12</span>
            <span className="stat-label">Grade Levels</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">∞</span>
            <span className="stat-label">Possibilities</span>
          </div>
        </div>

        {/* Features Grid */}
        <section className="homepage-features" id="homepage-features">
          {features.map((f, i) => (
            <div className="feature-card" key={i}>
              <div className="feature-icon-row">
                <Icon name={f.icon} />
                <span className="feature-number">{f.label}</span>
              </div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </section>

        {/* Quick Start */}
        <section className="homepage-quickstart" id="homepage-quickstart">
          <div className="quickstart-header">
            <Icon name="rocket" />
            <h2>Get Started in 3 Steps</h2>
          </div>
          <div className="quickstart-steps">
            {steps.map((s, i) => (
              <div className="quickstart-step" key={i}>
                <span className="step-number">{s.number}</span>
                <div className="step-content">
                  <h4>{s.title}</h4>
                  <p>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer CTA */}
        <div className="homepage-footer-cta" id="homepage-footer-cta">
          <p>Ready to explore?</p>
          <Link to="/" className="hero-cta" id="footer-browse-cta">
            <Icon name="flood" />
            View All Courses
          </Link>
        </div>

        {/* Full Page Launch Overlay */}
        {isLaunching && createPortal(
          <div className="launch-overlay">
            <div className="steam-container">
              {[...Array(30)].map((_, i) => {
                const size = 50 + (i * 53 % 200);
                const left = 5 + (i * 19 % 90);
                const delay = (i % 6) * 0.12;
                const duration = 1.5 + (i % 4) * 0.7;
                const bgColors = ["var(--accent-blue)", "var(--surface-color)", "var(--bg-primary)", "var(--bg-tertiary)", "#FFCC00"];
                const color = bgColors[i % bgColors.length];
                
                return (
                  <div 
                    key={i} 
                    className="steam-particle" 
                    style={{ 
                      width: `${size}px`, 
                      height: `${size}px`, 
                      left: `${left}%`, 
                      animationDelay: `${delay}s`,
                      animationDuration: `${duration}s`,
                      backgroundColor: color
                    }} 
                  ></div>
                );
              })}
            </div>
            <div className="launch-rocket-full">
              <Icon name="rocket" filled={true}/>
              <div className="rocket-flame-container">
                <div className="flame-layer outer"></div>
                <div className="flame-layer middle"></div>
                <div className="flame-layer inner"></div>
              </div>
            </div>
          </div>,
          document.body
        )}
      </div>
    </main>
  );
}

export default Homepage;
