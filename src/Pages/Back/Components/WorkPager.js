import React,{useState,useEffect} from 'react'
import { constSelector, useRecoilState, useRecoilValue } from 'recoil';
import { formDisplayState, workState,formStatusState,workpagerDisplayState } from '../atoms/fromTypes'
import {motion,AnimatePresence} from 'framer-motion'
import VideoPreview from './VideoPreview';
import { useForm,Controller } from 'react-hook-form';
//檔案上傳方法
import { useStorageforArticle } from "../../../Helper/useStorageforArticle";
//拖曳
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

function WorkPager({ showModal, setShowModal,handleEditWorkArticleLayout,status }) {
  const { control, register, handleSubmit,reset, watch, formState: { errors } } = useForm({
    defaultValues:{
      artlcle_description:"",
      artlcle_statement:"",
      artlcle_title:"",
      artlcle_video_cover:"",
    }
  });
  const url = watch("url");
  const work = useRecoilValue(workState);
  const formStatus = useRecoilValue(formStatusState);
  const [file, setFile] = useState(null);
  const { progress, onlineUrl } = useStorageforArticle(file);
  const [videoUrl, setVideoUrl] = useState('');
  const [imgList, setImgList] = useState([]);
  const [uploadingIndex, setUploadingIndex] = useState(null);
  const gridColsClassMap = {
    '1': 'grid-cols-1',
    '2': 'grid-cols-2',
    '3': 'grid-cols-3',
  };
  const onSubmit = data => {
    const submissionData = {
      ...data, // 包含 artlcle_video_cover, artlcle_title, artlcle_statement, artlcle_description
      article_imglist: imgList, // 将 imgList 直接加入
    };
    handleEditWorkArticleLayout(work.uid,submissionData)  
    console.log(submissionData);
  };
  const handleChange = (e) => {
    const inputUrl = e.target.value;
    setVideoUrl(inputUrl);
  }
  const addItem = (type) => {
    let newItem = { type: type };
    const initialImgUrl = { url: "https://placehold.jp/9e9e9e/ffffff/300x150.png?text=image%20here", displayType: "image", text: "" };
    if (type === '1column') {
      newItem.imgurl = [ {...initialImgUrl} ];
    } else if (type === '2column') {
      newItem.imgurl = [ {...initialImgUrl}, {...initialImgUrl} ];
    } else if (type === '3column') {
      newItem.imgurl = [ {...initialImgUrl}, {...initialImgUrl}, {...initialImgUrl} ];
    }

    setImgList([...imgList, newItem]);
    console.log(imgList)
  };
  const handleDeleteItem = (indexToDelete) => {
    setImgList(imgList.filter((_, index) => index !== indexToDelete));
  };
  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    const items = Array.from(imgList);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setImgList(items);
  };
  const renderItems = () => {
    return (
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable-imgList">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {imgList.map((item, columnIdx) => (
                <Draggable key={columnIdx} draggableId={`item-${columnIdx}`} index={columnIdx}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="mb-4 relative"
                    >
                      {/* 以下是你原有的渲染逻辑 */}
                      {item.type === 'divider' ? (
                        <div className="my-2 border-t-2 border-gray-400"></div>
                      ) : (
                        <div className={`grid ${gridColsClassMap[parseInt(item.type[0], 10)]} gap-2`}>
                         
                          {Array.from({ length: parseInt(item.type[0], 10) }).map((_, imgIdx) => {
                            const imgUrl = item.imgurl[imgIdx];
                            return (
                              <div key={imgIdx} className="flex flex-col items-center justify-center p-4 border-2 border-gray-300 border-dashed rounded-md relative">
                                {imgUrl && imgUrl.displayType === 'image' ? (
                                  <>
                                    <img src={imgUrl.url} alt={`Column ${imgIdx + 1}`} className="w-full h-auto" />
                                    <label className="cursor-pointer bg-zinc-200 hover:bg-zinc-300 rounded-md py-2 px-3 mt-1 text-sm ">
                                      <span className='  '>選擇圖片</span>
    
                                      <input
                                        type="file"
                                        onChange={(e) => handleFileChange(e, columnIdx, imgIdx)}
                                        className=" mt-1 cursor-pointer hidden "

                                      />

                                    </label>
                                    <button 
                                      onClick={(e)=>handleToggleDisplayType(columnIdx, imgIdx)}
                                      className="px-2 py-1 bg-blue-500 text-white rounded-md absolute  top-0 left-0 text-xs">切換型態
                                    </button>
                                    

                                  </>
                                ) : imgUrl && imgUrl.displayType === 'text' ? (
                                  <>
                                    <div className=" w-full h-32 flex items-center relative">
                                      <textarea
                                        value={imgUrl.text}
                                        onChange={(e) => handleTextChange(e, columnIdx, imgIdx)}
                                        className="w-full h-32 p-2 border"
                                        placeholder="請輸入文字內容"
                                      />
                                    </div>
                                    <button 
                                      onClick={(e)=>handleToggleDisplayType(columnIdx, imgIdx)}
                                      className="px-2 py-1 bg-blue-500 text-white rounded-md absolute  top-0 left-0 text-xs">切換型態
                                    </button>
                                  </>


                                ) : (
                                  <div className="bg-zinc-200 hover:bg-zinc-300  w-full h-32 flex items-center justify-center">
                                    <label className="cursor-pointer">
                                      <span>Upload Image(jpg,gif)</span>
                                      <input
                                        type="file"
                                        onChange={(e) => handleFileChange(e, columnIdx, imgIdx)}
                                        className="hidden"
                                      />
                                      <button 
                                        onClick={(e)=>handleToggleDisplayType(columnIdx, imgIdx)}
                                        className="px-2 py-1 bg-blue-500 text-white rounded-md absolute  top-0 left-0 text-xs">切換型態
                                      </button>
                                    </label>
                                   
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}
                      <button onClick={() => handleDeleteItem(columnIdx)} className=" px-2 py-1 bg-red-500 text-white rounded-md absolute right-0 top-0 text-xs">Delete</button>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  };

  //上傳圖片的方法
  const handleFileChange = (e,columnIdx, imgIdx) => {
    console.log(e,columnIdx, imgIdx)
    const file = e.target.files[0];
    const fileExtension = file.name.split('.').pop();
    const imgFileName = `${Date.now()}.${fileExtension}`
    const uploadedImageUrl = URL.createObjectURL(file);
    if (file) {

      // 保持input可用
      // 更新imgList状态
      setImgList(prevImgList => {
        // 创建新数组的浅拷贝
        const newImgList = [...prevImgList];
        // 深拷贝需要更新的列对象
        const targetColumn = { ...newImgList[columnIdx] };
        // 深拷贝 imgurl 数组
        targetColumn.imgurl = [...targetColumn.imgurl];
  
        // 确保 imgurl 数组足够长
        while (targetColumn.imgurl.length <= imgIdx) {
          targetColumn.imgurl.push({ url: "", displayType: "image", text: "" });
        }
        // 更新目标图片对象的URL
        const updatedImgItem = { ...targetColumn.imgurl[imgIdx], url: uploadedImageUrl };
        targetColumn.imgurl[imgIdx] = updatedImgItem;
        newImgList[columnIdx] = targetColumn;

        return newImgList;
      });
      setFile({
        "filename":imgFileName,
        "file":file,
        "folder":'img_article/',
        "maxWidth":640 ,
        "maxHeight":360,
        "compressFormat":"WEBP",
        "quality":95
      });
      console.log(columnIdx, imgIdx)
      setUploadingIndex({ columnIdx, imgIdx });
    }
  };
  //切換input型態的方法
  const handleToggleDisplayType = (columnIdx, imgIdx) => {
    setImgList(prevImgList => {
      // 创建新数组的浅拷贝
      const newImgList = [...prevImgList];
      // 深拷贝需要更新的列对象
      const targetColumn = { ...newImgList[columnIdx] };
      // 深拷贝 imgurl 数组
      targetColumn.imgurl = [...targetColumn.imgurl];
      
      // 获取当前项
      const currentItem = targetColumn.imgurl[imgIdx];
      // 判断当前显示类型，并切换
      if (currentItem) {
        const newDisplayType = currentItem.displayType === 'image' ? 'text' : 'image';
        // 更新 displayType，如果是切换到 text，清空 url，如果切换到 image，清空 text
        const updatedItem = { ...currentItem, displayType: newDisplayType, url: newDisplayType === 'image' ? currentItem.url : '', text: newDisplayType === 'text' ? currentItem.text : '' };
        targetColumn.imgurl[imgIdx] = updatedItem;
      }
  
      // 将更新后的列对象放回新列表中
      newImgList[columnIdx] = targetColumn;
  
      return newImgList;
    });
  };
  //處理下方為文字欄位的時候 更新內容
  const handleTextChange = (e, columnIdx, imgIdx) => {
    // 获取用户输入的文本
    const newText = e.target.value;
  
    // 创建 imgList 的深拷贝以避免直接修改状态
    const newImgList = [...imgList];
  
    // 确保目标项存在，并且有 imgurl 数组
    if (newImgList[columnIdx] && newImgList[columnIdx].imgurl) {
      // 如果该位置已有对象，则更新其 text 属性；否则，创建一个新对象
      if (newImgList[columnIdx].imgurl[imgIdx]) {
        newImgList[columnIdx].imgurl[imgIdx] = {
          ...newImgList[columnIdx].imgurl[imgIdx],
          text: newText, // 更新文本内容
          displayType: 'text' // 确保显示类型为文本
        };
      } else {
        // 如果该位置是空的，则创建一个新的包含文本内容的对象
        newImgList[columnIdx].imgurl[imgIdx] = { text: newText, displayType: 'text' };
      }
      
      // 更新状态以反映变化
      setImgList(newImgList);
    }
  };
  //偵測資料比變更完成 逼芳說圖片上傳完或文字已更新 變更資料的方法
  useEffect(() => {
    if (onlineUrl && uploadingIndex !== null) {
      const { columnIdx, imgIdx } = uploadingIndex;
      setImgList(prevImgList => {
        // 创建新数组的浅拷贝
        const newImgList = [...prevImgList];
        // 深拷贝需要更新的列对象
        const targetColumn = { ...newImgList[columnIdx] };
        // 深拷贝 imgurl 数组
        targetColumn.imgurl = [...targetColumn.imgurl];
        
        // 确保 imgurl 数组足够长
        if (targetColumn.imgurl[imgIdx]) {
          // 更新目标图片对象的URL，保留其他属性
          const updatedImgItem = { 
            ...targetColumn.imgurl[imgIdx], 
            url: onlineUrl // 使用真实上传后的 URL 替换临时 URL
          };
          targetColumn.imgurl[imgIdx] = updatedImgItem;
        }
        
        // 将更新后的列对象放回新列表中
        newImgList[columnIdx] = targetColumn;
        
        return newImgList;
      });
      
      setUploadingIndex(null); // 重置上传索引
    }
  }, [onlineUrl]); 


  const backdropVariants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };
  
  const modalVariants = {
    hidden: { y: "10vh", opacity: 0 },
    visible: { y: "10px", opacity: 1, transition: { delay: 0.5 } },
  };
  useEffect(()=>{
    if (work?.artlcle_layout) {
      // 如果处于编辑状态且 work 对象存在，则重置表单为 work 的值
      reset(work.artlcle_layout);
      setVideoUrl(work.artlcle_layout.artlcle_video_cover);
      setImgList(work.artlcle_layout.article_imglist);
    } else {
      console.log('no article')
      reset({});
      setImgList([])
      setVideoUrl('')
    }
  },[work])
  return (
    <AnimatePresence exitBeforeEnter>
      {showModal && (
        <motion.div
          className="backdrop bg-slate-200/60 w-full h-screen fixed top-0 left-0 z-20"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={() => setShowModal(false)}
        >
          <motion.div
            className="modal  h-[93%] w-9/12 relative mx-auto  p-5  bg-white rounded-lg "
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={(e) => e.stopPropagation()} // 阻止点击事件冒泡到背景层
          >
            {/* 模态框内容 */}
            <div className=' relative  z-10 h-full overflow-auto px-5 '>
              <form onSubmit={handleSubmit(onSubmit)} className=' relative'>
                <div className='text-center'><span className='font-bold'>{work.title} </span> - Page Layout</div>

                <div className=' relative'>
                  <VideoPreview url={videoUrl} />
                  {/* <input type="text"  onChange={handleChange} placeholder="Paste a YouTube or Vimeo URL"  className=' absolute bottom-2 left-1/2 -translate-x-1/2 border z-10 py-1 px-1  w-1/2 rounded-md text-center'/> */}
                  <input type="text" {...register("artlcle_video_cover")} onChange={handleChange} placeholder="Paste a YouTube or Vimeo URL" className='absolute bottom-2 left-1/2 -translate-x-1/2 border z-10 py-1 px-1 w-1/2 rounded-md text-center'/>
                </div>

                <div className='my-2'>
                  <input type="text" {...register("artlcle_title")} placeholder="Portfolio Title" className='text-4xl border'/>
                </div>
                <div className='flex gap-2 my-2'>
                  <div className='w-full'> 
                    Statement
                    <textarea {...register("artlcle_statement")} rows="10" className='w-full border p-1'></textarea>
                  </div>
                  <div className='w-full'> 
                    Description
                    <textarea {...register("artlcle_description")} rows="10" className='w-full border p-1'></textarea>
                  </div>
                </div>

                <div className='bg-blue-500/90 px-2 py-1 flex gap-2 items-center rounded-md text-white text-sm'>
                  往下增加一列
                  <button onClick={() => addItem('1column')} className='border rounded-md  px-2 py-1 hover:bg-blue-700'>1 Column</button>
                  <button onClick={() => addItem('2column')} className='border rounded-md  px-2 py-1 hover:bg-blue-700'>2 Column</button>
                  <button onClick={() => addItem('3column')} className='border rounded-md  px-2 py-1 hover:bg-blue-700'>3 Column</button>
                  <button onClick={() => addItem('divider')} className='border rounded-md  px-2 py-1 hover:bg-blue-700'>divider</button>
                </div>
                <div className='text-xs text-zinc-500 my-2'>
                    Gif 動畫檔案，請盡可能壓縮在 16mb 以下(建議值: 15 frames/sec,800x450 pixel) <br />
                    Jpg 圖片檔案單獨大張，請盡可能壓縮在 1mb 以下(建議值:小於 2000x1126 pixel) <br />
                    Jpg 圖片檔案雙邊兩張，請盡可能壓縮在 256kb 以下(建議值:小於 1000x568 pixel) <br />
                  </div>
                <div className="my-4">
                  {renderItems()}
                </div>

                <div className='  fixed top-4 right-12 gap-2 flex items-center'>
                  <button type="button" className='text-xs  rounded-md bg-black/50 text-white py-2 px-6 hover:bg-slate-600 ' onClick={() => setShowModal(false)}>關閉</button>
                  <button type="submit" className='text-xs  rounded-md bg-black text-white py-2 px-6 hover:bg-slate-600 '>儲存頁面({status})</button>
                </div>


              </form>
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>

  )
}

export default WorkPager