import React,{useState,useEffect} from 'react'
// import ImgHeader from '../../../Components/ImgHeader'
import { motion,AnimatePresence  } from "framer-motion"
import serviceData from '../Home/Services.json';
import { BsShieldLockFill } from 'react-icons/bs';
import { resolve } from 'path';

function Services() {
  const {service} = serviceData
  const [currentData , setCurrentData] = useState([])
  const [showBg , setShowBg] = useState(true)
  const handleClick = (dataId) =>{

    disapearElement()
      .then(res=>{
        console.log(res)
        const results  =   service.find((d)=>{
          return d.id === dataId
        })
        setCurrentData(results)
        setTimeout(()=>{
          setShowBg(true)
        },700)
        
      })
      .catch((err)=>{
        console.log(err)
      })
    
  
  }
  const disapearElement = ()=>{
    return new Promise((resolve, reject) => {
        setShowBg(false)
        if(showBg){
          resolve('success')
        }else{
          reject('fail')
        }

    })
  }

  useEffect(()=>{
    setCurrentData(service[0])
  },[])
  return (
    <div className="relative  w-full h-screen">
      <div className='w-full h-screen  absolute  bg-gradient-to-t from-black z-10'></div>
      <AnimatePresence>
        {
          showBg && (
            <motion.div 
            key="bg"
            id="service_header" 
            style={{backgroundImage: `url(${process.env.PUBLIC_URL + '/images/service/' + currentData.image})`}} 
            className="relative  w-full h-screen  top-0 bg-no-repeat bg-center bg-cover "
            initial={{ opacity: 0 , top:'10vh' }}
            animate={{ opacity: 1 , top:0 }}
            exit={{ opacity: 0, top: '-10vh' }}
            transition={{type:'spring' , stiffness:50}}
            >
          </motion.div>
          )
        }
      </AnimatePresence>
      <div className='absolute top-[45%] left-[10%] w-2/5 z-20'>
      <AnimatePresence>
        {
          showBg && (
            <motion.h1 
              key='title'
              className='text-5xl mb-5 font-medium ' 
              initial={{ opacity: 0 , x: '-2vw' }}
              animate={{ opacity: 1 , x:  0}}
              exit={{ opacity: 0 ,x: '-2vw'}}
              transition={{delay:0.1 , duration: 0.5}}
            >
              {currentData.title}
            </motion.h1>
          )
        }
        {
          showBg && (
            <motion.div 
            key='desc'
            className='text-base'
            initial={{ opacity: 0 , y: '-2vw' }}
            animate={{ opacity: 1 , y:  0}}
            exit={{ opacity: 0, y: '-2vw' }}
            transition={{delay:0.2 , duration: 0.5}}
          >
            {currentData.desc}
          </motion.div>
          )
        }
        
        </AnimatePresence>
      </div>
      <div className='flex  border-t  border-[#ffffff83] absolute bottom-0 w-full'>
        {
          service.map((item,index)=>{
            const {id, title} = item
            return(
              <div 
                key = {id}
                className='flex-1 flex justify-center items-center border-x border-[#ffffff1a]  h-48 min-h-0 box-border transition cursor-pointer text-[#c5c5c5] hover:bg-[#0000004d] hover:border-t-4 hover:border-t-slate-400 z-30 '
                onClick={()=> {handleClick(id)}}
              > 
                {title}
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Services