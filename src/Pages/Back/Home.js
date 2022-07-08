import React, { useState, useEffect } from 'react'
import { useRecoilState } from 'recoil';
import { formDisplayState,formStatusState,workState } from './atoms/fromTypes';
import EditForm from './Components/EditForm';

//helper
import {getAllWorksForDashboard ,getCategory, getNextWorkForDashboard,getPrevWorkForDashboard,createWork} from '../../Helper/getfunction'
import {LoadingAnim} from '../../Helper/HtmlComponents'

function Home() {
  const [workData, setWorkData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);

  const [showModal, setShowModal] = useRecoilState(formDisplayState);
  const [formStatus, setFormStatus] = useRecoilState(formStatusState);
  const [singleWork, setSingleWork] = useRecoilState(workState);

  const handleNext = ()=>{
    console.log('next')
    getNextWorkForDashboard(workData[0] , function(res){
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
  const handleCreateWork = (data) => {
    createWork(data,function(res){
      console.log(res)
    })
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
              <th className='bg-zinc-100 border-b border-zinc-300 text-left'>作品名稱</th>
              <th className='bg-zinc-100 border-b border-zinc-300 text-left'>分類</th>
              <th className='bg-zinc-100 border-b border-zinc-300 text-left'>狀態</th>
              <th className='bg-zinc-100 border-b border-zinc-300 text-left'>上傳日期</th>
              <th className='bg-zinc-100 border-b border-zinc-300 text-left'>編輯</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-slate-200'>
            {
              workData ?
              workData.map((item,index)=>{
                const {id, display, title, time_added,category} =item
                return(
                  <tr className=' hover:bg-zinc-200' key={id+title}>
                    <td className='p-2 text-xs'>{id}</td>
                    <td className='p-2 text-xs'>{title}</td>
                    <td className='p-2 text-xs'>
                      {categoryData.map((item) => {
                        if(item.id === category)
                          return <div key={item.id}>{item.name}</div>
                      })}
                    </td>
                    <td className='p-2 text-xs'>{display ? '顯示' : '不顯示'}</td>
                    <td className='p-2 text-xs'>{time_added.toLocaleString()}</td>
                    <td className='p-2 text-xs'>
                    <button 
                      className='text-xs  rounded-md bg-black text-white py-2 px-6 hover:bg-slate-600 '
                      onClick={() => {
                        setShowModal(true);
                        setSingleWork(item)
                        setFormStatus('EDIT')
                      }}>編輯</button>
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


      {showModal && <EditForm categoryData={categoryData} handleCreateWork={handleCreateWork} />}
    </section>
    

  )
}

export default Home