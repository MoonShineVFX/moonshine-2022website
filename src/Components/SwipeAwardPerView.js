import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";
function SwipeAwardPerView({awardData}) {
  return (
    <div className=' relative w-11/12'>
      <Swiper
        slidesPerView={5}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {
          awardData.map((item,index)=>{
            return(
              <SwiperSlide key={index}>
                <div className='flex flex-col justify-center items-center text-center'>
                  <div><img src={process.env.PUBLIC_URL+'/images/award/'+ item.image} alt="" /></div>
                  <div className='text-[1.2rem] font-bold mb-3'>{item.title}</div>
                  <div className='text-zinc-300'>{item.awardtitle}</div>
                  <div className='text-zinc-300'>{item.subtitle}</div>
                </div>
              </SwiperSlide>
            )
          })
        }
      </Swiper>
    </div>
  )
}

export default SwipeAwardPerView