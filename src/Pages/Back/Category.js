import React, { useState, useEffect } from 'react'
import { useRecoilState } from 'recoil';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
//helper
import {getAllCategoryForDashboard} from '../../Helper/getfunction'
import {LoadingAnim} from '../../Helper/HtmlComponents'


function Category() {
  const [categoryData, setCategoryData] = useState([]);

  const onDelete = (uid)=>{
    confirmAlert({
      title: '確認刪除這筆資料',
      buttons: [
        {
          label: '確定',
          // onClick: () =>  deleteWork(uid,function(res){console.log(res)})
        },
        {
          label: '取消',
        }
      ]
    });
   
  }
  useEffect(()=>{
    getAllCategoryForDashboard((res)=>{
      setCategoryData(res)
    })


  },[])
  return (
    <section className='w-full bg-white p-5 text-black relative'>
      <div className='w-full border-b mb-10'>
        <h1>管理分類</h1>
      </div>
      <button 
          className='text-xs  rounded-md bg-black text-white py-2 px-6 hover:bg-slate-600'

        >新增分類 </button>
        //TODO 這邊加表格新增分類
      <div id="table" className='w-full mt-5' >
        <table className="table-auto   border border-slate-200 w-full rounded-md ">
          <thead>
            <tr>
              <th className='bg-zinc-100 border-b border-zinc-300 text-left'>分類ID</th>
              <th className='bg-zinc-100 border-b border-zinc-300 text-left'>排序</th>
              <th className='bg-zinc-100 border-b border-zinc-300 text-left'>分類名稱</th>
              <th className='bg-zinc-100 border-b border-zinc-300 text-left'>編輯</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-slate-200'>
            {
              categoryData ?
              categoryData.map((item,index)=>{
                const {uid,id, name, name_cht,sort_num} =item
                return(
                  <tr className=' hover:bg-zinc-200' key={id+name}>
                    <td className='p-2 text-xs'>{id}</td>
                    <td className='p-2 text-xs'>{sort_num}</td>
                    <td className='p-2 text-xs'>{name} - {name_cht}</td>

   
                    <td className='p-2 text-xs'>
                      <button 
                      className='text-xs  rounded-md bg-black text-white py-2 px-6 hover:bg-slate-600 '
                      onClick={() => {
                        // setShowModal(true);
                        // setSingleWork(item)
                        // setFormStatus('EDIT')
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
    </section>
  )
}

export default Category