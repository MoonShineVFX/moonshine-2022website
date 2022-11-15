import React, { useState, useEffect } from 'react'
import { Link ,useLocation  } from "react-router-dom";
import { getCategory} from '../../../Helper/getfunction'
import { LoadingAnim } from '../../../Helper/HtmlComponents';
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
        loop muted playsInline className='h-screen w-full object-cover align-middle md:max-h-[25vh]  opacity-50 hover:opacity-100' 
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

    </div>

  )
}

export default Home_mainCategory