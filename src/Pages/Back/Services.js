import React, { useState, useEffect } from 'react'
import { useRecoilState } from 'recoil';
import { formDisplayState,formStatusState,adminServiceState } from './atoms/fromTypes';

//components
import ServiceForm from './Components/ServiceForm';

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
//helper
import {getServiceForDashboard} from '../../Helper/getfunction'
import {LoadingAnim} from '../../Helper/HtmlComponents'

function Services() {
  const [serviceData, setServiceData] = useState([]);

  const [showModal, setShowModal] = useRecoilState(formDisplayState);
  const [formStatus, setFormStatus] = useRecoilState(formStatusState);
  const [singleData, setSingleData] = useRecoilState(adminServiceState);

  const onDelete = (uid)=>{
    confirmAlert({
      title: '確認刪除這筆資料',
      buttons: [
        {
          label: '確定',
          // onClick: () =>  deleteCategory(uid,function(res){
          //   fetchCategoryDoneFun('刪除資料失敗，錯誤訊息:',res)
          // })
        },
        {
          label: '取消',
        }
      ]
    });
   
  }
  const handleCreate = (data) =>{

  }
  const handleEdit = (data) =>{
    console.log(data)
    
  }
  useEffect(()=>{
    getServiceForDashboard((res)=>{
      setServiceData(res)
    })


  },[])
  console.log(serviceData)


  return (
    <section className='w-full bg-white p-5 text-black relative'>
      <div className='w-full border-b mb-10'>
        <h1>管理服務項目</h1>
      </div>
      <button 
          className='text-xs  rounded-md bg-black text-white py-2 px-6 hover:bg-slate-600'
          onClick={() => {
            setShowModal(true);
            setFormStatus('ADD')
          }}

        >新增服務項目 </button>
      <div id="table" className='w-full mt-5' >
        <table className="table-auto   border border-slate-200 w-full rounded-md ">
          <thead>
            <tr>
              <th className='bg-zinc-100 border-b border-zinc-300 text-left'>分類ID</th>
              <th className='bg-zinc-100 border-b border-zinc-300 text-left'>排序</th>
              <th className='bg-zinc-100 border-b border-zinc-300 text-left'>名稱(英 - 中)</th>
              <th className='bg-zinc-100 border-b border-zinc-300 text-left'>形式</th>
              <th className='bg-zinc-100 border-b border-zinc-300 text-left'>顯示</th>
              <th className='bg-zinc-100 border-b border-zinc-300 text-left'>編輯</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-slate-200'>
            {
              serviceData ?
              serviceData.map((item,index)=>{
                const {uid,id, title, intro,sort_num,params_name,types,imgpath,children,display} =item
                return(
                  <tr className=' hover:bg-zinc-200' key={id+title}>
                    <td className='p-2 text-xs'>{id}</td>
                    <td className='p-2 text-xs'>{sort_num}</td>
                    <td className='p-2 text-xs'>{title}</td>
                    <td className='p-2 text-xs'>{types === 'article' ? '站內介紹' : '導出外部連結˙'}</td>
                    <td className='p-2 text-xs'>{display === '1' ? '顯示' : '不顯示'}</td>

   
                    <td className='p-2 text-xs'>
                      <button 
                      className='text-xs  rounded-md bg-black text-white py-2 px-6 hover:bg-slate-600 '
                      onClick={() => {
                        setShowModal(true);
                        setSingleData(item)
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

      {showModal && <ServiceForm  handleCreate={handleCreate} handleEdit={handleEdit} />}
    </section>
  )
}

export default Services