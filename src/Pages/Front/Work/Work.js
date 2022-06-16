import React , { useState, useEffect }from 'react'
import { useRecoilValue } from 'recoil';
import { modalState, movieState } from '../../../atoms/modalAtom';
import { Movie } from '../../../types';
import ImgHeader from '../../../Components/ImgHeader'
import Row from '../../../Components/NetflixSlider/Row'
import Modal from '../../../Components/NetflixSlider/Modal';

// firebase 資料庫連線
import db from '../../../firebaseConfig/firebase'
import {collection, query,  getDocs,orderBy} from "firebase/firestore"
import { getStorage, ref, getDownloadURL,  } from "firebase/storage";

//data
import worksData from './work.json'

function Work() {
  const {works} = worksData
  const showModal = useRecoilValue(modalState);
  const [workData, setWorkData] = useState([]);
  const [filteredWorkData, setFilteredWorkData] = useState([]);
  const storage = getStorage();

  // 處理作品的圖片路徑
  const mapWorkData =async (data)=>{
    let dataSorted = data.sort(function(a, b) {
      return b.sort_num - a.sort_num;
    });
    const twoarr= dataSorted.map( async (element) => {
      const imagesRef = ref(storage, `data/${element.img}`);
      const newimgurl =await getDownloadURL(imagesRef).catch((error) => {
        switch (error.code) {
          case 'storage/object-not-found':
            break;
          case 'storage/unauthorized':
            break;
          case 'storage/canceled':
            break;
          case 'storage/unknown':
            break;
          default:
            console.log('')
        }
      })
      return {...element , imgpath :newimgurl}
     
    })
    setWorkData(await Promise.all(twoarr))
    setFilteredWorkData(await Promise.all(twoarr))
  }

  const getWorks = async ()=>{
    const q = query(collection(db, "data"),orderBy('time_added' , 'desc'))
    const data = await getDocs(q);
    mapWorkData(data.docs.map(doc=> doc.data()))
  }
  //執行撈資料
  useEffect(()=>{
    getWorks()
  },[])
  return (
    <div id="work">
      <ImgHeader imgPath={'work01.png'} />
      <main className="relative pl-4 pb-24 lg:space-y-24 lg:pl-16 -mt-20 z-10">
        <Row title="ALL" movies={workData} />
        <Row title="Animation" movies={works} />
        <Row title="VFX" movies={works} />
        <Row title="Product" movies={works} />
        <Row title="Motion Design" movies={works} />
        <Row title="New Media" movies={works} />
        <Row title="Virtual Production" movies={works} />
      </main>
      
      {showModal && <Modal />}
    </div>
  )
}

export default Work