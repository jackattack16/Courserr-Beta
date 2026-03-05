// import reactLogo from '../assets/react.svg'
// import viteLogo from '/vite.svg'

import '../App.css'
import CardArea from './CardArea'
import Header from './Header'
import Sidebar from './Sidebar'

function App() {

  return (
    <>
      <div className='flex-container'>
        <Sidebar></Sidebar>
        <Header></Header>
        <CardArea></CardArea>
      </div>
    </>
  )
}

export default App
