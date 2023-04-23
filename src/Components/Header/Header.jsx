import React from 'react'
import "./header.css"
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className='nav'>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        <Link to="/registerrbs">Register RBS</Link>
        <Link to="/registerbs">Register BS</Link>
    </div>
  )
}

export default Header