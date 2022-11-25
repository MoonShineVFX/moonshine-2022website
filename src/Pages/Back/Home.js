import React, { useState, useEffect } from 'react'
import { useRecoilState } from 'recoil';
import { formDisplayState,formStatusState,workState } from './atoms/fromTypes';

//components
import EditForm from './Components/EditForm';

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

//helper
import {getAllWorksForDashboard ,getCategory, getNextWorkForDashboard,getPrevWorkForDashboard,createWork,deleteWork,updateWork} from '../../Helper/getfunction'
import {LoadingAnim} from '../../Helper/HtmlComponents'
//檔案上傳方法
import { useStorage } from "../../Helper/useStorage";

function Home() {
  const [workData, setWorkData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);

  const [showModal, setShowModal] = useRecoilState(formDisplayState);
  const [formStatus, setFormStatus] = useRecoilState(formStatusState);
  const [singleWork, setSingleWork] = useRecoilState(workState);

  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const types = ["image/png", "image/jpeg", "image/jpg","image/avif"];
  // 若setFile有資料會執行檔案上傳
  const { progress, url } = useStorage(file);

  const handleNext = ()=>{
    console.log('next')
    getNextWorkForDashboard(workData[workData.length-1] , function(res){
      console.log(res)
      setWorkData(res)
    })
  }
  const handlePrev=()=>{
    console.log('prev')
    getPrevWorkForDashboard(workData[workData.length-1] , function(res){
      console.log(res)
      setWorkData(res)
    })
  }
  const fetchWorkDoneFun = (customStr, res)=>{
    setShowModal(false)
    if(res === 'success'){
      getAllWorksForDashboard((res)=>{
        setWorkData(res)
      })
    }else{
      showErrorAlert(customStr,res)
    }
  }
  const showErrorAlert = (str,res) =>{
    confirmAlert({
      title: str+ res,
      buttons: [
        {
          label: '確定',
        },
        {
          label: '取消',
        }
      ]
    });
  }
  const handleCreateWork = (data) =>{
    let currentData ={
      "id": Date.now().toString(36),
      "time_added": new Date(+new Date() + 8 * 3600 * 1000).toISOString().replace(/T/, ' ').replace(/\..+/, '')  ,
      "title": data.title,
      "intro": data.intro,
      "video_url": data.video_url,
      "sort_num": data.sort_num ? data.sort_num : '666',
      "display":data.display ,
      "year_of_work":data.yearofwork ? data.yearofwork : '2022',
      "category":data.category ? data.category : '1',
      "sub_category":data.sub_category ? data.sub_category : '1'
    }
    createWork(currentData,function(res){
      console.log(res)
      fetchWorkDoneFun('新增資料失敗，錯誤訊息:',res)
    })
  }

  const handleEditWork = (uid,data) =>{
    let selectedFile = data.file[0];
    // 設定圖檔重新命名
    const imgFileName = Date.now()+'.jpg'
    let currentDataWithoutImg ={
      "title": data.title,
      "intro": data.intro,
      "video_url": data.video_url,
      "sort_num": data.sort_num ,
      "display":data.display,
      "year_of_work":data.year_of_work ,
      "category":data.category ,
      "sub_category":data.sub_category 
    }
    // 如果有圖檔存在 執行新增資料 否則不執行
    if (selectedFile) {
      if (types.includes(selectedFile.type)) {
          setError(null);
          setFile({
            "filename":imgFileName,
            "file":selectedFile,
            "folder":'data/',
            "maxWidth":640 ,
            "maxHeight":360,
            "compressFormat":"WEBP",
            "quality":100
          });
      } else {
          setFile(null);
          setError("Please select an image file (png or jpg)");
      }
      updateWork(uid,{...currentDataWithoutImg , "img": imgFileName },function(res){
        console.log(res)
        fetchWorkDoneFun('編輯資料失敗，錯誤訊息:',res)

      })
    } else{
      updateWork(uid,currentDataWithoutImg,function(res){
        console.log(res)
        fetchWorkDoneFun('編輯資料失敗，錯誤訊息:',res)
      })
    }

  }
  const onDelete = (uid)=>{
    confirmAlert({
      title: '確認刪除這筆資料',
      buttons: [
        {
          label: '確定',
          onClick: () =>  deleteWork(uid,function(res){
            fetchWorkDoneFun('刪除資料失敗，錯誤訊息:',res)
          })
        },
        {
          label: '取消',
        }
      ]
    });
   
  }
  useEffect(()=>{
    getAllWorksForDashboard((res)=>{
      setWorkData(res)
    })
    getCategory((res)=>{
      setCategoryData(res)
    })

  },[])

  return (
    <section className='w-full bg-white p-5 text-black relative'>
      <div className='w-full border-b mb-10'>
        <h1>管理作品</h1>
      </div>
      
      <button 
        className='text-xs  rounded-md bg-black text-white py-2 px-6 hover:bg-slate-600'
        onClick={() => {
          setShowModal(true);
          setFormStatus('ADD')
        }}
      >新增 </button>
      <div id="table" className='w-full mt-5' >
        <table className="table-auto   border border-slate-200 w-full rounded-md ">
          <thead>
            <tr>
              <th className='bg-zinc-100 border-b border-zinc-300 text-left'>作品ID</th>
              <th className='bg-zinc-100 border-b border-zinc-300 text-left'>排序</th>
              <th className='bg-zinc-100 border-b border-zinc-300 text-left'>作品名稱</th>
              <th className='bg-zinc-100 border-b border-zinc-300 text-left'>分類-子分類</th>
              <th className='bg-zinc-100 border-b border-zinc-300 text-left'>狀態</th>
              <th className='bg-zinc-100 border-b border-zinc-300 text-left'>上傳日期</th>
              <th className='bg-zinc-100 border-b border-zinc-300 text-left'>編輯</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-slate-200'>
            {
              workData ?
              workData.map((item,index)=>{
                const {uid,id, display, title, time_added,category,sort_num,sub_category} =item
                return(
                  <tr className=' hover:bg-zinc-200' key={id+title}>
                    <td className='p-2 text-xs'>{id}</td>
                    <td className='p-2 text-xs'>{sort_num}</td>
                    <td className='p-2 text-xs'>{title}</td>
                    <td className='p-2 text-xs'>
                      {categoryData.map((item) => {
                        if(item.id === category)
                          return <div key={item.id}>{item.name}</div>
                      })}
                      {sub_category && sub_category}
                    </td>
                    <td className='p-2 text-xs'>{display === '1' ? '顯示' : '不顯示'}</td>
                    <td className='p-2 text-xs'>{time_added.toLocaleString()}</td>
                    <td className='p-2 text-xs'>
                      <button 
                      className='text-xs  rounded-md bg-black text-white py-2 px-6 hover:bg-slate-600 '
                      onClick={() => {
                        setShowModal(true);
                        setSingleWork(item)
                        setFormStatus('EDIT')
                      }}>編輯</button>
                      <button 
                      className='text-xs  rounded-md bg-black text-white py-2 px-6 hover:bg-slate-600 '
                      onClick={()=> {onDelete(uid)}}>刪除</button>

                    </td>
                  </tr>
                )
              }): <LoadingAnim />
            }

          
          </tbody>
        </table>
      </div>
      <div className='mt-3 flex gap-2'>
        <button className='text-xs  rounded-md bg-black text-white py-2 px-6 hover:bg-slate-600' onClick={handlePrev}>Prev</button>
        <button className='text-xs  rounded-md bg-black text-white py-2 px-6 hover:bg-slate-600' onClick={handleNext}>Next</button>
      </div>


      {showModal && <EditForm categoryData={categoryData} handleCreateWork={handleCreateWork} handleEditWork={handleEditWork} />}
    </section>
    

  )
}

export default Home