import React, { useState, useEffect } from 'react'
import { Link ,useLocation  } from "react-router-dom";
import { getCategory} from '../../../Helper/getfunction'
import { LoadingAnim } from '../../../Helper/HtmlComponents';
import ReactPlayer from 'react-player';
import { useRecoilState } from 'recoil';
import { categoryState } from '../../../atoms/modalAtom';
function Home_mainCategory() {

  const [categoryData, setCategoryData] = useState([]);
  const [currentCategory, setCurrentCategory] = useRecoilState(categoryState);
  useEffect(()=>{
    getCategory((res)=>{
      setCategoryData(res)
      console.log(res)
    })
  },[])

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
        loop muted playsInline className='h-screen w-full object-cover align-middle md:max-h-[25vh] ' 
        ref={videoRef}
        onMouseOver={handlePlay}
        onMouseOut={handleStop}
      >
        <source src={url} type="video/mp4"/>
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
                  className=" relative cursor-pointer text-white text-4xl font-thin bg-no-repeat bg-cover bg-center flex justify-center items-center opacity-50 hover:opacity-100 hover:tracking-widest transition-all md:text-xl md:opacity-80   "
                  // style={{backgroundImage : `url(${imgpath})`}}
              >
     
                  <VideoContainer url={cover_video}/> 

                <div className=' absolute '> {name }</div>
               
              </Link>
              :
              null


          }): <LoadingAnim />
        }
        </ul>

        <section id="about" className='w-[90%] mx-auto mt-24 md:mt-12'>
          <div className='w-1/2 md:w-full'>
            <div className='text-3xl font-thin  mb-10'>About Moonshine</div>
            <div className='text-sm font-thin leading-7'>
              <div className='mb-6 '>MoonShine is an artist-centered VFX company based in Taiwan. We are an integrated collective of directors, designers, artists and technologists, collaborating on projects for the advertising, film and VR industries.</div>


              <div className='mb-6 '>Founded in 2012, MoonShine has been through some challenges, and have done some cool things with our talents. We believe in the value of transparency and equity and constantly strive to deliver great work to the world.</div>

              <div className='mb-6 '>We are committed to Research & Development : </div>
            </div>
          </div>
          <div className='grid grid-cols-4 w-full md:grid-cols-2'>
            <a href="https://vpxrstudio.com/" target={"_blank"}>
              <div className=' relative group opacity-50 hover:opacity-100 transition-all cursor-pointer md:opacity-100'>
                <img src={process.env.PUBLIC_URL+'/images/about/ha01.png'} alt="" className='w-full object-cover'/>
                <div className=' absolute bottom-10 w-full text-center text-2xl font-thin group-hover:bottom-14 transition-all md:text-sm md:break-all md:bottom-2'>
                  XR STUDIO
                </div>
              </div>
            </a>
            <a href="https://moondreamreality.com/" target={"_blank"}>
              <div className='relative group opacity-50 hover:opacity-100 transition-all cursor-pointer md:opacity-100'>
                <img src={process.env.PUBLIC_URL+'/images/about/ha02.png'} alt="" className='w-full object-cover '/>
                <div className=' absolute bottom-10 w-full text-center text-2xl font-thin group-hover:bottom-14 transition-all md:text-sm md:break-all md:bottom-2'>
                MOONDREAM<br/>REALITY
                </div>
              </div>
            </a>
            <div className='relative group opacity-50 hover:opacity-100 transition-all cursor-pointer md:opacity-100'>
              <img src={process.env.PUBLIC_URL+'/images/about/ha03.png'} alt="" className='w-full object-cover'/>
              <div className=' absolute bottom-10 w-full text-center text-2xl font-thin group-hover:bottom-14 transition-all md:text-sm md:break-all md:bottom-2'>
                R & D
              </div>
            </div>
            <div className='relative group opacity-50 hover:opacity-100 transition-all cursor-pointer md:opacity-100'>
              <img src={process.env.PUBLIC_URL+'/images/about/ha04.png'} alt="" className='w-full object-cover'/>
              <div className=' absolute bottom-10 w-full text-center text-2xl font-thin group-hover:bottom-14 transition-all md:text-sm md:break-all md:bottom-2'>
                EDUCATION
              </div>
            </div>
          </div>

        </section>

    </div>

  )
}

export default Home_mainCategory