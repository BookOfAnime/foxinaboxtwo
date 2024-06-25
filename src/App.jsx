import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import FoxSnakeGame from './FoxGame'
import LandingPage from './LandingPage'
import MemeGallery from './MemeGallery'
import Navbar from './assets/Navbar'
import Tokenomics from './Tokenomics'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Navbar />
    <LandingPage />
    <MemeGallery />
    <Tokenomics />
      <FoxSnakeGame />
      

    </>
  )
}

export default App
