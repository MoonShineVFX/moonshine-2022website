import React from 'react'
import { useRecoilState, useRecoilValue } from 'recoil';
import { formDisplayState, workState,formStatusState } from '../atoms/fromTypes'
import { useForm } from 'react-hook-form';
function EditForm({categoryData}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
  const [showModal, setShowModal] = useRecoilState(formDisplayState);
  const work = useRecoilValue(workState);
  const formStatus = useRecoilValue(formStatusState);
  const handleClose = () => {
    setShowModal(false);
  };
  return (
    <div className={'w-full h-screen  absolute top-0 left-0 z-20'}>
      <div className=' opacity-30 absolute inset-0 bg-black ' onClick={handleClose}></div>
      <div className=' relative w-3/5 bg-white mx-auto my-20 p-5'>
        <div className='text-xl text-center font-bold'>{formStatus === 'ADD' ? '新增作品' : '編輯作品'}</div>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
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
          
          <div>
            <input type="submit" className=' py-2 px-4 bg-black text-white  rounded-md  ' />
            <div className='text-xs inline-block ml-3' >縮圖請建立作品後再上傳</div>
          </div>
        
        </form>
      </div>
    </div>
  )
}

export default EditForm