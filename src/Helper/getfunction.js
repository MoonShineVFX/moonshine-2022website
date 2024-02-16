// firebase 資料庫連線
import db from '../firebaseConfig/firebase'
import {collection, query,  getDocs,getDoc,setDoc,orderBy,where,limit,limitToLast,startAfter,endBefore,addDoc,deleteDoc,doc,updateDoc} from "firebase/firestore"
import { getStorage, ref, getDownloadURL,  } from "firebase/storage";
import { async } from '@firebase/util';
const storage = getStorage();


/**
 * 取5筆資料
 * **/
export const getNewestWorks = async (callback) =>{
  const q = query(collection(db, "data"),orderBy('time_added' , 'desc'), where("display", "==", '1'),limit(5))
  const data = await getDocs(q);
  mapDataWithImage('data',data.docs.map(doc=> doc.data()),function(res){
    callback(res)
  })
}

/**
 * 到 firebase 撈作品資料表 全部
 * 資料先傳到 mapDataWithImage 處理過圖片路徑再回傳 setWorkData 給網頁用 
 * 條件 display 1 設定顯示的
 * **/ 
export const getWorks = async (callback)=>{
  const q = query(collection(db, "data"),orderBy('time_added' , 'desc'), where("display", "==", '1'))
  const data = await getDocs(q);
  mapDataWithImage('data',data.docs.map(doc=> doc.data()),function(res){
    callback(res)
  })
}
//根據分類id取資料
export const getWorksByCategoryCid = async (cid,callback)=>{
  const q = query(collection(db, "data"), 
    where("category", "==", cid),
    orderBy('time_added' , 'desc'), 
    where("display", "==", '1'))
    ;
  const data = await getDocs(q);

  mapDataWithImage('data',data.docs.map(doc=> doc.data()),function(res){
    callback(res)
  })
}

//由id取得單筆作品
export const getWorkByidForArticle = async (id,callback)=>{
  const q = query(collection(db, "data"),where("id", "==", id))
  const data = await getDocs(q);
  console.log(data)
  // mapDataWithImage('data',data.docs.map(doc=> doc.data()),function(res){
  //   callback(res)
  // })
  data.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    const docData = doc.data()
    callback(doc.data())
    // const imgsArray = docData.article.article_images
    // console.log(doc.id, " => ", doc.data());
  });
}
//根據分類id取資料
export const getWorksBySubCategoryCid = async (scid,callback)=>{
  const q = query(collection(db, "data"), 
    where("sub_category", "==", scid),
    orderBy('time_added' , 'desc'), 
    where("display", "==", '1'))
    ;
  const data = await getDocs(q);

  mapDataWithImage('data',data.docs.map(doc=> doc.data()),function(res){
    callback(res)
  })
}


