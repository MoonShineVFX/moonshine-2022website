import React , { useState, useEffect }from 'react'
import { useRecoilValue } from 'recoil';
import { modalState, movieState } from '../../../atoms/modalAtom';
import { Movie } from '../../../types';
import ImgHeader from '../../../Components/ImgHeader'
import Row from '../../../Components/NetflixSlider/Row'
import Modal from '../../../Components/NetflixSlider/Modal'; 

//data
import worksData from './work.json'

//helper
import { getWorks , getCategory} from '../../../Helper/getfunction'

function Work() {
  const {works} = worksData
  const showModal = useRecoilValue(modalState);
  const [workData, setWorkData] = useState([]);
  const [filteredWorkData, setFilteredWorkData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  // const storage = getStorage();

  // 處理作品的圖片路徑
  // const mapWorkData =async (data)=>{
  //   let dataSorted = data.sort(function(a, b) {
  //     return b.sort_num - a.sort_num;
  //   });
  //   const twoarr= dataSorted.map( async (element) => {
  //     const imagesRef = ref(storage, `data/${element.img}`);
  //     const newimgurl =await getDownloadURL(imagesRef).catch((error) => {
  //       switch (error.code) {
  //         case 'storage/object-not-found':
  //           break;
  //         case 'storage/unauthorized':
  //           break;
  //         case 'storage/canceled':
  //           break;
  //         case 'storage/unknown':
  //           break;
  //         default:
  //           console.log('')
  //       }
  //     })
  //     return {...element , imgpath :newimgurl}
     
  //   })
  //   setWorkData(await Promise.all(twoarr))
  //   setFilteredWorkData(await Promise.all(twoarr))
  // }

  // const getWorks = async ()=>{
  //   const q = query(collection(db, "data"),orderBy('time_added' , 'desc'))
  //   const data = await getDocs(q);
  //   mapWorkData(data.docs.map(doc=> doc.data()))
  // }
  //執行撈資料
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
      <ImgHeader imgPath={'work01.png'} />
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
    </div>
  )
}

export default Work