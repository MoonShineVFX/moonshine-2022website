import React from 'react'
import { motion,AnimatePresence  } from "framer-motion"
import ImgHeader from '../../../Components/ImgHeader'
function About() {
  const images = [
    'about-s04.png',
    'about-s02.png',
    'about-s03.png'
  ];
  return (
    <div id="about" className=''>
      <ImgHeader imgPath={'work01.png'} />
      <div className="w-11/12 mx-auto -mt-60 z-10 relative">
        <div className="w-4/5 mb-20 xs:w-full " data-aos="fade" data-aos-duration="1500">
          <h1 className='text-5xl font-light xs:text-2xl leading-normal ' >MoonShine Animation is an artist-centered VFX company based in Taiwan.</h1>
          <div className="text-xl mt-5">
            MoonShine Animation is an artist-centered VFX company based in Taiwan. We are an integrated collective of directors, designers, artists and technologists, collaborating on projects for the advertising, film and VR industries.
            <div className="mb-6"></div>
            Founded in 2012, MoonShine Animation has been through some challenges, and have done some cool things with our talents. We believe in the value of transparency and equity and constantly strive to deliver great work to the world.
          </div>
          <div className="mb-14 mt-14">
            <div className="text-3xl font-light">
             Our Strength
            </div>
            <div className="text-xl mt-5">
              MoonShine is a team consisted of diverse artists: directors, project managers, animators, compositors, research developers and designers.
              <div className="mb-6"></div>
              We offer 360-degree service from concept to screen. Being an integrated company, we are able to execute a project from script writing to concept art, from story board to animatic, from shoot to post-production.
            </div>
          </div>
        </div>
      </div>
      <div className="about_content flex flex-col w-11/12 mx-auto gap-10">
        <div className='flex  bg-zinc-800 text-white w-full' data-aos="fade-up" data-aos-duration="1500">
          <img src={process.env.PUBLIC_URL+'/images/about/about-s01.png'} alt="" className='w-3/6' />
          <div className='p-10 w-1/2'>
            <div className='text-3xl font-light'>SOLID PIPELINE</div> 
            <div className='text-xl mt-3'>
              From pre-production to post production, MoonShine has developed a mature production process.
            </div> 
          </div>
        </div>
        <div className='flex  bg-zinc-800 text-white w-full' data-aos="fade-up" data-aos-duration="1500">
          <img src={process.env.PUBLIC_URL+'/images/about/about-s02.png'} alt="" className='w-3/6' />
          <div className='p-10 w-1/2'>
            <div className='text-3xl font-light'>ASSURED QUALITY</div> 
            <div className='text-xl mt-3'>
              FWe strive for constantly making great visual works.
            </div> 
          </div>
        </div>
        <div className='flex  bg-zinc-800 text-white w-full' data-aos="fade-up" data-aos-duration="1500">
          <img src={process.env.PUBLIC_URL+'/images/about/about-s03.png'} alt="" className='w-3/6' />
          <div className='p-10 w-1/2'>
            <div className='text-3xl font-light'>DIVERSITY WORKS</div> 
            <div className='text-xl mt-3'>
              Virtual, digital, realistic…We demonstrate different style in all formats.
            </div> 
          </div>
        </div>
        <div className='flex  bg-zinc-800 text-white w-full' data-aos="fade-up" data-aos-duration="1500">
          <img src={process.env.PUBLIC_URL+'/images/about/about-s04.png'} alt="" className='w-3/6' />
          <div className='p-10 w-1/2'>
            <div className='text-3xl font-light'>RESEARCH DEVELOPMENT</div> 
            <div className='text-xl mt-3'>
              With our talented R&D technologists, we have developed our own tools and effects.
            </div> 
          </div>
        </div>

      </div>


    </div>
  )
}

export default About