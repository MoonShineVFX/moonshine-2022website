import React , { useState, useEffect }from 'react'
import { useRecoilValue,useRecoilState } from 'recoil';
import { modalState, movieState ,byCategoryModalState } from '../../../atoms/modalAtom';
import { motion,AnimatePresence } from "framer-motion"
//components
import Header from '../../../Components/Header'
import { LoadingAnim } from '../../../Helper/HtmlComponents';
import Modal from '../../../Components/NetflixSlider/Modal';
//Helper
import { getCategory,getWorks} from '../../../Helper/getfunction'




function DefaultWork() {
  const isShowModal = useRecoilValue(modalState);
  const [workData, setWorkData] = useState([]);
  const [filteredWorkData, setFilteredWorkData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [currentCategory, setCurrentCategory] = useState('1');
  const [showModal, setShowModal] = useRecoilState(modalState);
  const [currentMovie, setCurrentMovie] = useRecoilState(movieState);
  const filterCategory = (categoryID)=>{
    if(categoryID === '1'){
      setCurrentCategory('1')
      setFilteredWorkData(workData)
      
      return
    }
    const filteredData =  workData.filter((value)=>{
      return value.category === categoryID;
    })
    setCurrentCategory(categoryID)
    setFilteredWorkData(filteredData);
    
    
  }
  useEffect(()=>{
    // getWorks()
    getWorks((res)=>{
      setWorkData(res)
      setFilteredWorkData(res)
    })
    getCategory((res)=>{
      setCategoryData(res)
    })

  },[])
  return (
    <div id="work">
      <Header />
      <div id='catrgoriesList' className=''>
        <ul className='flex justify-center items-center gap-4 h-14'>
        {
          categoryData ? 
          categoryData.map((item,index)=>{
            const{id, name , name_cht } = item
            return(
              <li key={name+id} 
                  onClick={()=> filterCategory(id)} 
                  className="text-zinc-500 cursor-pointer hover:text-white">
                {name }
              </li>
            )
          }): <LoadingAnim />
        }
        </ul>
      </div>
      <div id='workContainer'>
        <motion.div layout className='w-11/12 grid grid-cols-5 gap-3 xs:grid-cols-3 xs:w-5/6 xs:mx-auto mx-auto'>
        <AnimatePresence>
          {filteredWorkData ? 
            filteredWorkData.map((item,index)=>{
              const {id,title ,img,imgpath,display} = item
              return(
                  display === "1" ? 
                  <motion.div 
                    key={id}
                    layout
                    animate={{ opacity: 1 }}
                    initial={{ opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-black w-full aspect-[16/10] relative rounded-md  transition cursor-pointer duration-200   xs:w-[25vw]   overflow-hidden group " 
                    
                    onClick={() => {
                      setShowModal(true);
                      setCurrentMovie(item);
                    }}>
                    <div
                      className='bg-center bg-cover bg-no-repeat  w-full h-full group-hover:scale-125 brightness-75 group-hover:brightness-110 transition ease-linear  '
                      style={{backgroundImage : `url(${imgpath})`}}
                    ></div>  
                    <div className="opacity-1 transition -translate-y-5 translate-x-2 group-hover:opacity-100 group-hover:-translate-y-6 text-xs  ">{title} </div>
                  </motion.div> :""
                    
                
              )
            }) : <LoadingAnim />
          }
        </AnimatePresence>
        </motion.div>
      </div>
      {isShowModal && <Modal />}
    </div>
  )
}

export default DefaultWork