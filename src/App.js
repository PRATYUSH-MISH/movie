import React from 'react'
import Home from "./Home"
import SingleMovie from "./SingleMoive"
import Error from './Error'
import "./App.css"
import { Route, Routes} from "react-router-dom"
export default function App() {
  return (
    <div>
    
      <Routes>
        <Route path='/'element={<Home/>}/>
        <Route path="movie/:id"element={<SingleMovie/>}/>
        <Route path ="*" element={<Error/>}/>
      </Routes>
     
    </div>
  )
}
