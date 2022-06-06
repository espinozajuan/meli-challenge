import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import SearchResults from './pages/SearchResults'
import SingleProduct from './pages/SingleProduct'
import './App.scss'

const App = () => {
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/items' element={<SearchResults/>}/>
          <Route path='/items/:id' element={<SingleProduct/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
