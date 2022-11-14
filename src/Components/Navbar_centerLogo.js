import React,{useEffect, useState, useRef} from 'react'
import { FaVimeoV,FaLinkedin,FaFacebookF,FaInstagram,FaTimes } from "react-icons/fa";
import { TfiClose } from "react-icons/tfi";
import { useTranslation } from 'react-i18next';
import { Link ,useLocation,useNavigate  } from "react-router-dom";
import { CSSTransition } from 'react-transition-group';
function Navbar_centerLogo({data ,nav_Work, toggleTrueFalse,socialmedia}) {
  const { t, i18n } = useTranslation();
  const [navbar, setNavbar] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const [showMessage, setShowMessage] = useState(false);
  const nodeRef = useRef(null);
  const [stickyClass, setStickyClass] = useState('bg-transparent');
  console.log(i18n.language)
  const changeLanguage = (lng) => {
    console.log(i18n.language)
      i18n.changeLanguage(lng);
  };
  let location = useLocation();
  const { pathname } = useLocation();
  const stickNavbar = () => {
    if (window !== undefined) {
      let windowHeight = window.scrollY;
      windowHeight > 300 ? setStickyClass('bg-black') : setStickyClass('bg-transparent');
    }
  };
  useEffect(()=>{
    setNavbar(false)

    window.addEventListener('scroll', stickNavbar);

    return () => {
      window.removeEventListener('scroll', stickNavbar);
    };
  },[location])
  
  return (
    <div id="navbar" className={`fixed top-0 w-full z-30 transition-all duration-500 ${stickyClass} `}>
      <div className='flex justify-between items-center mx-10 my-5'>
        <div className=" ">
          <Link
            to="/"
          >
            <img src={process.env.PUBLIC_URL+'/images/logo.png'} alt="" />
          </Link>

        </div>
        <div className='' onClick={()=>{setShowMessage(true)}}>
          <div className=" rounded-full  w-8 h-7 p-1 flex flex-col justify-between group cursor-pointer">
            <span className="block w-full h-0.5 bg-gray-100 group-hover:w-7 transition-all"></span>
            <span className="block w-full h-0.5 bg-gray-100 group-hover:w-7 transition-all"></span>
            <span className="block w-full h-0.5 bg-gray-100 group-hover:w-7 transition-all"></span>
          </div>
        </div>
      </div>
      <CSSTransition
        in={showMessage}
        nodeRef={nodeRef}
        timeout={300}
        classNames="bigNav"
        unmountOnExit
      >
        <div className="fixed top-0 w-full bg-black  h-screen flex flex-col justify-center items-center gap-11" ref={nodeRef}>
          <div className=' absolute top-9 right-9 cursor-pointer' onClick={()=>{setShowMessage(false)}}>
            <TfiClose size={32} className="ml-auto" /> 
          </div>
          <div className="block mb-16 mt-11">
            <Link
              to="/"
            >
              <img src={process.env.PUBLIC_URL+'/images/logo.png'} alt="" className='mx-auto'/>
            </Link>

          </div>
          <ul className='flex flex-col items-center  mb-5 gap-10' >
            { nav_Work?
              nav_Work.map((item,index)=>{
                return(
                  <li key={index} className="text-3xl font-light leading-7">
                    <Link 
                      to={item.type}
                      className="hover:tracking-widest text-zinc-400 transition-all"
                    >
                      {t(`${item.engName}`)}
                    </Link>
                  </li>
                )
              }): ""
            }
          </ul>
          <div className='w-5 h-1 bg-white '></div>
          <ul className='flex flex-col items-center  mb-5 gap-10' >
            { data?
              data.map((item,index)=>{
                return(
                  <li key={index} className="text-3xl font-light leading-7">
                    <Link 
                      to={item.type}
                      className="hover:tracking-widest transition-all"
                    >
                      {t(`${item.engName}`)}
                    </Link>
                  </li>
                )
              }): ""
            }
          </ul>
          <ul className='flex items-center justify-center gap-24'>
            {
              socialmedia.length ? 
              socialmedia.map((item,index)=>{
                const {id,image, link,title}=item
                return(
                  <li key={id} className="social hover:-translate-y-1 transition">
                    <a href={link} target="_blank" rel="noreferrer" className='text-lg uppercase'>
                      {title}
                    </a> 
                  </li>
                )
              }) : <div>loading </div>
            }
            {/* <li className= {"mx-3 "  + (i18n.language === 'zh-TW' ?' text-white  ' : ' text-zinc-500') } >
              <p onClick={() => changeLanguage("zh-TW")}>繁</p>
            </li>
            <li className={""  + (i18n.language === 'zh-TW' ?' text-zinc-500  ' : ' text-white') }>
              <p onClick={() => changeLanguage("en")}>EN</p>
            </li> */}

          </ul>
        </div>
      </CSSTransition>
      


    </div>
  )
}

export default Navbar_centerLogo