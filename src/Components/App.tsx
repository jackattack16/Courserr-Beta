// import reactLogo from '../assets/react.svg'
// import viteLogo from '/vite.svg'
import { BrowserRouter, Routes, Route, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { lazy, Suspense, useState, useMemo } from 'react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Analytics } from '@vercel/analytics/react';

import '../App.css'
import Header from './Header'
import Sidebar from './Sidebar'
import courseMap from '../assets/ClassInstantiation';
import { calculateScore, isCloseMatch } from '../assets/classUtilities';

const CardArea = lazy(() => import('./CardArea'))
const ClassInfoArea = lazy(() => import('./ClassInfoArea'))

function Loading() {
  return <div style={{ marginLeft: 'var(--sidebar-width)', padding: '20px' }}>Loading...</div>
}

function AppContent() {
  const [searchQuery, setSearchQuery] = useState('');
  const [clearTrigger, setClearTrigger] = useState(0);
  const [bookmarkedClasses, setBookmarkedClasses] = useState(Array.from(JSON.stringify(localStorage.getItem('bookmarkedClasses')), Number) || Array<Number>);

  const location = useLocation();
  const navigate = useNavigate();
  const [, setSearchParams] = useSearchParams();

  const courses = useMemo(() => Array.from(courseMap.values()), []);

  const handleHomeClick = () => {
    setSearchQuery('');
    setSearchParams({});
    setClearTrigger(prev => prev + 1);
  };

  const updateSearchQuery = (query: string) => {
    setSearchQuery(query);
    document.documentElement.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    const mainElement = document.querySelector('main');
    if (mainElement) {
      mainElement.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
    if (location.pathname !== '/' && query.length > 0) {
      navigate(`/?q=${encodeURIComponent(query)}`);
    }
  };

  // Auto-navigation: check if searchQuery matches exactly 1 class
  const autoNavigate = useMemo(() => {
    if (!searchQuery || location.pathname !== '/') return null;
    
    const q = searchQuery.toLowerCase();
    const scored = courses
      .map(course => ({ course, score: calculateScore(course, q ,false) }))
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score);
    
    if (scored.length === 1 && isCloseMatch(scored[0].course, searchQuery)) {
      return scored[0].course.getCourseId();
    }
    return null;
  }, [searchQuery, courses, location.pathname]);

  // Navigate if we have an auto-match
  if (autoNavigate) {
    navigate(`/class/${autoNavigate}`, { replace: true });
  }

  const updateBookmarks = (course: number) => {
    try {
      const item = localStorage.getItem('bookmarkedClasses');
      const parsedBookmarks = item ? Array.from(JSON.parse(item), Number) : [];
      console.log(parsedBookmarks);
      if (parsedBookmarks.includes(course)) {
        parsedBookmarks.splice(parsedBookmarks.indexOf(course), 1);
      } else {
        parsedBookmarks.push(course);
      }
      localStorage.setItem('bookmarkedClasses', JSON.stringify(parsedBookmarks));
      setBookmarkedClasses(parsedBookmarks);
    } catch {
      setBookmarkedClasses([]);
    }
  };

  return (
    <div className='flex-container'>
      <Sidebar onHomeClick={handleHomeClick} />
      <Header updateSearchQuery={updateSearchQuery} clearTrigger={clearTrigger}/>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<CardArea searchQuery={searchQuery} bookmark={updateBookmarks} bookmarkedClasses={bookmarkedClasses} />} />
          <Route path="/class/:id" element={<ClassInfoArea />} />
        </Routes>
      </Suspense>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
      <Analytics />
      <SpeedInsights />
    </BrowserRouter>
  )
}

export default App;
