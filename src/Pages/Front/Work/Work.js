import React , { useState, useEffect }from 'react'
import { useRecoilValue } from 'recoil';
import { modalState, movieState ,byCategoryModalState } from '../../../atoms/modalAtom';
import { Movie } from '../../../types';
import ImgHeader from '../../../Components/ImgHeader'
import Row from '../../../Components/NetflixSlider/Row'
import Modal from '../../../Components/NetflixSlider/Modal'; 
import ByCategoryModal from '../../../Components/ByCategoryModal';

//data
import worksData from './work.json'

//helper
import { getCategory} from '../../../Helper/getfunction'

function Work() {
  const {works} = worksData
  const showModal = useRecoilValue(modalState);
  const showCategoryModal = useRecoilValue(byCategoryModalState);
  const [workData, setWorkData] = useState([]);
  const [filteredWorkData, setFilteredWorkData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  //執行撈資料
  useEffect(()=>{
    // getWorks()
    // getWorks((res)=>{
    //   setWorkData(res)
    //   setFilteredWorkData(res)
    // })
    getCategory((res)=>{
      setCategoryData(res)
    })
  },[])
  return (
    <div id="work">
      <ImgHeader imgPath={'work01.png'} button={'ALL PROJECTS'} categoryData={categoryData[0]} />
      <main className="relative pl-4 pb-24 lg:space-y-24 lg:pl-16 -mt-20 z-10">
        {/* <Row title="ALL" movies={workData} /> */}
        {
          categoryData ? 
          categoryData.map((item, index)=>{
           if(item.id !== '1' ){
            return(
              <Row title={item.name} movies={works} key={item.name} categoryData={item} />
            ) 
           } 
            
          }) : <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24"></svg>
        }
      </main>
      
      {showModal && <Modal />}
      {showCategoryModal && <ByCategoryModal />}
    </div>
  )
}

export default Work