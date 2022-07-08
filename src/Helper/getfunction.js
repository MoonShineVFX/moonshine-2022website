// firebase 資料庫連線
import db from '../firebaseConfig/firebase'
import {collection, query,  getDocs,orderBy,where,limit,limitToLast,startAfter,endBefore,addDoc,deleteDoc,doc} from "firebase/firestore"
import { getStorage, ref, getDownloadURL,  } from "firebase/storage";
import { async } from '@firebase/util';
const storage = getStorage();


/**
 * 取5筆資料
 * **/
export const getNewestWorks = async (callback) =>{
  const q = query(collection(db, "data"),orderBy('time_added' , 'desc'), where("display", "==", '1'),limit(5))
  const data = await getDocs(q);
  mapWorkData(data.docs.map(doc=> doc.data()),function(res){
    callback(res)
  })
}

/**
 * 到 firebase 撈作品資料表 全部
 * 資料先傳到 mapWorkData 處理過圖片路徑再回傳 setWorkData 給網頁用 
 * 條件 display 1 設定顯示的
 * **/ 
export const getWorks = async (callback)=>{
  const q = query(collection(db, "data"),orderBy('time_added' , 'desc'), where("display", "==", '1'))
  const data = await getDocs(q);
  mapWorkData(data.docs.map(doc=> doc.data()),function(res){
    callback(res)
  })
}


// 處理作品的圖片路徑
const mapWorkData =async (data , callback)=>{
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
  callback(await Promise.all(twoarr))
  // setWorkData(await Promise.all(twoarr))
  // setFilteredWorkData(await Promise.all(twoarr))
}


/**
 * 到 firebase 撈分類資料表
 * 不用處理圖片路徑的 直接 set
 * **/ 
 export const getCategory = async (callback)=>{
  const q = query(collection(db, "category"))
  const data = await getDocs(q);
  // mapCategoryData(data.docs.map(doc=> doc.data()))
  callback(data.docs.map(doc=> doc.data()))
}


/**
 * query by catergory id
 * 按分類 分好作品  給ROW用
 * **/
export const queryByCategoryId = async (cid,callback)=>{

  const q = query(collection(db, "data"), where("category", "==", cid),orderBy('time_added' , 'desc'), where("display", "==", '1'),limit(15));
  const data = await getDocs(q);
  // console.log(data.docs.map(doc=> doc.data()))
  mapWorkData(data.docs.map(doc=> doc.data()),function(res){
    callback(res)
  })
}


/**
 * 按照分類ID 取得作品的 並且分頁
 * lastestdoc 很重要
 * **/
let latestDoc = null
export const getWorksByCategoryAndLimits = async (cid,callback)=>{

  const q = query(collection(db, "data"), 
    where("category", "==", cid),
    orderBy('time_added' , 'desc'), 
    where("display", "==", '1'))
    ;
  const data = await getDocs(q);
  latestDoc = data.docs[data.docs.length -1 ]


  mapWorkData(data.docs.map(doc=> doc.data()),function(res){
    callback(res)
  })
}

export const getNextWorksByCategoryAndLimits = async (cid,callback)=>{
  const q = query(collection(db, "data"), 
    where("category", "==", cid),
    orderBy('time_added' , 'desc'),
    startAfter(latestDoc),
    where("display", "==", '1'),limit(10))
    ;
  const data = await getDocs(q);


  mapWorkData(data.docs.map(doc=> doc.data()),function(res){
    callback(res)
  })
}



/**
 * 到 firebase 撈作品資料表 
 * 資料先傳到 mapWorkData 處理過圖片路徑再回傳 setWorkData 給網頁用 
 * 條件 display 全部 要給後台用(admin) 
 * **/ 
export const getAllWorksForDashboard = async (callback)=>{
  const q = query(collection(db, "data"),orderBy('time_added' , 'desc'),limit(10))
  const data = await getDocs(q);
  mapWorkData(data.docs.map(doc=> doc.data()),function(res){
    callback(res)
  })
}

export const getNextWorkForDashboard = async (item , callback) => {
  const q = query(collection(db, "data"),orderBy('time_added' , 'desc'),limit(10),startAfter(item.time_added))
  const data = await getDocs(q);
  mapWorkData(data.docs.map(doc=> doc.data()),function(res){
    callback(res)
  })
}

export const getPrevWorkForDashboard = async (item , callback) => {
  const q = query(collection(db, "data"),orderBy('time_added' , 'desc'),endBefore(item.time_added),limitToLast(10))
  const data = await getDocs(q);
  mapWorkData(data.docs.map(doc=> doc.data()),function(res){
    callback(res)
  })
}

export const getSearchWork = async (search , callback)=>{

}

export const createWork = async (data , callback)=>{
  const collectionRef = collection(db ,"data")
  try {
    await addDoc(collectionRef,data)
    callback('success')
  } catch (error) {
    console.log(error)
    callback(error)
  }
}
export const deleteWork = async(uid)=>{
  const workDoc = doc(db , 'data' , uid)
  
  try {
    await deleteDoc(workDoc)
  } catch (error) {
    
  }
}