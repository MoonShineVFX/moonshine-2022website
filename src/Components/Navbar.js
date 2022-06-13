import React from 'react'
import { FaVimeoV,FaLinkedin,FaFacebookF,FaInstagram } from "react-icons/fa";
import { useTranslation } from 'react-i18next';
import { Link ,useLocation  } from "react-router-dom";
function Navbar({data , toggleTrueFalse}) {
  const { t, i18n } = useTranslation();
  const changeLanguage = (lng) => {
      i18n.changeLanguage(lng);
  };
  const { pathname } = useLocation();
  return (
    <div id="navbar" className='site-menu'>
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