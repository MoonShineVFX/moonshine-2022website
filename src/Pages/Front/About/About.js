import React from 'react'

import ImgHeader from '../../../Components/ImgHeader'
function About() {
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
              <div 
                className="bg-center bg-no-repeat bg-cover w-32 max-w-xs pt-80   mr-4"
                style={{backgroundImage: `url(${process.env.PUBLIC_URL + '/images/work/work01.png'})`}}
              ></div>
               <div 
                className="bg-center bg-no-repeat bg-cover w-32 pt-80 mr-4 translate-y-40"
                style={{backgroundImage: `url(${process.env.PUBLIC_URL + '/images/work/work02.png'})`}}
              ></div>
               <div 
                className="bg-center bg-no-repeat bg-cover w-32 pt-80   mr-4 translate-y-20"
                style={{backgroundImage: `url(${process.env.PUBLIC_URL + '/images/work/work03.png'})`}}
              ></div>
               <div 
                className="bg-center bg-no-repeat bg-cover w-32 pt-80  translate-y-12"
                style={{backgroundImage: `url(${process.env.PUBLIC_URL + '/images/work/work04.png'})`}}
              ></div>

            </div>

          </div>

        </div>

      </div>


    </div>
  )
}

export default About