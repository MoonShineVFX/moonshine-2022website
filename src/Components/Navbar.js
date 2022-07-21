import React from 'react'
import { FaVimeoV,FaLinkedin,FaFacebookF,FaInstagram } from "react-icons/fa";
import { useTranslation } from 'react-i18next';
import { Link ,useLocation  } from "react-router-dom";
function Navbar({data , toggleTrueFalse,socialmedia}) {
  const { t, i18n } = useTranslation();
  console.log(i18n.language)
  const changeLanguage = (lng) => {
    console.log(i18n.language)
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
            }) : <div>loading </div>
          }
          <li className= {"mx-3 "  + (i18n.language === 'zh-TW' ?' text-white  ' : ' text-zinc-500') } >
            <p onClick={() => changeLanguage("zh-TW")}>繁</p>
          </li>
          <li className={""  + (i18n.language === 'zh-TW' ?' text-zinc-500  ' : ' text-white') }>
            <p onClick={() => changeLanguage("en")}>EN</p>
          </li>

        </ul>
      </div>


    </div>
  )
}

export default Navbar