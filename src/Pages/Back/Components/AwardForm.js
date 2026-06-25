import React, { useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil';
import { formDisplayState,formStatusState, adminAwardState } from '../atoms/fromTypes'
import { useForm } from 'react-hook-form';

function AwardForm({handleCreate,handleEdit}) {
  const {register, handleSubmit, reset} = useForm({
    defaultValues: {
      title: "",
      awardtitle: "",
      subtitle: "",
      sort_num: "",
      display: "1",
    }
  });

  const onSubmit = (data) => {
    if(data.method === 'ADD'){
      handleCreate(data)
    } else if (data.method === 'EDIT'){
      handleEdit(award.uid, data)
    }
  };

  const [showModal, setShowModal] = useRecoilState(formDisplayState);
  const award = useRecoilValue(adminAwardState);
  const formStatus = useRecoilValue(formStatusState);

  const handleClose = () => {
    setShowModal(false);
  };

  useEffect(() => {
    if (formStatus === 'EDIT' && award) {
      reset({
        title: award.title || "",
        awardtitle: award.awardtitle || "",
        subtitle: award.subtitle || "",
        sort_num: award.sort_num || "",
        display: award.display || "1",
      })
    } else {
      reset({
        title: "",
        awardtitle: "",
        subtitle: "",
        sort_num: "",
        display: "1",
      })
    }
  }, [formStatus, award, reset])

  return (
    <div className={'w-full h-screen absolute top-0 left-0 z-20 overflow-hidden'}>
      <div className='opacity-30 absolute inset-0 bg-black' onClick={handleClose}></div>
      <div className='relative w-4/5 bg-white mx-auto my-20 p-5 overflow-auto max-h-[85vh]'>
        <div className='text-xl text-center font-bold'>{formStatus === 'ADD' ? '新增獎項' : '編輯獎項'}</div>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className='flex gap-4'>
            <div className='main w-1/2'>
              <div className="mb-3">
                <label className="form-label inline-block mb-2 text-gray-700">作品名稱</label>
                <input
                  type="text"
                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  placeholder="例：STARLUX AIRLINE - Star Wonderers"
                  {...register('title', { required: true })}
                />
              </div>
              <div className="mb-3">
                <label className="form-label inline-block mb-2 text-gray-700">獎項名稱</label>
                <input
                  type="text"
                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  placeholder="例：41th The Telly Awards"
                  {...register('awardtitle', { required: true })}
                />
              </div>
              <div className="mb-3">
                <label className="form-label inline-block mb-2 text-gray-700">獎項說明（可多行）</label>
                <textarea
                  rows={4}
                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  placeholder="每行一項說明"
                  {...register('subtitle')}
                />
              </div>
              <div className="mb-3">
                <label className="form-label inline-block mb-2 text-gray-700">排序（1–999，數字越大越前面）</label>
                <input
                  type="text"
                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  placeholder="排序"
                  {...register('sort_num')}
                />
              </div>
              <div className="mb-3">
                <label className="form-label inline-block mb-2 text-gray-700">前台顯示</label>
                <div className="flex items-center mb-4">
                  <input id="award-display-1" type="radio" value="1" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500" {...register("display")}/>
                  <label htmlFor="award-display-1" className="ml-2 text-sm font-medium text-gray-900">顯示此項</label>
                </div>
                <div className="flex items-center">
                  <input id="award-display-0" type="radio" value="0" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500" {...register("display")}/>
                  <label htmlFor="award-display-0" className="ml-2 text-sm font-medium text-gray-900">不顯示此項</label>
                </div>
              </div>
            </div>
            <div className='left w-1/2'>
              <div className="mb-3">
                <h1 className='mb-2'>獎項 Logo（PNG / JPG）</h1>
                <input type="file" accept="image/png,image/jpeg,image/jpg" className="custom form-control border p-2" {...register('file')} />
              </div>
              {formStatus === 'EDIT' && award?.imgpath && (
                <div className='bg-zinc-900 w-4/5 h-32 flex justify-center items-center'>
                  <img src={award.imgpath} className="img-fluid max-h-28 object-contain" alt="" />
                </div>
              )}
            </div>
          </div>

          <div>
            {formStatus === 'EDIT' ? (
              <button type="submit" className="py-2 px-4 bg-black text-white rounded-md">
                儲存編輯<input type="hidden" value="EDIT" {...register('method')}/>
              </button>
            ) : (
              <button type="submit" className="py-2 px-4 bg-black text-white rounded-md">
                新增<input type="hidden" value="ADD" {...register('method')}/>
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

export default AwardForm
