import React from 'react'
import "./Header.css"
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header  className='header'>
        <Link to="/">Home</Link>
        <Link to="/autoComplete-typehead">AutoComplete</Link>
        <Link to="/infinite-scroll">Infinite Scroll</Link>
    </header>
  )
}

export default Header