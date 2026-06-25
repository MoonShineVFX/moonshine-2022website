import React, { useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil';
import { formDisplayState, formStatusState, adminCategoryState } from '../atoms/fromTypes'
import { useForm } from 'react-hook-form';

function CategoryForm({ handleCreateCategory, handleEditCategory }) {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      name: "",
      name_cht: "",
      slug: "",
      sort_num: "",
      cover_video: "",
      video_url: "",
      display: "1",
    }
  });

  const onSubmit = (data) => {
    if (data.method === 'ADD') {
      handleCreateCategory(data)
    } else if (data.method === 'EDIT') {
      handleEditCategory(category.uid, data)
    }
  };

  const [, setShowModal] = useRecoilState(formDisplayState);
  const category = useRecoilValue(adminCategoryState);
  const formStatus = useRecoilValue(formStatusState);

  const handleClose = () => {
    setShowModal(false);
  };

  useEffect(() => {
    if (formStatus === 'EDIT' && category) {
      reset({
        name: category.name || "",
        name_cht: category.name_cht || "",
        slug: category.slug || "",
        sort_num: category.sort_num || "",
        cover_video: category.cover_video || "",
        video_url: category.video_url || "",
        display: category.display || "1",
      })
    } else {
      reset({
        name: "",
        name_cht: "",
        slug: "",
        sort_num: "",
        cover_video: "",
        video_url: "",
        display: "1",
      })
    }
  }, [formStatus, category, reset])

  return (
    <div className={'w-full h-screen absolute top-0 left-0 z-20 overflow-hidden'}>
      <div className='opacity-30 absolute inset-0 bg-black' onClick={handleClose}></div>
      <div className='relative w-4/5 bg-white mx-auto my-10 p-5 overflow-auto max-h-[90vh]'>
        <div className='text-xl text-center font-bold'>
          {formStatus === 'ADD' ? '新增分類' : '編輯分類'}
        </div>
        <p className='text-sm text-zinc-500 text-center mt-2 mb-4'>
          管理首頁四格直式影片，以及點進分類頁後的橫式 Header 影片
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className='flex gap-4'>
            <div className='main w-1/2'>
              <div className="mb-3">
                <label className="form-label inline-block mb-2 text-gray-700">分類英文名稱</label>
                <input
                  type="text"
                  className="form-control block w-full px-3 py-1.5 text-base border border-gray-300 rounded"
                  placeholder="例：Animation"
                  {...register('name', { required: true })}
                />
              </div>
              <div className="mb-3">
                <label className="form-label inline-block mb-2 text-gray-700">分類中文名稱</label>
                <input
                  type="text"
                  className="form-control block w-full px-3 py-1.5 text-base border border-gray-300 rounded"
                  placeholder="例：動畫"
                  {...register('name_cht')}
                />
              </div>
              <div className="mb-3">
                <label className="form-label inline-block mb-2 text-gray-700">Slug（網址路徑）</label>
                <input
                  type="text"
                  className="form-control block w-full px-3 py-1.5 text-base border border-gray-300 rounded"
                  placeholder="例：animation、motion-design"
                  {...register('slug')}
                />
                <p className='text-xs text-zinc-400 mt-1'>留空則依英文名稱自動產生，需與導覽列 /works/ 路徑一致</p>
              </div>
              <div className="mb-3">
                <label className="form-label inline-block mb-2 text-gray-700">排序（1–999，越大越前面）</label>
                <input
                  type="text"
                  className="form-control block w-full px-3 py-1.5 text-base border border-gray-300 rounded"
                  placeholder="排序"
                  {...register('sort_num')}
                />
              </div>

              <hr className='my-4' />
              <h2 className='font-bold mb-3'>首頁直式影片（桌面 hover 播放）</h2>
              <div className="mb-3">
                <label className="form-label inline-block mb-2 text-gray-700">上傳直式影片檔</label>
                <input
                  type="file"
                  accept="video/mp4,video/webm,video/quicktime,.mp4,.webm,.mov"
                  className="form-control block w-full border border-gray-300 rounded p-2"
                  {...register('cover_video_file')}
                />
                <p className='text-xs text-zinc-400 mt-1'>MP4 / WebM / MOV，上限 150MB。上傳後優先於下方網址</p>
              </div>
              <div className="mb-3">
                <label className="form-label inline-block mb-2 text-gray-700">或貼上直式 MP4 網址</label>
                <input
                  type="text"
                  className="form-control block w-full px-3 py-1.5 text-base border border-gray-300 rounded"
                  placeholder="https://.../*.mp4"
                  {...register('cover_video')}
                />
              </div>
              {formStatus === 'EDIT' && category?.cover_video && (
                <p className='text-xs text-green-700 mb-3'>目前已設定直式影片</p>
              )}

              <hr className='my-4' />
              <h2 className='font-bold mb-3'>分類頁橫式影片（Header 背景）</h2>
              <div className="mb-3">
                <label className="form-label inline-block mb-2 text-gray-700">上傳橫式影片檔</label>
                <input
                  type="file"
                  accept="video/mp4,video/webm,video/quicktime,.mp4,.webm,.mov"
                  className="form-control block w-full border border-gray-300 rounded p-2"
                  {...register('header_video_file')}
                />
                <p className='text-xs text-zinc-400 mt-1'>MP4 建議；上傳後優先於 Vimeo / YouTube 網址</p>
              </div>
              <div className="mb-3">
                <label className="form-label inline-block mb-2 text-gray-700">或貼上 Vimeo / YouTube / MP4 網址</label>
                <input
                  type="text"
                  className="form-control block w-full px-3 py-1.5 text-base border border-gray-300 rounded"
                  placeholder="https://vimeo.com/... 或 https://.../*.mp4"
                  {...register('video_url')}
                />
              </div>
              {formStatus === 'EDIT' && category?.video_url && (
                <p className='text-xs text-green-700 mb-3'>目前已設定橫式影片</p>
              )}

              <div className="mb-3">
                <label className="form-label inline-block mb-2 text-gray-700">前台顯示</label>
                <div className="flex items-center mb-4">
                  <input id="cat-display-1" type="radio" value="1" className="w-4 h-4" {...register("display")} />
                  <label htmlFor="cat-display-1" className="ml-2 text-sm">顯示於首頁</label>
                </div>
                <div className="flex items-center">
                  <input id="cat-display-0" type="radio" value="0" className="w-4 h-4" {...register("display")} />
                  <label htmlFor="cat-display-0" className="ml-2 text-sm">不顯示</label>
                </div>
              </div>
            </div>

            <div className='left w-1/2'>
              <h2 className='font-bold mb-3'>首頁手機版封面圖</h2>
              <div className="mb-3">
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/jpg"
                  className="custom form-control border p-2 w-full"
                  {...register('poster_file')}
                />
                <p className='text-xs text-zinc-400 mt-1'>手機版不播影片，改顯示此靜態封面</p>
              </div>
              {formStatus === 'EDIT' && category?.posterpath && (
                <div className='mb-3'>
                  <p className='text-sm mb-2'>目前封面：</p>
                  <img src={category.posterpath} className="max-h-40 object-contain border" alt="" />
                </div>
              )}
              {formStatus === 'EDIT' && !category?.posterpath && category?.video_poster && (
                <p className='text-xs text-zinc-500 mb-3'>舊版靜態圖：{category.video_poster}</p>
              )}

              {formStatus === 'EDIT' && (
                <>
                  <hr className='my-4' />
                  <h2 className='font-bold mb-3'>分類縮圖（選用）</h2>
                  <div className="mb-3">
                    <input type="file" accept="image/png,image/jpeg,image/jpg" className="custom form-control border p-2 w-full" {...register('file')} />
                  </div>
                  {category?.imgpath && (
                    <img src={category.imgpath} className="max-h-32 object-contain border" alt="" />
                  )}
                </>
              )}
            </div>
          </div>

          <div className='mt-4'>
            {formStatus === 'EDIT' ? (
              <button type="submit" className="py-2 px-4 bg-black text-white rounded-md">
                儲存編輯<input type="hidden" value="EDIT" {...register('method')} />
              </button>
            ) : (
              <button type="submit" className="py-2 px-4 bg-black text-white rounded-md">
                新增分類<input type="hidden" value="ADD" {...register('method')} />
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

export default CategoryForm
