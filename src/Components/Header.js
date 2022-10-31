import React from 'react'
import ReactPlayer from 'react-player'
import { motion } from "framer-motion"
function Header({v_url}) {
  return (
    <div id="header" className='relative w-full h-[68vh] bg-no-repeat bg-center bg-cover xs:h-[35vh]'>
      <div className=' absolute bottom-40 w-40 right-14 md:w-20 md:right-9'>
        <img src={ process.env.PUBLIC_URL + '/images/tpn-white.png'} alt="" className='w-full' />
      </div>
      <div className="vimeo-wrapper">
        {/* <iframe src="https://player.vimeo.com/video/706129402?background=1&autoplay=1&loop=1&byline=0&title=0"
                frameBorder="0" allowFullScreen></iframe> */}
        <ReactPlayer
          url={v_url}
          className='react-player'
          playing
          muted
          loop
          width='100vw'
          height='56.25vw'
          config={{ vimeo: { playerOptions: { background: true }}}}
        />
      </div>
      <div className="caption absolute  inset-0 flex flex-col justify-center items-center -translate-y-20">
          {/* <img src={ process.env.PUBLIC_URL + '/images/MS_logo.svg'} alt="" className='w-1/3' /> */}
        {/* <div className="title">MOONSHINE</div> */}
        {/* <button type='button' className="header_playbtn" >play video</button> */}
      </div>
    
    </div>
  )
}

export default Header