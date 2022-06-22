import React,{useState,useEffect} from 'react'
// import ImgHeader from '../../../Components/ImgHeader'
import { motion,AnimatePresence  } from "framer-motion"
import serviceData from '../Home/Services.json';
import { BsShieldLockFill } from 'react-icons/bs';
import { resolve } from 'path';
import { Link , useSearchParams   } from "react-router-dom";

function Services() {
  const {service} = serviceData
  const [currentData , setCurrentData] = useState([])
  const [showBg , setShowBg] = useState(true)
  const [getParams, setParam] = useSearchParams()
  const q = getParams.getAll('q')


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
  const filterData = () =>{
    if( q.length !== 1){
      setCurrentData(service[0])
      setParam({q : service[0].params_name})
    } else{
      const data = service.filter(function (e){
        return e.params_name === q[0] ; 
      })
      setCurrentData(data[0])
    }

  }

  useEffect(()=>{
    window.scrollTo(0, 0)
    filterData()
  },[])
  return (
    <>
    
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
        {
          currentData.types === 'link' ? 
         showBg && (
          <motion.a 
            key='link'
            href={currentData.link}
            target="_blank"
            className='inline-flex items-center justify-center h-12 px-5 py-0 text-sm font-semibold text-center text-gray-200 no-underline align-middle transition-all duration-300 ease-in-out bg-transparent border-2 border-zinc-600 border-solid rounded-full cursor-pointer select-none hover:text-white hover:border-white focus:shadow-xs focus:no-underline mt-5'
            initial={{ opacity: 0 , y: '-2vw' }}
            animate={{ opacity: 1 , y:  0}}
            exit={{ opacity: 0, y: '-2vw' }}
            transition={{delay:0.4 , duration: 0.5}}
          >
            Visit Website
          </motion.a>

        ) : null
        }
        
        </AnimatePresence>



      </div>
      <div className='flex  border-t  border-[#ffffff83] absolute bottom-0 w-full'>
        {
          service.map((item,index)=>{
            const {id, title,params_name} = item
            return(
              <div 
                key = {id}
                className='flex-1 flex justify-center items-center border-x border-[#ffffff1a]  h-48 min-h-0 box-border transition cursor-pointer text-[#c5c5c5] hover:bg-[#0000004d] hover:border-t-4 hover:border-t-slate-400 z-30 '
                onClick={()=> {
                  handleClick(id)
                  setParam({q : params_name})
                }}
              > 
                {title}
              </div>
            )
          })
        }
      </div>
    </div>
    {
        currentData.types === 'article' ? 
        <div className=''>
          <div className="text-center pt-16 md:pt-32">
            <p className="text-sm md:text-base text-green-500 font-bold"> {currentData.title}</p>
            <h1 className="font-bold break-normal text-3xl md:text-5xl">{currentData.title}</h1>
          </div>
          <div className="container max-w-5xl mx-auto">
          {
            currentData.children.map((child,idx)=>{
              const {types , title,text,image} = child
              return(
                <>
                  {types === 'one-image' ? 
                  <div 
                    className=" w-full max-w-6xl mx-auto bg-white bg-cover mt-8 rounded" 
                    style={{
                      height: "35vh",
                      backgroundImage: `url(${process.env.PUBLIC_URL + '/images/service/' + image})`
                    }}
                    ></div> :""}
                  {types === 'title-text' ?  
                  <div className="p-8 text-center">
                    <div className="text-2xl md:text-3xl mb-5">{title}</div>
                    <div className="py-6 text-slate-500">{text}</div>
                  </div> : ""}

                </>
              )
            })
          }
          </div>
        </div> : null



      }
    </>
  )
}

export default Services