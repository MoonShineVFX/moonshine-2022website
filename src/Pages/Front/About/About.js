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
      <div className="w-5/6 mx-auto -mt-60 z-10 relative">
        <div className="w-3/5 mb-20">
          <h1 className='italic text-4xl font-bold'>MoonShine Animation is an artist-centered VFX company based in Taiwan.</h1>
        </div>
        <div className="about_content flex ">
          <div className="left flex-auto  w-48 mr-24">
            <div className="mb-14">
              <div className="text-lg font-bold mb-5">
                About MoonShine Animation
              </div>
              <div className="text-sm">
              MoonShine Animation is an artist-centered VFX company based in Taiwan. We are an integrated collective of directors, designers, artists and technologists, collaborating on projects for the advertising, film and VR industries.br
              <div className="mb-6"></div>
              Founded in 2012, MoonShine Animation has been through some challenges, and have done some cool things with our talents. We believe in the value of transparency and equity and constantly strive to deliver great work to the world.
              </div>
            </div>
            <div className="mb-14">
              <div className="text-lg font-bold mb-5">
              Organization
              </div>
              <div className="text-sm">
              MoonShine Animation is an artist-centered VFX company based in Taiwan. We are an integrated collective of directors, designers, artists and technologists, collaborating on projects for the advertising, film and VR industries.br
              <div className="mb-6"></div>
              Founded in 2012, MoonShine Animation has been through some challenges, and have done some cool things with our talents. We believe in the value of transparency and equity and constantly strive to deliver great work to the world.
              </div>
            </div>
            <div className="mb-14">
              <div className="text-lg font-bold mb-5">
              Our Strength
              </div>
              <div className="text-sm">
              MoonShine Animation is an artist-centered VFX company based in Taiwan. We are an integrated collective of directors, designers, artists and technologists, collaborating on projects for the advertising, film and VR industries.br
              <div className="mb-6"></div>
              Founded in 2012, MoonShine Animation has been through some challenges, and have done some cool things with our talents. We believe in the value of transparency and equity and constantly strive to deliver great work to the world.
              </div>
            </div>
            <div className="mb-14">
              <div className="text-lg font-bold mb-5">
              WE'VE WORKED WITH
              </div>
              <div className="text-sm">
              MoonShine Animation is an artist-centered VFX company based in Taiwan. We are an integrated collective of directors, designers, artists and technologists, collaborating on projects for the advertising, film and VR industries.br
              <div className="mb-6"></div>
              Founded in 2012, MoonShine Animation has been through some challenges, and have done some cool things with our talents. We believe in the value of transparency and equity and constantly strive to deliver great work to the world.
              </div>
            </div>

          </div>
          <div className="right flex-auto  w-32">
            <div className="flex">
              <motion.div
                initial={{ opacity: 0, y:'0'  }}
                animate={{ opacity: 1,y:'1vw' }}
                exit={{ opacity: 0 }}
                transition={{type:'spring' , stiffness:30 }} 
                className=" w-32 max-w-xs mr-4"
              >
                <div 
                className="bg-center bg-no-repeat bg-cover w-full max-w-xs pt-80"
                style={{backgroundImage: `url(${process.env.PUBLIC_URL + '/images/about/'+images[0] })`}} ></div>
              </motion.div>
               <motion.div 
                initial={{ opacity: 0, y:0  }}
                animate={{ opacity: 1,y:'12vw' }}
                exit={{ opacity: 0 }}
                transition={{type:'spring' , stiffness:30 , delay:0.15}} 
                className="w-32 mr-4 "

              >
                <div 
                className="bg-center bg-no-repeat bg-cover w-full max-w-xs pt-80"
                style={{backgroundImage: `url(${process.env.PUBLIC_URL + '/images/about/about-s02.png'})`}} ></div>
              </motion.div>
               <motion.div 
                initial={{ opacity: 0, y:'-6vw'  }}
                animate={{ opacity: 1,y:'5vw' }}
                exit={{ opacity: 0 }}
                transition={{type:'spring' , stiffness:30 , delay:0.25}} 
                className="bg-center bg-no-repeat bg-cover w-32 pt-80   mr-4 translate-y-20"
                style={{backgroundImage: `url(${process.env.PUBLIC_URL + '/images/about/about-s03.png'})`}}
              ></motion.div>
               <motion.div 
                initial={{ opacity: 0, y:15  }}
                animate={{ opacity: 1,y:'-2vw' }}
                exit={{ opacity: 0 }}
                transition={{type:'spring' , stiffness:30 , delay:0.35}} 
                className="bg-center bg-no-repeat bg-cover w-32 pt-80  translate-y-12"
                style={{backgroundImage: `url(${process.env.PUBLIC_URL + '/images/about/about-s04.png'})`}}
              ></motion.div>

            </div>

          </div>

        </div>

      </div>


    </div>
  )
}

export default About