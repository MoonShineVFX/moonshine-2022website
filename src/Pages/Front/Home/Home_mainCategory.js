import React, { useState, useEffect } from 'react'
import { Link ,useLocation  } from "react-router-dom";
import { getCategory,getServiceForDashboard} from '../../../Helper/getfunction'
import { LoadingAnim } from '../../../Helper/HtmlComponents';
import ReactPlayer from 'react-player';
import { useRecoilState } from 'recoil';
import { categoryState } from '../../../atoms/modalAtom';
import { FiArrowRightCircle } from "react-icons/fi";
function Home_mainCategory() {

  const [categoryData, setCategoryData] = useState([]);
  const [serviceData, setServiceData] = useState([]);
  const [currentCategory, setCurrentCategory] = useRecoilState(categoryState);
  useEffect(()=>{
    getCategory((res)=>{
      setCategoryData(res)
      console.log(res)
    })
    getServiceForDashboard((res)=>{
      console.log(res)
      setServiceData(res)
      
    })
  },[])
  const mainCData = [
    {
      title:"XR STUDIO",
      link:"https://vpxrstudio.com/",
      cover_image:"ha01.png",
      cover_video:"ha01.mp4",
    },
    {
      title:"MOONDREAM REALITY",
      link:"https://moondreamreality.com/",
      cover_image:"ha02.png",
      cover_video:"ha02.mp4",
    },
    {
      title:"R & D",
      link:"https://vpxrstudio.com/",
      cover_image:"ha03.png",
      cover_video:"ha03.mp4",
    },
    {
      title:"EDUCATION",
      link:"https://vpxrstudio.com/",
      cover_image:"ha04.png",
      cover_video:"ha04.mp4",
    }
  ]

  const VideoContainer = ({url}) =>{
    const videoRef = React.useRef(null);
    function handlePlay() {
      videoRef.current.play();
    }
  
    function handleStop() {
      videoRef.current.pause();
    }
    return(
      <video 
        loop muted playsInline className='h-screen w-full object-cover align-middle md:max-h-[25vh]  opacity-50 hover:opacity-100' 
        ref={videoRef}
        onMouseOver={handlePlay}
        onMouseOut={handleStop}
      >
        <source src={url} type="video/mp4"/>
      </video>
    )
  }

  const AboutVideoContainer = ({url,start_time}) =>{
    const videoRef = React.useRef(null);
    function handlePlay() {
      videoRef.current.play();
    }
  
    function handleStop() {
      videoRef.current.pause();
    }
    return(
      <video 
        loop muted playsInline className='w-full aspect-[412/485] object-cover align-middle  opacity-50 hover:opacity-100' 
        ref={videoRef}
        onMouseOver={handlePlay}
        onMouseOut={handleStop}
      >
        <source src={url + '#t='+ start_time} type="video/mp4"/>
      </video>
    )
  }


  return (
    <div>
      <ul className='grid grid-cols-4 w-full h-screen md:grid-cols-1 md:h-auto md:aspect-square md:p-6 md:mt-10'>
        {
          categoryData ? 
          categoryData.map((item,index)=>{
            const{id, name , name_cht,display,imgpath,cover_video,slug } = item
            return display === '1' ? 
              <Link key={name+id} 
                  to={"/works/"+slug}
                  onClick={
                    ()=>{
                      setCurrentCategory(item)
                    }
                  }
                  className=" relative cursor-pointer text-white text-3xl bg-no-repeat bg-cover bg-center flex justify-center items-center hover:tracking-widest transition-all md:text-xl md:opacity-80   "
                  // style={{backgroundImage : `url(${imgpath})`}}
              >
     
                  <VideoContainer url={cover_video} /> 

                <div className=' absolute font-light'> {name }</div>
               
              </Link>
              :
              null


          }): <LoadingAnim />
        }
        <div className='scroll-down'></div>
        </ul>

        <section id="about" className='w-full mx-auto mt-24  md:mt-12'>
          <div className='md:w-full text-center' data-aos="fade-up">
            <div className='text-3xl font-thin mb-6'>
              Creation and Illumination, attained by MoonShine's animation and visual effects.
            </div>
            <Link
              to="/about" 
              className='text-base font-normal  mb-10 flex justify-center items-center group text-zinc-400'> 
                <span className='group-hover:text-zinc-100 transition-all'>About Moonshine </span>  <FiArrowRightCircle className='ml-2 group-hover:translate-x-1 group-hover:text-zinc-100  transition-all'/> 
            </Link>

          </div>
          <div className='grid grid-cols-4 w-full md:grid-cols-2 mt-20'>
            {serviceData &&
            serviceData.map((item,index)=>{
              const {title , link , cover_video,start_time} = item
              return(
                <a href={link} target={"_blank"}>
                  <div className=' relative group  transition-all cursor-pointer md:opacity-100 flex justify-center items-center'>
                    {/* <img src={process.env.PUBLIC_URL+'/images/about/'+ cover_image} alt="" className='w-full object-cover opacity-50 group-hover:opacity-100 transition-all'/> */}
                    <AboutVideoContainer url={cover_video} start_time={start_time}/> 
                    <div className=' absolute  w-full text-center text-2xl font-light group-hover:-translate-y-2 transition-all md:text-sm md:break-all md:bottom-2 '>
                      {title}
                    </div>
                  </div>
                </a>
              )
            })

            }
            
          </div>

        </section>

    </div>

  )
}

export default Home_mainCategory