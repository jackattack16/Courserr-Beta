// import reactLogo from '../assets/react.svg'
// import viteLogo from '/vite.svg'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import '../App.css'
import CardArea from './CardArea'
import Header from './Header'
import Sidebar from './Sidebar'
import ClassInfoArea from './ClassInfoArea';

function App() {
  return (
    <BrowserRouter>
      <div className='flex-container'>
        <Sidebar />
        <Header />
        <Routes>
          <Route path="/" element={<CardArea />} />
          <Route path="/class/:id" element={<ClassInfoArea />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
