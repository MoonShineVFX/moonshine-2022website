import React, { useState, useEffect } from 'react'
import { getCategory,getWorksByCategoryCid,getWorksBySubCategoryCid} from '../../../Helper/getfunction'
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
  const [currentSubCategory, setCurrentSubCategory] = useState('');
  const [currentCategory, setCurrentCategory] = useRecoilState(categoryState)
  const [workData, setWorkData] = useState([]);
  const category = useRecoilValue(categoryState);
  const filterCategory = (item)=>{
    // console.log(categoryID)
    if(item.id === 'ALL'){
      setCurrentSubCategory('ALL')
      setFilteredWorkData(workData)
      
      return
    }
    const filteredData =  workData.filter((value)=>{ 
      return value.sub_category === item.id
    })
    setCurrentSubCategory(item)
    setFilteredWorkData(filteredData);
    
  }

  const filterMainCateogry = (res) =>{
    console.log(res)
    const categoryItem = res.filter((item)=>{
      return item.slug === cSlug
    })
    // if categoryItem not have sub_category just show this work
    // if have sub_category show sub_category title and filter work
    console.log(categoryItem)
    setCurrentCategory(categoryItem[0])
    if(!categoryItem[0].sub_category){
      hasCategoryDoGetWoks({cid:categoryItem[0].id,is_Sub:false})
    }else{
      hasCategoryDoGetWoks({cid:categoryItem[0].id,is_Sub:true})
      getWorkBySubCategory(categoryItem[0].sub_category[0].id)
      setCurrentSubCategory(categoryItem[0].sub_category[0])
    }

  }

  //go firebase api 
  const hasCategoryDoGetWoks =({cid,is_Sub}) => {
    console.log(cid,is_Sub)
    getWorksByCategoryCid(cid,(res)=>{
      if(is_Sub === false){
        setFilteredWorkData(res)
      }
      setWorkData(res)
    })
  }
  //go firebase api 
  const getWorkBySubCategory = (scid)=>{
    getWorksBySubCategoryCid(scid,(res)=>{
      setFilteredWorkData(res)
      console.log(res)
    })
  }

  useEffect(()=>{
    if (category !== null) {
      console.log(category)
      if(!category.sub_category){
        hasCategoryDoGetWoks({cid:category.id,is_Sub:false})
      }else{
        hasCategoryDoGetWoks({cid:category.id,is_Sub:true})
        getWorkBySubCategory(category.sub_category[0].id)
        setCurrentSubCategory(category.sub_category[0])
      }
      
    }else{
      getCategory((res)=>{
        filterMainCateogry(res)
      })
    }

  },[])
  return (
    <section id="by_category">
        <Header v_url={category && category.video_url } header_title={currentCategory && currentCategory.name} />
        <div className='mx-20 my-7'>
          <div className='text-3xl text-left mt-10  font-light'>
           {currentCategory && currentCategory.name}
          </div>
          <div className='h-[1px] w-[60px] bg-white mt-12 mb-3'></div>
          <ul className='flex justify-start items-center gap-5 h-16 uppercase font-light text-lg'>
          {category && category.sub_category &&
            category.sub_category.map((item,index)=>{
              const{id, title , name_cht } = item
              
              return(
                <li key={id} 
                    onClick={()=> filterCategory(item)} 
                    className={"cursor-pointer hover:text-white  transition-all " + (currentSubCategory.id === id ? ' text-white ' : 'text-zinc-500  ' )}>
                  {title }
                </li>
              )
            })
          }
           </ul>
        </div>

        <div id='workContainer'>
          <motion.div className={' grid grid-cols-3  xs:grid-cols-3 xs:w-5/6 xs:mx-auto mx-auto ' + (category && category.slug === 'vfx' ? ' w-full gap-0 ' : ' w-full gap-0')}>
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
                  className={"bg-black w-full  relative  transition cursor-pointer duration-200 xs:w-[25vw] overflow-hidden group " + (category && currentSubCategory.id === 'vfx01' ? ' aspect-[10/15] ' : ' aspect-[16/10] ') }
                  
                  onClick={() => {
                    setShowModal(true);
                    setCurrentMovie(item);
                  }}>
                  <div
                    className='bg-center bg-cover bg-no-repeat  w-full h-full group-hover:scale-125 brightness-90 group-hover:brightness-110 transition ease-linear  '
                    style={{backgroundImage : `url(${imgpath})`}}
                  ></div>  
                  <div className={"transition-all  group-hover:bottom-9 font-light absolute  bottom-8 left-8" + (category && currentSubCategory.id === 'vfx01' ? ' text-lg  ' : ' text-lg ')}> {title} </div>
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