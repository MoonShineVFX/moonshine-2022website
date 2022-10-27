import React, { useState, useEffect } from 'react'
import { getCategory} from '../../../Helper/getfunction'
import { LoadingAnim } from '../../../Helper/HtmlComponents';
import ReactPlayer from 'react-player';
function Home_mainCategory() {

  const [categoryData, setCategoryData] = useState([]);
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
        loop muted playsInline className='h-screen w-full object-cover align-middle' 
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
      <ul className='grid grid-cols-4 w-full h-screen'>
        {
          categoryData ? 
          categoryData.map((item,index)=>{
            const{id, name , name_cht,display,imgpath,cover_video } = item
            return display === '1' ? 
              <li key={name+id} 
                  className="cursor-pointer text-white text-4xl font-thin bg-no-repeat bg-cover bg-center flex justify-center items-center opacity-50 hover:opacity-100 hover:tracking-widest transition-all  "
                  // style={{backgroundImage : `url(${imgpath})`}}
              >
                <div>
                  <VideoContainer url={cover_video}/> 
                </div>
                <div className=' absolute'> {name }</div>
               
              </li>
              :
              null


          }): <LoadingAnim />
        }
        </ul>

        <section id="about" className='w-[90%] mx-auto mt-24'>
          <div className='w-1/2'>
            <div className='text-3xl font-thin  mb-10'>About Moonshine</div>
            <div className='text-sm font-thin leading-7'>
              <div className='mb-6 '>MoonShine is an artist-centered VFX company based in Taiwan. We are an integrated collective of directors, designers, artists and technologists, collaborating on projects for the advertising, film and VR industries.</div>


              <div className='mb-6 '>Founded in 2012, MoonShine has been through some challenges, and have done some cool things with our talents. We believe in the value of transparency and equity and constantly strive to deliver great work to the world.</div>

              <div className='mb-6 '>We are committed to Research & Development : </div>
            </div>
          </div>
          <div className='grid grid-cols-4 w-full'>
            <div className=' relative group opacity-50 hover:opacity-100 transition-all cursor-pointer'>
              <img src={process.env.PUBLIC_URL+'/images/about/ha01.png'} alt="" className='w-full object-cover'/>
              <div className=' absolute bottom-10 w-full text-center text-2xl font-thin group-hover:bottom-14 transition-all'>
                XR STUDIO
              </div>
            </div>
            <div className='relative group opacity-50 hover:opacity-100 transition-all cursor-pointer'>
              <img src={process.env.PUBLIC_URL+'/images/about/ha02.png'} alt="" className='w-full object-cover '/>
              <div className=' absolute bottom-10 w-full text-center text-2xl font-thin group-hover:bottom-14 transition-all'>
              MOONDREAM<br/>REALITY
              </div>
            </div>
            <div className='relative group opacity-50 hover:opacity-100 transition-all cursor-pointer'>
              <img src={process.env.PUBLIC_URL+'/images/about/ha03.png'} alt="" className='w-full object-cover'/>
              <div className=' absolute bottom-10 w-full text-center text-2xl font-thin group-hover:bottom-14 transition-all'>
                R & D
              </div>
            </div>
            <div className='relative group opacity-50 hover:opacity-100 transition-all cursor-pointer'>
              <img src={process.env.PUBLIC_URL+'/images/about/ha04.png'} alt="" className='w-full object-cover'/>
              <div className=' absolute bottom-10 w-full text-center text-2xl font-thin group-hover:bottom-14 transition-all'>
                EDUCATION
              </div>
            </div>
          </div>

        </section>

    </div>

  )
}

export default Home_mainCategory