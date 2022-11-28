import React from 'react'
import ImgHeader from '../../../Components/ImgHeader'
import SwiperBgImages from '../Components/SwiperBgImages'
function About() {
  const bgimages = [
    'bg_about01.png',
    'bg_about02.png',
    'bg_about03.png',
    'bg_about04.png',
    'bg_about05.png',
    'bg_about06.png',
    'bg_about07.png',
  ];
  return (
    <div>
      <SwiperBgImages imgData={bgimages}/>
      <div className="mt-16 z-10 relative">
        <div className="w-3/4 mb-20 xs:w-full mx-auto " >
          <h1 className='text-3xl font-light xs:text-2xl leading-normal ' >Creation and Illumination, attained by MoonShine's animation and visual effects.</h1>
          <div className='h-[1px] w-[120px] bg-white mt-10' ></div>
          <div className="text-lg mt-5 font-light" data-aos="fade" data-aos-duration="1500">
            MoonShine Animation is an artist-centered VFX company based in Taiwan. We are an integrated collective of directors, designers, artists and technologists, collaborating on projects for the advertising, film and VR industries.
            <div className="mb-6"></div>
            Founded in 2012, MoonShine Animation has been through some challenges, and have done some cool things with our talents. We believe in the value of transparency and equity and constantly strive to deliver great work to the world.
          </div>
          <div className="mb-14 mt-36" data-aos="fade" data-aos-duration="1500">
            <div className="text-2xl font-light">
             Our Strength
            </div>
            <div className='h-[1px] w-[120px] bg-white mt-10' ></div>
            <div className="text-lg mt-5 font-light">
              MoonShine is a team consisted of diverse artists: directors, project managers, animators, compositors, research developers and designers.
              <div className="mb-6"></div>
              We offer 360-degree service from concept to screen. Being an integrated company, we are able to execute a project from script writing to concept art, from story board to animatic, from shoot to post-production.
            </div>
          </div>
        </div>
      </div>
      <div className="about_content flex flex-col w-3/4 mx-auto gap-20">
        <div className='flex   text-white w-full' data-aos="fade-up" data-aos-duration="1500">
          <div className='w-4/6 relative'>
            <div 
              className=' absolute top-0 w-full h-full' 
              style={{background: `linear-gradient(90deg,#000,transparent 35%,transparent 65%,#000)`}}></div>
            <img src={process.env.PUBLIC_URL+'/images/about/about-s01.png'} alt=""  />
          </div>
         
          <div className='p-10 w-2/3'>
            <div className='text-2xl font-bold'>SOLID PIPELINE</div> 
            <div className='text-lg text-zinc-300 mt-3 font-light'>
              From pre-production to post production, MoonShine has developed a mature production process.
            </div> 
          </div>
        </div>
        <div className='flex   text-white w-full' data-aos="fade-up" data-aos-duration="1500">
          <div className='p-10 w-2/3'>
            <div className='text-2xl font-bold'>ASSURED QUALITY</div> 
            <div className='text-lg text-zinc-300   mt-3 font-light'>
              FWe strive for constantly making great visual works.
            </div> 
          </div>
          <div className='w-4/6 relative'>
            <div 
              className=' absolute top-0 w-full h-full' 
              style={{background: `linear-gradient(90deg,#000,transparent 35%,transparent 65%,#000)`}}></div>
            <div 
              className=' absolute top-0 w-full h-full' 
              style={{background: `linear-gradient(1turn,#000,transparent 50%,transparent 65%,#000)`}}></div>
            <img src={process.env.PUBLIC_URL+'/images/about/about-s02.png'} alt="" />
          </div>
          
        </div>
        <div className='flex   text-white w-full' data-aos="fade-up" data-aos-duration="1500">
          <div className='w-4/6 relative'>
            <div 
              className=' absolute top-0 w-full h-full' 
              style={{background: `linear-gradient(90deg,#000,transparent 35%,transparent 65%,#000)`}}></div>
            <div 
              className=' absolute top-0 w-full h-full' 
              style={{background: `linear-gradient(1turn,#000,transparent 50%,transparent 65%,#000)`}}></div>
            <img src={process.env.PUBLIC_URL+'/images/about/about-s03.png'} alt="" />
          </div>          
          <div className='p-10 w-2/3'>
            <div className='text-2xl font-bold'>DIVERSITY WORKS</div> 
            <div className='text-lg text-zinc-300  mt-3 font-light'>
              Virtual, digital, realistic…We demonstrate different style in all formats.
            </div> 
          </div>
        </div>
        <div className='flex   text-white w-full' data-aos="fade-up" data-aos-duration="1500">
          <div className='p-10 w-2/3'>
            <div className='text-2xl font-bold'>RESEARCH DEVELOPMENT</div> 
            <div className='text-lg text-zinc-300  mt-3 font-light'>
              With our talented R&D technologists, we have developed our own tools and effects.
            </div> 
          </div>
          <div className='w-4/6 relative'>
            <div 
              className=' absolute top-0 w-full h-full' 
              style={{background: `linear-gradient(90deg,#000,transparent 35%,transparent 65%,#000)`}}></div>
            <div 
              className=' absolute top-0 w-full h-full' 
              style={{background: `linear-gradient(1turn,#000,transparent 50%,transparent 65%,#000)`}}></div>
            <img src={process.env.PUBLIC_URL+'/images/about/about-s04.png'} alt=""  />
          </div>
          
        </div>

      </div>
      <div>
        <div className="w-3/4 mt-20 xs:w-full mx-auto " data-aos="fade" data-aos-duration="1500">
          <h1 className='text-2xl font-light xs:text-2xl leading-normal ' >Locations</h1>
          <div className='h-[1px] w-[120px] bg-white mt-10' ></div>
          <div className="text-lg mt-5 font-light">
            <div className='flex gap-10'>
              <div>
                <div className=' text-xl mb-5'>TAIPEI</div>
                <div className=' text-sm'>
                  02-2785-7037 <br />
                  info@moonshine.tw <br />
                  3F, No.481, Sec. 6, Zhongxiao E. Rd., Nangang Dist., Taipei City 115, Taiwan (R.O.C.)
                </div>
              </div>
              <div>
                <div className=' text-xl mb-5'>KAOHSIUNG</div>
                <div className=' text-sm'>
                  Tel   <br />
                  Email   <br />
                  Address 
                </div>
              </div>
            </div>
            <div className="mb-6"></div>

          </div>

        </div>
      </div>


    </div>
  )
}

export default About