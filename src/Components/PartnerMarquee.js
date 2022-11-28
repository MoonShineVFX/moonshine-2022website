import React from 'react'
import Marquee from "react-fast-marquee";

function PartnerMarquee({partnerData}) {
  const {partner} = partnerData
  return (
    <div id="partner_marquee">
      <Marquee 
        speed={30}
        gradientColor={[0,0,0]}
        className="h-[120px] align-middle items-center"
      >
        <div className="marquee-content inline-block items-center my-12">
          {
            partner?
            partner.map((item,index)=>{
              return (
                <div className="marquee-item w-[130px] h-[120px] leading-[120px] float-left mx-4 align-middle" key={index}>
                  <img 
                    src={process.env.PUBLIC_URL+'/images/partner/'+item.image} alt="" className='max-w-[80px] align-middles mx-0 my-auto block'
                  />
                </div>
              )
            }) : ""
          }
        </div>
        
      </Marquee>

    </div>

  )
}

export default PartnerMarquee