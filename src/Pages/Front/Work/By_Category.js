import React, { useState, useEffect } from 'react'
import { getCategory,getWorksByCategoryCid} from '../../../Helper/getfunction'
import Header from '../../../Components/Header'
import { motion,AnimatePresence } from "framer-motion"
import { useParams } from "react-router-dom";
import { LoadingAnim } from '../../../Helper/HtmlComponents';
import { categoryState,modalState, movieState } from '../../../atoms/modalAtom';
import {  useRecoilValue ,useRecoilState } from 'recoil';
import Modal from '../../../Components/NetflixSlider/Modal';
function By_Category() {
  let { cSlug} = useParams();
  const isShowModal = useRecoilValue(modalState);
  const [currentMovie, setCurrentMovie] = useRecoilState(movieState);
  const [showModal, setShowModal] = useRecoilState(modalState);

  const [categoryData, setCategoryData] = useState([]);
  const [filteredWorkData, setFilteredWorkData] = useState([]);
  const [currentSubCategory, setCurrentSubCategory] = useState('ALL');
  const [currentCategory, setCurrentCategory] = useRecoilState(categoryState)
  const [workData, setWorkData] = useState([]);
  const category = useRecoilValue(categoryState);
  const filterCategory = (categoryID)=>{
    console.log(categoryID)
    if(categoryID === 'ALL'){
      setCurrentSubCategory('ALL')
      setFilteredWorkData(workData)
      
      return
    }
    const filteredData =  workData.filter((value)=>{ 
      return value.sub_category === categoryID
    })
    setCurrentSubCategory(categoryID)
    setFilteredWorkData(filteredData);
    
  }


  const filterMainCateogry = (res) =>{
    const categoryItem = res.filter((item)=>{
      return item.slug === cSlug
    })
    setCurrentCategory(categoryItem[0])
    hasCategoryDoGetWoks(categoryItem[0].id)

  }
  const hasCategoryDoGetWoks =(cid) => {
    console.log(cid)
    getWorksByCategoryCid(cid,(res)=>{
      setWorkData(res)
      setFilteredWorkData(res)
      console.log(res)
    })
  }

  useEffect(()=>{
    if (category !== null) {
      console.log(category)
      hasCategoryDoGetWoks(category.id)
    }else{
      getCategory((res)=>{
        filterMainCateogry(res)
      })
      console.log(category)
    }

  },[])
  return (
    <section id="by_category">
       <Header v_url={category && category.video_url } header_title={currentCategory && currentCategory.name} />
        <div>
          <ul className='flex justify-center items-center gap-5 h-24 uppercase font-thin text-xl'>
              <li
                onClick={()=> filterCategory('ALL')} 
                className={"cursor-pointer hover:text-white  transition-all " + (currentSubCategory === 'ALL' ? ' text-white ' : 'text-zinc-500  ' )}>
              
                 ALL
              </li>
          {category && category.sub_category &&
            category.sub_category.map((item,index)=>{
              const{id, title , name_cht } = item
              return(
                <li key={id} 
                    onClick={()=> filterCategory(id)} 
                    className={"cursor-pointer hover:text-white  transition-all " + (currentSubCategory === id ? ' text-white ' : 'text-zinc-500  ' )}>
                  {title }
                </li>
              )
            })
            
           
           }
           </ul>
        </div>

        <div id='workContainer'>
          <motion.div className={' grid grid-cols-5  xs:grid-cols-3 xs:w-5/6 xs:mx-auto mx-auto ' + (category && category.slug === 'vfx' ? ' w-10/12 gap-6 ' : ' w-11/12 gap-3')}>
          <AnimatePresence>
          {filteredWorkData ?
            filteredWorkData.map((item,index)=>{
              const {id,title ,img,imgpath,display} = item
              return(
                <motion.div 
                  key={id+title}
                  animate={{ opacity: 1 }}
                  initial={{ opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration :0.8 }}   
                  className={"bg-black w-full  relative rounded-md  transition cursor-pointer duration-200 xs:w-[25vw] overflow-hidden group " + (category && category.slug === 'vfx' ? ' aspect-[10/15] ' : ' aspect-[16/10] ') }
                  
                  onClick={() => {
                    setShowModal(true);
                    setCurrentMovie(item);
                  }}>
                  <div
                    className='bg-center bg-cover bg-no-repeat  w-full h-full group-hover:scale-125 brightness-75 group-hover:brightness-110 transition ease-linear  '
                    style={{backgroundImage : `url(${imgpath})`}}
                  ></div>  
                  <div className={"transition-all translate-x-2 -translate-y-5 group-hover:-translate-y-full " + (category && category.slug === 'vfx' ? ' text-base  ' : ' text-xs ')}> {title} </div>
                </motion.div> 
              )
            })
            : <LoadingAnim />
          }
          </AnimatePresence>
          </motion.div>
        </div>

        {isShowModal && <Modal />}
    </section>
  )
}

export default By_Category