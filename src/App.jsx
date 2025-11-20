import { useState } from 'react'
import { Route, Routes, HashRouter } from 'react-router'
import './App.css'
import Home from './components/Home'
import AboutMe from './components/AboutMe'

function App() {
  const [count, setCount] = useState(0)

  return <HashRouter>
    <Routes>
      <Route path="/" element={ <Home/> }></Route>
      <Route path="/about" element={ <AboutMe/> }></Route>
    </Routes>
  </HashRouter>
}

export default App
