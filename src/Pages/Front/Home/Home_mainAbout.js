import React, { useState, useEffect } from 'react'
import { Link ,useLocation  } from "react-router-dom";
import { LoadingAnim } from '../../../Helper/HtmlComponents';
import { Transition,TransitionGroup,SwitchTransition } from 'react-transition-group'
import { FiArrowRightCircle } from "react-icons/fi";
function Home_mainAbout() {
  const FadeChanger = ({url}) =>{
    const [currentUrl, setCurrentUrl] = useState(url)
    const duration = 500
    const defaultStyle = {
      background: `url(${currentUrl})`,
      backgroundPosition:'center',
      backgroundRepeat:'no-repeat',
      backgroundSize:'cover',
      transition: `opacity ${duration}ms ease-in-out`,
      opacity: 0
    }
    const transitionStyles = {
      entering: { opacity: 0 },
      entered: { opacity: 0.4 },
      exiting: { opacity: 0 },
      exited: { opacity: 0 }
    }

    return(
      <Transition
        in={url === currentUrl}
        onEnter={() => {
          console.log('enter') 
          
        }}
        onEntering={() => console.log('entering')}
        onEntered={() => console.log('entered')}
        onExit={() => console.log('exit')}
        onExiting={() => console.log('exiting')}
        onExited={() => setCurrentUrl(url)}
        timeout={duration}
        
      >
        {(state) => (
          <div
            className='w-full h-screen absolute top-0 left-0'
            style={{
              ...defaultStyle,
              ...transitionStyles[state]
            }}
          > <div className='text-xl text-white'>{state}</div> </div>
        )}
      </Transition>
    )
  }
  const imgdata = [ "slogan1.png", "slogan2.png","slogan3.png","slogan4.png","slogan5.png"]
  const [num , setNum]=useState(0)
  const [count, setCount] = useState(0);


  const incNum = () => {
    if(count < imgdata.length-1){
      setCount(count => count + 1);
    }else{
      setCount(0)
    }
  }
  
    
  useEffect(()=>{
    const timerId = setInterval(() => {
      incNum()
    }, 2000);

    return () => clearInterval(timerId);
  },[count])

  const image = process.env.PUBLIC_URL + '/images/about/'+imgdata[count]


  return (
    <div className='w-full relative h-screen' id="about">
      {
        imgdata.map((item,index)=>{
          return(
            <div 
              key={index}
              className={' absolute w-full h-screen top-0 bg-cover bg-center bg-no-repeat opacity-0 ' + 'img-'+index}
              style={{backgroundImage: `url(${process.env.PUBLIC_URL + '/images/about/'+ item})`}}
            ></div>
          )
        })
      }
      <div className=' absolute z-10 flex flex-col justify-center h-screen px-12 '>
        <div className='text-base font-light'>WELCOME TO THE MOONSHINE</div>
        <div className='text-5xl font-light w-4/5 py-4 leading-slug'>Creation and Illumination, attained by MoonShine's animation and visual effects.</div>
        <div className='text-lg w-2/4 font-light text-zinc-100'>Being dream makers, we dedicate to providing all-around image service, breaking the limitations of creation by technology, and bringing the high quality to the world.</div>
        <Link
          to="/about" 
          className='text-base font-normal  mb-10  group text-zinc-400 flex items-center mt-6 border rounded-full px-3 py-2 w-44 '> 
            <span className='group-hover:text-zinc-100 transition-all'>About Moonshine </span>  <FiArrowRightCircle className='ml-2 group-hover:translate-x-1 group-hover:text-zinc-100  transition-all'/> 
        </Link>
      </div>


    </div>

  )
}

export default Home_mainAbout