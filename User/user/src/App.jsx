import React from 'react'
import Home from './pages/Home'
import {Routes,Route} from "react-router"
import Main from './pages/Main'
import './Style/index.css'
import Final from './pages/Final'

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/next' element={<Main/>}/>
        <Route path='/final' element={<Final/>}/>
      </Routes>
    </div>
  )
}

export default App