
import React from 'react'
import './Footer.css'

const Footer = () => {
    const year=new Date().getFullYear();
  return (
    <div className='footer-container'>
      <div className='line-parent'><div className='line'></div></div>
      <p>&copy; {year} Pokemon - All Rights Reserved</p>
    </div>
  )
}

export default Footer
