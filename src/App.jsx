import './App.css'
import Home from './components/home'
import SocialIcon from './components/socialIcon'
import CursorCircle from './components/cursorCircle'
import { useRef } from 'react'

function App() {
  const cursorCircle = useRef();
  return (
    <div className='bg-black'>
      <CursorCircle ref={cursorCircle} />
      <Home cursorCircle={cursorCircle}/>
      <SocialIcon cursorCircle={cursorCircle} />
    </div>
  )
}

export default App