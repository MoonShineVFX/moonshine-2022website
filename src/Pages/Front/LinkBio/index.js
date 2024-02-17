import React from 'react'

function Index() {
  const linklist=[
    {type:"Product",title:"Moonshot ai", link:"https://moonshot.today/",image:"https://moonshine.b-cdn.net/msweb/moonshotai/home_images/mslogo_model.png?width=640"},
    {type:"Product",title:"moonland",    link:"https://moonland.ai/",   image:"https://moonland.ai/assets/meta-logo.jpeg"},
    {type:"Product",title:"vpxr studio", link:"https://vpxrstudio.com/",   image:"https://vpxrstudio.com/images/space/space01.png"},
    {type:"Product",title:"moondream reality", link:"https://moondreamreality.com/",   image:"https://moondreamreality.com/mrLogo287.png"},
    {type:"in-company",title:"Zulip",    link:"https://chat.moonshine.tw/",                                       image:"https://moonshine.tw/msicon2022.png"},
    {type:"in-company",title:"KnowHow 知識",    link:"https://knowhow.moonshine.tw/",                               image:"https://moonshine.tw/msicon2022.png"},
    {type:"in-company",title:"PMB 專案管理",    link:"http:/node.io/pmb",                                           image:"https://moonshine.tw/msicon2022.png"},
    {type:"in-company",title:"資安培訓平台",    link:"https://training.knowbe4.com/",                               image:"https://moonshine.tw/msicon2022.png"},
    {type:"in-company",title:"震旦出勤系統",    link:"https://moonshine-login.aoacloud.com.tw/",                    image:"https://moonshine.tw/msicon2022.png"},
    {type:"Social media",title:"MOONLAND Instagram",    link:"https://www.instagram.com/moonland_ai/",          image:"https://moonshine.tw/msicon2022.png"},
    {type:"Social media",title:"發光吧 facebook",    link:"https://www.facebook.com/moonshinesparkling",          image:"https://moonshine.tw/msicon2022.png"},
    {type:"Social media",title:"Moonshine facebook",    link:"https://www.facebook.com/MoonShineAnimation",   image:"https://moonshine.tw/msicon2022.png"},
    {type:"Social media",title:"Moonshine Behance",    link:"https://www.behance.net/studiomoonshine",        image:"https://moonshine.tw/msicon2022.png"},
    {type:"Social media",title:"Moonshine Medium",    link:"https://moonshineanimation.medium.com/",          image:"https://moonshine.tw/msicon2022.png"},
    {type:"Social media",title:"Moonshine Twitter",    link:"https://twitter.com/moonshinevfx",               image:"https://moonshine.tw/msicon2022.png"},
    {type:"Social media",title:"Moonshine Instagram",    link:"https://www.instagram.com/moonshine.tw",         image:"https://moonshine.tw/msicon2022.png"},
    {type:"Social media",title:"Moonshine Linkedin",    link:"https://www.linkedin.com/company/moonshineanimation/",    image:"https://moonshine.tw/msicon2022.png"},
    {type:"Social media",title:"Moonshine Youtube",    link:"https://www.youtube.com/c/MoonShineAnimationStudio",       image:"https://moonshine.tw/msicon2022.png"},
    {type:"Social media",title:"Moonshine vimeo",    link:"https://vimeo.com/moonshinetw",                              image:"https://moonshine.tw/msicon2022.png"},
    {type:"Social media",title:"Moonshine 104",    link:"https://www.104.com.tw/company/1a2x6bj8dd",                    image:"https://moonshine.tw/msicon2022.png"},

  ]
  const types = [...new Set(linklist.map(item => item.type))];
  return (
    <div className="mt-16 z-10 relative w-10/12 lg:w-3/5 mb-20  mx-auto">
      <div className='text-center text-white/80 my-10'>Moonshine Studio Entrance</div>
      <div className='flex flex-col items-center justify-center space-y-8  mx-auto'>
      {types.map(type => (
          <React.Fragment key={type}>
            <div className="mt-4 text-xl font-bold text-white">{type}</div>
            {/* 根据当前 type 过滤 linklist 并渲染链接 */}
            <div className='grid lg:grid-cols-2 gap-8 w-full'>
            {linklist.filter(item => item.type === type).map((item, index) => {
              const { title, link, image } = item;
              return (
                <a key={index} href={link} target='_blank' className='w-full px-4 py-4 bg-white text-black rounded-full text-center flex  items-center'>
                  <div className='relative w-7'>
                    <div className='pt-[100%]'>
                      <img src={image} alt="" className='absolute top-0 left-0 rounded-full aspect-square' />
                    </div>
                  </div>
                  <div className='w-full flex justify-center font-semibold capitalize'>
                    {title} 
                  </div>
                </a>
              );
            })}
            </div>

          </React.Fragment>
        ))}
      </div>

    </div>
  )
}

export default Index