import { HashRouter, Route, Routes } from 'react-router'
import './App.css'
import Home from './components/Home'
import AboutMe from './components/AboutMe'
import Explore from './components/Explore'
import AquariumBuilder from './components/AquariumBuilder'

function App() {

  return <HashRouter>
    <Routes>
      <Route path="/" element={ <Home/> }/>
      <Route path="/about" element={ <AboutMe/> }/>
      <Route path="/explore" element={ <Explore/> }/>
      <Route path="/aquarium-builder" element={ <AquariumBuilder/> }/>
    </Routes>
  </HashRouter>
}

export default App
