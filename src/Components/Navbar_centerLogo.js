import React,{useState} from 'react'
import { FaVimeoV,FaLinkedin,FaFacebookF,FaInstagram,FaTimes } from "react-icons/fa";
import { TfiClose } from "react-icons/tfi";
import { useTranslation } from 'react-i18next';
import { Link ,useLocation  } from "react-router-dom";
function Navbar_centerLogo({data , toggleTrueFalse,socialmedia}) {
  const { t, i18n } = useTranslation();
  const [navbar, setNavbar] = useState(false);
  console.log(i18n.language)
  const changeLanguage = (lng) => {
    console.log(i18n.language)
      i18n.changeLanguage(lng);
  };
 
  const { pathname } = useLocation();
  return (
    <div id="navbar" className=' fixed top-0 w-full z-30'>
      <div className='flex justify-between items-center mx-10 my-5'>
        <div></div>
        <div className=" ">
          <Link
            to="/"
          >
            <img src={process.env.PUBLIC_URL+'/images/logo.png'} alt="" />
          </Link>

        </div>
        <div className='' onClick={()=>{setNavbar(!navbar)}}>
          <div className=" rounded-full  w-8 h-7 p-1 flex flex-col justify-between group cursor-pointer">
            <span className="block w-full h-0.5 bg-gray-100 group-hover:w-7 transition-all"></span>
            <span className="block w-full h-0.5 bg-gray-100 group-hover:w-7 transition-all"></span>
            <span className="block w-full h-0.5 bg-gray-100 group-hover:w-7 transition-all"></span>
          </div>
        </div>
      </div>
      {
        navbar && 
        <div className="fixed top-0 w-full bg-black  h-screen flex flex-col justify-center gap-11">
          <div className=' absolute top-9 right-9 cursor-pointer' onClick={()=>{setNavbar(!navbar)}}>
            <TfiClose size={32} className="ml-auto" /> 
          </div>
          <div className="block mb-11 mt-11">
            <Link
              to="/"
            >
              <img src={process.env.PUBLIC_URL+'/images/logo.png'} alt="" className='mx-auto'/>
            </Link>

          </div>
          
          <ul className='flex flex-col items-center mb-11 gap-10' >
            { data?
              data.map((item,index)=>{
                return(
                  <li key={index} className="text-5xl font-thin leading-relaxed">
                    <Link 
                      to={item.type}
                      className="hover:tracking-widest transition-all"
                    >
                      {t(`${item.chtName}`)}
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
                const {id,image, link}=item
                return(
                  <li key={id} className="social hover:-translate-y-1 transition w-7">
                    <a href={link} target="_blank" rel="noreferrer">
                      <img src={process.env.PUBLIC_URL+ '/images/socialicon/' + image} alt="" className=''/>
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
      }
      


    </div>
  )
}

export default Navbar_centerLogo