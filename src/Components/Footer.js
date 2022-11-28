import React from 'react'
import PartnerMarquee from './PartnerMarquee'
function Footer({footerData,socialmedia,partnerjsonData}) {
  const {footer} = footerData
  return (
    <div className="flex flex-col items-center pt-24 mb-16 w-full mx-auto ">
      {
        partnerjsonData &&  <PartnerMarquee  partnerData={partnerjsonData}/>
      }
      <div className="flex flex-wrap justify-center mx-auto md:flex-row gap-10 mt-20">
        {socialmedia.length >0 ? 
          socialmedia.map((item,index)=>{
            const {id ,image , link, title} = item
            return(
              <div key={id} className="social">
                <a href={link} target="_blank" rel="noreferrer" className='text-base text-zinc-400 hover:text-zinc-100'>
                  {title}
                </a> 
              </div>
            )
          }) : <div></div>
        }
        
      </div>
      
      <div className="flex  gap-8 mt-5 flex-col ">
        {partnerjsonData && 
          <div className="contact_info mt-16">
            <div className="infoArea flex xs:flex-wrap gap-12 text-sm text-zinc-400  ">
              <div className="infoContent flex-auto hover:text-zinc-100">
                <p className='text-gray-200'>Tel</p>
                <p>+886-2-27857037</p>
              </div>
              <div className="infoContent flex-auto hover:text-zinc-100">
                <p className='text-gray-200'>Email</p>
                <p>info@moonshine.tw</p>
              </div>
              <div className="infoContent flex-auto xs:mt-12 hover:text-zinc-100">
                <p className='text-gray-200'>Address</p>
                <p>3F, No.481, Sec. 6, Zhongxiao E. Rd., Nangang Dist., Taipei City 115, Taiwan (R.O.C.)</p>
              </div>
            </div>
          </div>
        }
        <div className="text-sm text-zinc-400 text-center ">{footer.copyright}</div> 
      </div>
      
    </div>  
  )
}

export default Footer