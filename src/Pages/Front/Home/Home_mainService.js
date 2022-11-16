import React, { useState, useEffect } from 'react'
import { Link ,useLocation  } from "react-router-dom";
import { getServiceForDashboard} from '../../../Helper/getfunction'
import { LoadingAnim } from '../../../Helper/HtmlComponents';
import { FiArrowRightCircle } from "react-icons/fi";
function Home_mainService() {

  const [categoryData, setCategoryData] = useState([]);
  const [serviceData, setServiceData] = useState([]);
  useEffect(()=>{
    getServiceForDashboard((res)=>{
      console.log(res)
      setServiceData(res)
      
    })
  },[])


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
    <div className='pt-0'>
      <section id="about" className='w-full mx-auto mt-24  md:mt-12'>
        <div className='w-full md:w-4/5 text-center md:my-20 md:mx-auto ' >
          <div className='text-xl lg:text-2xl font-thin mb-6'>
            Besides the creative content,we integrate the virtual production,MR,R&D and education,<br />letting a moonlight shine on the the heart of the industry. 
          </div>


        </div>
        <div className='grid md:grid-cols-4 w-full grid-cols-2 mt-20'>
          {serviceData &&
          serviceData.map((item,index)=>{
            const {title , link , cover_video,start_time} = item
            return(
              <a key={index} href={link} target={"_blank"}>
                <div className=' relative group  transition-all cursor-pointer md:opacity-100 flex justify-center items-center'>
                  {/* <img src={process.env.PUBLIC_URL+'/images/about/'+ cover_image} alt="" className='w-full object-cover opacity-50 group-hover:opacity-100 transition-all'/> */}
                  <AboutVideoContainer url={cover_video} start_time={start_time}/> 
                  <div className=' absolute  w-full text-center md:text-2xl font-light group-hover:-translate-y-2 transition-all text-sm md:break-all  '>
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

export default Home_mainService