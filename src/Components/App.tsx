// import reactLogo from '../assets/react.svg'
// import viteLogo from '/vite.svg'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';

import '../App.css'
import Header from './Header'
import Sidebar from './Sidebar'

const CardArea = lazy(() => import('./CardArea'))
const ClassInfoArea = lazy(() => import('./ClassInfoArea'))

function Loading() {
  return <div style={{ marginLeft: 'var(--sidebar-width)', padding: '20px' }}>Loading...</div>
}

function App() {
  return (
    <BrowserRouter>
      <div className='flex-container'>
        <Sidebar />
        <Header />
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<CardArea />} />
            <Route path="/class/:id" element={<ClassInfoArea />} />
          </Routes>
        </Suspense>
      </div>
    </BrowserRouter>
  )
}

export default App
