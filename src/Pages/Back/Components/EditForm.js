import React, { useEffect } from 'react'
import { constSelector, useRecoilState, useRecoilValue } from 'recoil';
import { formDisplayState, workState,formStatusState } from '../atoms/fromTypes'
import { useForm } from 'react-hook-form';
function EditForm({categoryData,handleCreateWork}) {
  const {register, handleSubmit, reset, formState: { errors }} = useForm(
    {defaultValues: { title: "", intro: "",sort_num:"",youtube_id:"" ,year_of_work:"",video_url:""}});
  const onSubmit = (data) => {
    console.log(data)
    if(data.method === 'ADD'){
      console.log('ADDDD')
    } else if (data.method === 'EDIT'){
      console.log('EDITTT')
    }
  };
  const [showModal, setShowModal] = useRecoilState(formDisplayState);
  const work = useRecoilValue(workState);
  const formStatus = useRecoilValue(formStatusState);
  const handleClose = () => {
    setShowModal(false);
  };
  useEffect(()=>{
    formStatus === 'EDIT' ? reset(work && work) : reset()
  },[])
  return (
    <div className={'w-full h-screen  absolute top-0 left-0 z-20 overflow-hidden'}>
      <div className=' opacity-30 absolute inset-0 bg-black ' onClick={handleClose}></div>
      <div className=' relative w-4/5 bg-white mx-auto my-20 p-5 overflow-auto'>
        <div className='text-xl text-center font-bold'>{formStatus === 'ADD' ? '新增作品' : '編輯作品'}</div>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className='flex gap-4'>
            <div className='main w-1/2'>
              <div className="mb-3">
                <label htmlFor="exampleURL0" className="form-label inline-block mb-2 text-gray-700">作品名稱</label>
                <input
                  type="text"
                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none "
                  id="exampleURL0"
                  placeholder="作品名稱"
                  {...register('title')}
                />
              </div>
              <div className="relative mb-3">
                <label htmlFor="exampleURL0" className="form-label inline-block mb-2 text-gray-700">作品分類</label>
                <select className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none " id="category" {...register("category")}>
                  {categoryData.map((item,index)=>{
                    return(
                      <option key={item.id} value={item.id}>{item.name} - {item.name_cht}</option>
                    )
                  })}
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="exampleURL0" className="form-label inline-block mb-2 text-gray-700">作品介紹</label>
                <textarea
                  rows="6"
                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none "
                  placeholder="作品介紹"
                  {...register('intro')}
                ></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="exampleURL0" className="form-label inline-block mb-2 text-gray-700">作品排序(輸入1-999)</label>
                <input
                  type="text"
                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none "
                  placeholder="排序"
                  {...register('sort_num')}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleURL0" className="form-label inline-block mb-2 text-gray-700">影片位置(youtube or vimeo 網址)</label>
                <input
                  type="text"
                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none "
                  placeholder="影片位置"
                  {...register('video_url')}
                />
              </div>
            </div>
            <div className='left w-1/2'>
              {
                formStatus === 'EDIT' && 
                <div className="mb-3">
                  <label htmlFor="exampleURL0" className="form-label inline-block mb-2 text-gray-700">縮圖</label>
                  <input type="file" className="form-control" id="file"  {...register('file')} />
                  <img src={work ? work.imgpath :　"1"} className="img-fluid" />
                
                </div>
              }
            </div>
          </div>
          
         
          
          <div>
            {
              formStatus === 'EDIT' ? 
              <button type="submit" className="py-2 px-4 bg-black text-white  rounded-md" >
                儲存編輯<input type="hidden" value="EDIT"  {...register('method')}/></button>
              :
              <button type="submit" className="py-2 px-4 bg-black text-white  rounded-md" >
                新增作品<input type="hidden" value="ADD"  {...register('method')}/></button>
            }
            <div className='text-xs inline-block ml-3' >縮圖請建立作品後再上傳</div>
          </div>
        
        </form>
      </div>
    </div>
  )
}

export default EditForm