// 處理作品的圖片路徑
const mapDataWithImage =async (folder,data , callback)=>{
  let dataSorted = data.sort(function(a, b) {
    return b.sort_num - a.sort_num;
  });
  const twoarr= dataSorted.map( async (element) => {
    const imagesRef = ref(storage, `${folder}/${element.img}`);
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
const mapDataWithUid = async (data, callback)=>{
  let dataSorted = data.sort(function(a, b) {
    return b.sort_num - a.sort_num;
  });
  let latestSortNum = (parseInt(dataSorted[0].sort_num)+1).toString()
  const twoarr= dataSorted.map( async (element) => {

    return {...element , latestSortNum :latestSortNum}
   
  })
  callback(await Promise.all(twoarr))
}


/**
 * 到 firebase 撈分類資料表
 * 不用處理圖片路徑的 直接 set
 * **/ 
 export const getCategory = async (callback)=>{
  const q = query(collection(db, "category"), where("display", "==", '1'))
  const data = await getDocs(q);
  // mapCategoryData(data.docs.map(doc=> doc.data()))
  // callback(data.docs.map(doc=> doc.data()))
  mapDataWithImage('data',data.docs.map(doc=> doc.data()),function(res){
    callback(res)
  })
}


/**
 * query by catergory id
 * 按分類 分好作品  給ROW用
 * **/
export const queryByCategoryId = async (cid,callback)=>{

  const q = query(collection(db, "data"), where("category", "==", cid),orderBy('time_added' , 'desc'), where("display", "==", '1'),limit(15));
  const data = await getDocs(q);
  // console.log(data.docs.map(doc=> doc.data()))
  mapDataWithImage('data',data.docs.map(doc=> doc.data()),function(res){
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


  mapDataWithImage('data',data.docs.map(doc=> doc.data()),function(res){
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


  mapDataWithImage('data',data.docs.map(doc=> doc.data()),function(res){
    callback(res)
  })
}



/**
 * 到 firebase 撈作品資料表 
 * 資料先傳到 mapDataWithImage 處理過圖片路徑再回傳 setWorkData 給網頁用 
 * 條件 display 全部 要給後台用(admin) 
 * **/ 
export const getAllWorksForDashboard = async (callback)=>{
  const q = query(collection(db, "data"),orderBy('time_added' , 'desc'),limit(10))
  const data = await getDocs(q);

  mapDataWithImage('data',data.docs.map(doc=> ({...doc.data(),uid:doc.id})),function(res){
    callback(res)
  })
}

export const getNextWorkForDashboard = async (item , callback) => {
  const q = query(collection(db, "data"),orderBy('time_added' , 'desc'),startAfter(item.time_added),limit(12))
  const data = await getDocs(q);
  mapDataWithImage('data',data.docs.map(doc=> ({...doc.data(),uid:doc.id})),function(res){
    callback(res)
  })
}

export const getPrevWorkForDashboard = async (item , callback) => {
  const q = query(collection(db, "data"),orderBy('time_added' , 'desc'),endBefore(item.time_added),limitToLast(12))
  const data = await getDocs(q);
  mapDataWithImage('data',data.docs.map(doc=> ({...doc.data(),uid:doc.id})),function(res){
    callback(res)
  })
}
export const getWorksByCategoryForDashboard = async (cid,callback)=>{
  const q = query(collection(db, "data"), 
    where("category", "==", cid),
    orderBy('time_added' , 'desc'))
    ;
  const data = await getDocs(q);

  mapDataWithImage('data',data.docs.map(doc=> ({...doc.data(),uid:doc.id})),function(res){
    callback(res)
  })
}
export const getSearchWork = async (search , callback)=>{
 //TODO
}

export const createWork = async (data , callback)=>{
  const collectionRef = collection(db ,"data")
  try {
    await addDoc(collectionRef,data)
    callback('success')
  } catch (error) {
    callback(error)
  }
}
export const deleteWork = async(uid,callback)=>{
  const workDoc = doc(db , 'data' , uid)
  
  try {
    await deleteDoc(workDoc)
    callback('success')
  } catch (error) {
    callback(error)
  }
}
 export const updateWork = async (uid,currentData,callback)=>{
  const workDoc = doc(db , 'data' , uid)
  const docSnap = await getDoc(workDoc); 
  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    try {
      await updateDoc( workDoc ,currentData)
      callback('success')
    } catch (error) {
      callback(error)
    }
  } else {
    callback("No such document!");
  }

 }
 export const updateWork_articleLayout = async (uid,layoutData,callback)=>{
  const workDoc = doc(db , 'data' , uid)
  const docSnap = await getDoc(workDoc); 
  let object = {
      "sort_num": "699",
      "title": "ASUS ROG CITADEL XV 1.5",
      "img": "1670493713038.jpg",
      "intro": "監製：吳文琪 \n專案經理：臺芸萱\n工程師組長：莊紹睿\n程式設計：陳皇佑、蔡伃晴、陸奕、吳唯廉\n程式企劃：黃國益\n導演：姚江\n美術總監：張天鴻\n視覺設計：李文愷、陳韋誠、何荔芳、周靖\n概念設計：李柏權、鍾語桐、陳冠儒、林于庭、王建盛\n遊戲引擎美術：賴威辰、林于琇、舒寶萱、陳薈芸\n技術美術：林栩安\n動畫設計：林奇鋒、林廷穎、朱家靚、鄭力源、周敏雯、王鈞威、李紫晴、林佳盈、林宛儀、王建傑、郭柔均、杜綉靖、任永耀、李亞憲、李哲誠、高志豪、張斌祺、鄭為澤、許博翔、童浩毓、林木清、鍾孟穎、石均宇、安良啟、董怡汝、郭柏延、許閎硯、楊靖淳、林致遠、張惠珺、駱信宏、陳俊良、林昱燊、陳麗月、呂宜靜 ",
      "article": true,
      "video_url": "https://vimeo.com/779184103",
      "year_of_work": "2022",
      "category": "l42c134v",
      "sub_category": "沒有子分類",
      "display": "1",
      "article_text": "ASUS ROG Citadel XV 1.5 continues the online virtual immersion experience introduced in the first chapter. In the lastest iteration, MOONSHINE has further updated and expanded the scope of the experience by incorporating \"game-like\" interactions. In the game, players will travel through the expansive underground fortress from a first-person perspective and test their aiming and reaction abilities by shooting down planes in space. In addition, there are a large number of realistic cutscenes hidden in each virtual space, allowing players to embark on a thrilling adventure in the ROG world.",
      "article_images": [
          "article02_p01.png",
          "article02_p02.png",
          "article02_p03.png",
          "article02_p04.png",
          "article02_p05.png"
      ],
      "id": "lbewprl8",
      "time_added": "2022-12-08 17:58:48"
  }
    if(docSnap.exists()){
      await updateDoc(workDoc, {
        artlcle_layout: layoutData
      }).then(() => {
        console.log("Document successfully updated with added layoutData.");
        callback('success')
      }).catch((error) => {
        console.error("Error updating document: ", error);
        if(callback) callback(false, error);
      });


    }else{
      console.log("No such document!create it");

    }

 }


 //admin category
 export const getAllCategoryForDashboard = async (callback)=>{
  const q = query(collection(db, "category"),orderBy('sort_num' , 'desc'))
  const data = await getDocs(q);
  // mapDataWithUid(data.docs.map(doc=> ({...doc.data(),uid:doc.id})),function(res){
  //   callback(res)
  // })
  mapDataWithImage('img_category',data.docs.map(doc=> ({...doc.data(),uid:doc.id})),function(res){
    callback(res)
  })
}

export const createCategory = async (data , callback)=>{
  const collectionRef = collection(db ,"category")
  try {
    await addDoc(collectionRef,data)
    callback('success')
  } catch (error) {
    callback(error)
  }
}
export const deleteCategory = async(uid,callback)=>{
  const categoryDoc = doc(db , 'category' , uid)
  
  try {
    await deleteDoc(categoryDoc)
    callback('success')
  } catch (error) {
    callback(error)
  }
}
export const updateCategory = async (uid,currentData,callback)=>{
const categoryDoc = doc(db , 'category' , uid)
  
  try {
    await updateDoc( categoryDoc ,currentData)
    callback('success')
  } catch (error) {
    callback(error)
  }
}

// admin Award
export const getAwardForDashboard = async (callback) => {
  const q = query(collection(db, "awards"))
  const data = await getDocs(q);
  mapDataWithImage('img_award',data.docs.map(doc=> ({...doc.data(),uid:doc.id})),function(res){
    callback(res)
  })
}

export const createAward = async (data , callback)=>{
  const collectionRef = collection(db ,"awards")
  try {
    await addDoc(collectionRef,data)
    callback('success')
  } catch (error) {
    callback(error)
  }
}
export const deleteAward = async(uid,callback)=>{
  const awardDoc = doc(db , 'awards' , uid)
  try {
    await deleteDoc(awardDoc)
    callback('success')
  } catch (error) {
    callback(error)
  }
}
export const updateAward = async (uid,currentData,callback)=>{
  const awardDoc = doc(db , 'awards' , uid)
  try {
    await updateDoc( awardDoc ,currentData)
    callback('success')
  } catch (error) {
    callback(error)
  }
}

//admin service
export const getServiceForDashboard = async (callback) => {
  const q = query(collection(db, "service"))
  const data = await getDocs(q);
  mapDataWithImage('img_service',data.docs.map(doc=> ({...doc.data(),uid:doc.id})),function(res){
    callback(res)
  })
}

export const createService = async (data , callback)=>{
  const collectionRef = collection(db ,"service")
  try {
    await addDoc(collectionRef,data)
    callback('success')
  } catch (error) {
    callback(error)
  }
}
export const deleteService = async(uid,callback)=>{
  const serviceDoc = doc(db , 'service' , uid)
  try {
    await deleteDoc(serviceDoc)
    callback('success')
  } catch (error) {
    callback(error)
  }
}
export const updateService = async (uid,currentData,callback)=>{
  const serviceDoc = doc(db , 'service' , uid)
  try {
    await updateDoc( serviceDoc ,currentData)
    callback('success')
  } catch (error) {
    callback(error)
  }
}