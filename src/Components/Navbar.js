import React from 'react'
import { FaVimeoV,FaLinkedin,FaFacebookF,FaInstagram } from "react-icons/fa";
import { useTranslation } from 'react-i18next';
import { Link ,useLocation  } from "react-router-dom";
function Navbar({data , toggleTrueFalse,socialmedia}) {
  const { t, i18n } = useTranslation();
  const changeLanguage = (lng) => {
      i18n.changeLanguage(lng);
  };
  const { pathname } = useLocation();
  return (
    <div id="navbar" className='flex justify-between items-center text-white top-3 left-1/2 -translate-x-2/4 w-11/12 fixed z-50 site-menu xs:hidden '>
      <div className="logo">
        <Link
          to="/"
        >
          <img src={process.env.PUBLIC_URL+'/images/logo.png'} alt="" />
        </Link>

      </div>
      <div className="navlist">
        <ul className='menu_list'>
        { data?
            data.map((item,index)=>{
              return(
                <li key={index}>
                  <Link 
                    to={item.type}
                    className={ pathname.substring(1) === item.type ? 'active' : ''}
                  >
                    {t(`${item.chtName}`)}
                  </Link>
                </li>
              )
            }): ""
          }
        </ul>
        <ul className='social_list'>
          {
            socialmedia.length ? 
            socialmedia.map((item,index)=>{
              const {id,image, link}=item
              return(
                <li key={id} className="social hover:-translate-y-1 transition">
                  <a href={link} target="_blank" rel="noreferrer">
                    <img src={process.env.PUBLIC_URL+ '/images/socialicon/' + image} alt="" />
                  </a> 
                </li>
              )
            }) : <div> </div>
          }

        </ul>
        <ul>

        </ul>
      </div>


    </div>
  )
}

export default Navbar