import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {Routes, Route} from 'react-router-dom'
import './App.css'
import Upload from './pages/Upload'
import Images from './pages/Images'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Upload/>}/>
        <Route path='/get-images' element={<Images/>}/>
      </Routes>
    </>
  )
}

export default App
