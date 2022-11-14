import React from 'react'

function Footer({footerData,socialmedia}) {
  const {footer} = footerData
  return (
    <div className="flex flex-col justify-center items-center mt-24 mb-16 ">
      <div className="flex gap-20 ">
        {socialmedia.length >0 ? 
          socialmedia.map((item,index)=>{
            const {id ,image , link, title} = item
            return(
              <div key={id} className="social">
                <a href={link} target="_blank" rel="noreferrer" className='text-base uppercase text-zinc-500 hover:text-zinc-100'>
                  {title}
                </a> 
              </div>
            )
          }) : <div></div>
        }
        
      </div>
      <div className=" flex my-5 items-center gap-4 mt-14">
        <div className="text-xs text-zinc-400">{footer.copyright}</div> 
      </div>
      
    </div>  
  )
}

export default Footer