import React from 'react'

function Index() {
  const linklist=[
    {title:"Moonshot ai", link:"https://moonshot.today/",image:"https://moonshine.b-cdn.net/msweb/moonshotai/home_images/mslogo_model.png?width=640"},
    {title:"moonland",    link:"https://moonland.ai/",   image:"https://moonland.ai/assets/meta-logo.jpeg"},
    {title:"vpxr studio", link:"https://vpxrstudio.com/",   image:"https://vpxrstudio.com/images/space/space01.png"},
    {title:"Moonshine Zulip",    link:"https://chat.moonshine.tw/",   image:"https://moonshine.tw/images/mslogo2022.svg"},
    {title:"Moonshine fb",    link:"https://www.facebook.com/MoonShineAnimation",   image:"https://moonshine.tw/images/mslogo2022.svg"},
    {title:"Moonshine Instagram",    link:"https://www.instagram.com/moonshine.tw",   image:"https://moonshine.tw/images/mslogo2022.svg"},
    {title:"Moonshine Linkedin",    link:"https://www.linkedin.com/company/moonshineanimation/",   image:"https://moonshine.tw/images/mslogo2022.svg"},
    {title:"Moonshine Youtube",    link:"https://www.youtube.com/c/MoonShineAnimationStudio",   image:"https://moonshine.tw/images/mslogo2022.svg"},
    {title:"Moonshine vimeo",    link:"https://vimeo.com/moonshinetw",   image:"https://moonshine.tw/images/mslogo2022.svg"},
    {title:"Moonshine 104",    link:"https://www.104.com.tw/company/1a2x6bj8dd",   image:"https://moonshine.tw/images/mslogo2022.svg"},
  ]
  return (
    <div className="mt-16 z-10 relative w-10/12 lg:w-3/5 mb-20  mx-auto">
      <div className='text-center text-white/80 my-10'>Moonshine Studio Entrance</div>
      <div className='flex flex-col items-center justify-center space-y-4 lg:w-1/2 mx-auto'>
      {
        linklist.map((item,index)=>{
          const{title,link,image} = item
          return(
            <a href={link} target='_blank' 
              className='w-full px-4 py-4 bg-white text-black rounded-full text-center flex  items-center'>
              <div className=' relative w-7'>
                <div className='pt-[100%]'>
                  <img src={image} alt="" className='absolute top-0 left-0 rounded-full aspect-square' />
                </div>
              </div>
              <div className='w-full flex justify-center font-semibold capitalize'>
                {title} 
              </div>
           
            </a>
          )
        })
      }
      </div>

    </div>
  )
}

export default Index