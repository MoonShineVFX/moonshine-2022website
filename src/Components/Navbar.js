import React from 'react'
import { FaVimeoV,FaLinkedin,FaFacebookF,FaInstagram } from "react-icons/fa";
function Navbar() {
  return (
    <div id="navbar" className='site-menu'>
      <div className="logo">
        <img src={process.env.PUBLIC_URL+'/images/logo.png'} alt="" />
      </div>
      <div className="navlist">
        <ul className='menu_list'>
          <li>
            <a href="/">WORK</a>
          </li>
          <li>
            <a href="/">ABOUT</a>
          </li>
          <li>
            <a href="/">SERVICES</a>
          </li>
          <li>
            <a href="/">CONTACT</a>
          </li>
        </ul>
        <ul className='social_list'>
          <li>
            <a href="/">
              <img className='imglogo' src={process.env.PUBLIC_URL+'/images/104logo.png'} alt="" />
            </a>
          </li>
          <li>
            <a href="/"><FaVimeoV color="white"/></a>
          </li>
          <li>
            <a href="/"><FaLinkedin color="white"/></a>
          </li>
          <li>
            <a href="/"><FaFacebookF color="white"/></a>
          </li>
          <li>
            <a href="/"><FaInstagram color="white"/></a>
          </li>
        </ul>
        <ul>

        </ul>
      </div>


    </div>
  )
}

export default Navbar