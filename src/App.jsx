import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import FoxSnakeGame from './FoxGame'
import LandingPage from './LandingPage'
import MemeGallery from './MemeGallery'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <LandingPage />
    <MemeGallery />
      <FoxSnakeGame />
      

    </>
  )
}

export default App
