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
        loop muted playsInline className='w-full h-full object-cover align-middle  opacity-40 hover:opacity-100' 
        ref={videoRef}
        onMouseOver={handlePlay}
        onMouseOut={handleStop}
      >
        <source src={url + '#t='+ start_time} type="video/mp4"/>
      </video>
    )
  }


  return (
    <div className='pt-0 h-screen'>
      <section id="about" className='w-full mx-auto pt-24  md:pt-22 flex flex-col justify-between h-full'>
        <div className='w-4/5 md:w-4/5 text-center md:my-16 mx-auto h-[15vh] flex items-center justify-center' >
          <div className='text-2xl lg:text-2xl font-thin md:mb-0'>
            Besides the creative content,we integrate the virtual production,MR,R&D and education,<br />letting a moonlight shine on the the heart of the industry. 
          </div>


        </div>
        <div className='grid md:grid-cols-4 w-full grid-cols-2  h-[55vh]  inset-0 '>
          {serviceData &&
          serviceData.map((item,index)=>{
            const {title , link , cover_video,start_time} = item
            return(
              <a key={index} href={link} target={"_blank"}>
                <div className=' relative group  transition-all cursor-pointer md:opacity-100 flex justify-center items-center h-full'>
                  {/* <img src={process.env.PUBLIC_URL+'/images/about/'+ cover_image} alt="" className='w-full object-cover opacity-50 group-hover:opacity-100 transition-all'/> */}
                  <AboutVideoContainer url={cover_video} start_time={start_time}/> 
                  <div className=' absolute  w-full text-center md:text-[1.6rem] font-bold uppercase  group-hover:-translate-y-2 transition-all text-sm md:break-all  '>
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