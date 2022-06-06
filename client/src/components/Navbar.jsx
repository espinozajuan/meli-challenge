import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import NavLogo from '../assets/Logo_ML.png'
import SearchIcon from '../assets/ic_Search.png'

const Navbar = () => {
  const [searchText, setSearchText] = useState('')

  const navigate = useNavigate()

  const submitHandler = (e) => {
    e.preventDefault()
    if(searchText.trim().length === 0) return
    navigate(`/items?search=${searchText}`)
  }

  return (
    <nav className='navbar'>
      <div className='navbar-container container'>
        <Link to='/' className='navbar-logo-wrapper'>
          <img src={NavLogo} className='navbar-logo' alt='Navbar'/>
        </Link>
        <form className='navbar-search-form' onSubmit={submitHandler}>
          <input placeholder='Nunca dejes de buscar' className='navbar-search-inp' type='text' onChange={(e) => setSearchText(e.target.value)}/>
          <button className='navbar-search-btn' type='submit'>
            <img src={SearchIcon} alt='Search Icon'/>
          </button>
        </form>
      </div>
    </nav>
  )
}

export default Navbar