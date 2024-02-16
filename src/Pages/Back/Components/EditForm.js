import React, { useEffect,useState } from 'react'
import { constSelector, useRecoilState, useRecoilValue } from 'recoil';
import { formDisplayState, workState,formStatusState,workpagerDisplayState } from '../atoms/fromTypes'
import { useForm } from 'react-hook-form';
import { FaPager } from "react-icons/fa";

function EditForm({categoryData,handleCreateWork , handleEditWork}) {
  const {register, handleSubmit, reset, formState: { errors }} = useForm(
    {defaultValues: { title: "", intro: "",sort_num:"",youtube_id:"" ,year_of_work:"",video_url:"",vimeo_id:"", youtube_id:"",article:false}});
 
  const onSubmit = (data) => {
    console.log(data)
    if(data.method === 'ADD'){
      handleCreateWork(data)
      
    } else if (data.method === 'EDIT'){
      console.log('EDITTT')
      handleEditWork(work.uid,data)
    }
    
  };
  const [showModal, setShowModal] = useRecoilState(formDisplayState);
  const [showWorkpager, setShowWorkpager] = useRecoilState(workpagerDisplayState);
  const work = useRecoilValue(workState);
  const formStatus = useRecoilValue(formStatusState);
  const [currentCategory, setCurrentCategory] = useState()
  console.log(work)
  const handleClose = () => {
    setShowModal(false);
  };
  const handleChange = (e)=>{
    console.log(e.target.value)
    filterCurrentCategory(e.target.value)
  }
  const filterCurrentCategory = (cid) =>{
    const filteredCategory =  categoryData.filter((value)=> {
      return value.id === cid
    })
    setCurrentCategory(filteredCategory[0])
  }
  useEffect(()=>{ 
    formStatus === 'EDIT' ? reset(work && work) : reset()
    if(work){
      filterCurrentCategory(work.category)
    }
    
  },[])
  return (
    <div className={'w-full h-screen fixed top-0 left-0 z-20'}>
      <div className=' opacity-30 absolute inset-0 bg-black z-0 ' onClick={handleClose}></div>
      <div className=' h-[90%] w-11/12 relative mx-auto  my-5 p-5  bg-white rounded-lg  '>
        <div className=' relative  z-10 h-full overflow-auto px-5 '>
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
                  <label htmlFor="exampleURL0" className="form-label inline-block mb-2 text-gray-700">分類</label>
                  <select className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none " id="category" {...register("category")}
                  onChange={(e)=>(handleChange(e))}
                  >
                    {categoryData.map((item,index)=>{
                      return(
                        <option key={item.id} value={item.id}>{item.name} - {item.name_cht}</option>
                      )
                    })}
                  </select>
                </div>
                {currentCategory ?
                  <div className="relative mb-3">
                    <label htmlFor="exampleURL0" className="form-label inline-block mb-2 text-gray-700">子分類</label>
                    <select className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none " id="category" {...register("sub_category")}
                    
                    
                    >
                      {currentCategory.sub_category ? currentCategory.sub_category.map((item,index)=>{
                        return(
                          <option key={item.id} value={item.id}>{item.title} </option>
                        )
                      }) : <option>沒有子分類</option>}
                    </select>
                  </div> : <div>0</div>
                }

                <div className='flex gap-3'>
                  <div className="mb-3">
                    <label htmlFor="exampleURL0" className="form-label inline-block mb-2 text-gray-700">作品年分</label>
                    <input
                      type="text"
                      className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none "
                      id="exampleURL0"
                      placeholder="作品年分"
                      {...register('year_of_work')}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="exampleURL0" className="form-label inline-block mb-2 text-gray-700">排序(1-999)</label>
                    <input
                      type="text"
                      className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none "
                      placeholder="排序"
                      {...register('sort_num')}
                    />
                  </div>
                </div>

                

                <div className="mb-3">
                  <label htmlFor="exampleURL0" className="form-label inline-block mb-2 text-gray-700">影片位置(直接貼上youtube or vimeo 網址)</label>
                  <input
                    type="text"
                    className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none "
                    placeholder="影片位置"
                    {...register('video_url')}
                  />
                </div>
                {formStatus === 'EDIT' && 
                  work.vimeo_id &&
                    <div className="mb-3">
                      <label htmlFor="exampleURL0" className="form-label inline-block mb-2 text-gray-700">這是原本的vimeo(新版網頁請直接更新貼在上欄) </label>
                      <div>{formStatus === 'EDIT' && work.vimeo_id && <span>https://vimeo.com/{work.vimeo_id}</span> }</div>
                    </div>
                }
                {formStatus === 'EDIT' && 
                  work.youtube_id &&
                    <div className="mb-3">
                      <label htmlFor="exampleURL0" className="form-label inline-block mb-2 text-gray-700">
                        這是原本的youtube (新版網頁請直接更新貼在上欄) 
                        </label>
                        <div>{formStatus === 'EDIT' && work.youtube_id && <span>https://www.youtube.com/watch?v={work.youtube_id}</span> }</div>      
                    </div>
                
                }

                <div className="mb-3">
                  <label htmlFor="exampleURL0" className="form-label inline-block mb-2 text-gray-700">
                    前台顯示 
                    </label>
                  
                    <div className="flex items-center mb-4">
                        <input  id="default-radio-1" type="radio" value="1" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" {...register("display")}/>
                        <label htmlFor="default-radio-1" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">顯示作品</label>
                    </div>
                    <div className="flex items-center">
                        <input  id="default-radio-2" type="radio" value="0" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"  {...register("display")}/>
                        <label htmlFor="default-radio-2" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">不顯示此作品</label>
                    </div>
                </div>

                
              </div>
              <div className='left w-1/2'>
                <div className="mb-3">
                  <label htmlFor="exampleURL0" className="form-label inline-block mb-2 text-gray-700">Credit</label>
                  <textarea
                    rows="6"
                    className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none "
                    placeholder="Credit"
                    {...register('intro')}
                  ></textarea>
                </div>
                {
                  formStatus === 'EDIT' && 
                    <div className="mb-3 flex items-center gap-3">
                      <input
                        name="isArticle"
                        type="checkbox"
                        {...register('article')}
                        className=""
                      />
                      <div>
                        <div>互動作品介紹頁面</div>
                        <div className='text-xs text-black/50'>勾選後網頁才會顯示另外編排的內容</div>
                      </div>

                      <div 
                        className='flex items-center gap-1 text-blue-500 border-b border-dashed hover:text-blue-700 cursor-pointer '
                        onClick={()=>setShowWorkpager(true)}
                        >編輯排版 <FaPager /> </div>

                    </div>
                }
                
                {
                  formStatus === 'EDIT' && 
                  <div className="mb-3 ">
                    <div className='mb-3'>
                      <h1 className='mb-2'>設定作品縮圖</h1>

                      <input type="file" className="custom form-control border p-2" id="file" name="photo" {...register('file')} />
                    </div>

                    <img src={work ? work.imgpath :　"1"} className="img-fluid"  alt={work && work.imgpath} />
                  
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
              <div className='text-xs inline-block ml-3' >
                建立作品後，再上傳縮圖與編排內容頁。
              </div>
            </div>
          
          </form>
        </div>
      </div>

    </div>
  )
}

export default EditForm