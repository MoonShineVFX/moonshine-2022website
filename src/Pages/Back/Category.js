import React, { useState, useEffect } from 'react'
import { useRecoilState } from 'recoil';
import { formDisplayState, formStatusState, adminCategoryState } from './atoms/fromTypes';
import CategoryForm from './Components/CategoryForm';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { getAllCategoryForDashboard, createCategory, deleteCategory, updateCategory } from '../../Helper/getfunction'
import { LoadingAnim } from '../../Helper/HtmlComponents'
import { useStorage, useVideoStorage } from "../../Helper/useStorage";

const IMAGE_TYPES = ["image/png", "image/jpeg", "image/jpg"];
const VIDEO_TYPES = ["video/mp4", "video/webm", "video/quicktime"];
const MAX_VIDEO_BYTES = 150 * 1024 * 1024; // 150MB

function convertToSlug(text) {
  return text.toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');
}

function getVideoExtension(file) {
  if (file.type === 'video/webm') return 'webm';
  if (file.type === 'video/quicktime') return 'mov';
  return 'mp4';
}

function buildCategoryPayload(data, uploads) {
  const payload = {
    name: data.name,
    name_cht: data.name_cht,
    slug: data.slug?.trim() || convertToSlug(data.name),
    cover_video: uploads.coverVideoFileName ? '' : (data.cover_video || ''),
    video_url: uploads.headerVideoFileName ? '' : (data.video_url || ''),
    sort_num: data.sort_num ? data.sort_num : '666',
    display: data.display || '1',
  };
  if (uploads.posterFileName) payload.video_poster = uploads.posterFileName;
  if (uploads.imgFileName) payload.img = uploads.imgFileName;
  if (uploads.coverVideoFileName) payload.cover_video_file = uploads.coverVideoFileName;
  if (uploads.headerVideoFileName) payload.header_video_file = uploads.headerVideoFileName;
  return payload;
}

function Category() {
  const [categoryData, setCategoryData] = useState([]);
  const [showModal, setShowModal] = useRecoilState(formDisplayState);
  const [formStatus, setFormStatus] = useRecoilState(formStatusState);
  const [, setSingleCategory] = useRecoilState(adminCategoryState);
  const [file, setFile] = useState(null);
  const [posterFile, setPosterFile] = useState(null);
  const [coverVideoFile, setCoverVideoFile] = useState(null);
  const [headerVideoFile, setHeaderVideoFile] = useState(null);
  useStorage(file);
  useStorage(posterFile);
  useVideoStorage(coverVideoFile);
  useVideoStorage(headerVideoFile);

  const refreshCategories = () => {
    getAllCategoryForDashboard((res) => {
      setCategoryData(res)
    })
  }

  const uploadImage = (setUploadState, selectedFile, folder, imgFileName, format, maxW, maxH) => {
    setUploadState({
      filename: imgFileName,
      file: selectedFile,
      folder,
      maxWidth: maxW,
      maxHeight: maxH,
      compressFormat: format,
      quality: format === 'PNG' ? 90 : 75,
    });
  }

  const uploadVideo = (setUploadState, selectedFile, folder, filename) => {
    setUploadState({
      filename,
      file: selectedFile,
      folder,
    });
  }

  const onDelete = (uid) => {
    confirmAlert({
      title: '確認刪除這筆資料',
      buttons: [
        {
          label: '確定',
          onClick: () => deleteCategory(uid, (res) => {
            fetchCategoryDoneFun('刪除資料失敗，錯誤訊息:', res)
          })
        },
        { label: '取消' },
      ]
    });
  }

  const fetchCategoryDoneFun = (customStr, res) => {
    setShowModal(false)
    if (res === 'success') {
      refreshCategories()
    } else {
      showErrorAlert(customStr, res)
    }
  }

  const showErrorAlert = (str, res) => {
    confirmAlert({
      title: str + res,
      buttons: [{ label: '確定' }, { label: '取消' }],
    });
  }

  const validateVideo = (file, label) => {
    if (!VIDEO_TYPES.includes(file.type)) {
      showErrorAlert(`${label}格式錯誤：`, '請上傳 MP4、WebM 或 MOV');
      return false;
    }
    if (file.size > MAX_VIDEO_BYTES) {
      showErrorAlert(`${label}太大：`, '單檔上限 150MB');
      return false;
    }
    return true;
  }

  const processFileUploads = (data) => {
    const selectedPoster = data.poster_file?.[0];
    const selectedImg = data.file?.[0];
    const selectedCoverVideo = data.cover_video_file?.[0];
    const selectedHeaderVideo = data.header_video_file?.[0];
    let posterFileName = null;
    let imgFileName = null;
    let coverVideoFileName = null;
    let headerVideoFileName = null;

    if (selectedPoster) {
      if (!IMAGE_TYPES.includes(selectedPoster.type)) {
        showErrorAlert('封面圖格式錯誤：', '請上傳 PNG 或 JPG');
        return null;
      }
      posterFileName = `${Date.now()}_poster.jpg`;
      uploadImage(setPosterFile, selectedPoster, 'img_home/', posterFileName, 'JPEG', 800, 1200);
    }

    if (selectedImg) {
      if (!IMAGE_TYPES.includes(selectedImg.type)) {
        showErrorAlert('縮圖格式錯誤：', '請上傳 PNG 或 JPG');
        return null;
      }
      imgFileName = `${Date.now()}.jpg`;
      uploadImage(setFile, selectedImg, 'data/', imgFileName, 'JPEG', 500, 283);
    }

    if (selectedCoverVideo) {
      if (!validateVideo(selectedCoverVideo, '直式影片')) return null;
      coverVideoFileName = `${Date.now()}_cover.${getVideoExtension(selectedCoverVideo)}`;
      uploadVideo(setCoverVideoFile, selectedCoverVideo, 'video_category_cover/', coverVideoFileName);
    }

    if (selectedHeaderVideo) {
      if (!validateVideo(selectedHeaderVideo, '橫式影片')) return null;
      headerVideoFileName = `${Date.now()}_header.${getVideoExtension(selectedHeaderVideo)}`;
      uploadVideo(setHeaderVideoFile, selectedHeaderVideo, 'video_category_header/', headerVideoFileName);
    }

    return { posterFileName, imgFileName, coverVideoFileName, headerVideoFileName };
  }

  const handleCreateCategory = (data) => {
    const uploads = processFileUploads(data);
    if (!uploads) return;

    const currentData = {
      id: Date.now().toString(36),
      time_added: new Date(+new Date() + 8 * 3600 * 1000).toISOString().replace(/T/, ' ').replace(/\..+/, ''),
      ...buildCategoryPayload(data, uploads),
    };

    createCategory(currentData, (res) => {
      fetchCategoryDoneFun('新增資料失敗，錯誤訊息:', res)
    })
  }

  const handleEditCategory = (uid, data) => {
    const uploads = processFileUploads(data);
    if (!uploads) return;

    const currentData = buildCategoryPayload(data, uploads);

    updateCategory(uid, currentData, (res) => {
      fetchCategoryDoneFun('編輯資料失敗，錯誤訊息:', res)
    })
  }

  useEffect(() => {
    refreshCategories()
  }, [])

  return (
    <section className='w-full bg-white p-5 text-black relative'>
      <div className='w-full border-b mb-10'>
        <h1>管理首頁分類影片</h1>
        <p className='text-sm text-zinc-500 mt-2'>
          直式影片 = 首頁四格分類｜橫式影片 = 點進 /works/ 分類頁 Header（可上傳檔案或貼網址）
        </p>
      </div>
      <button
        className='text-xs rounded-md bg-black text-white py-2 px-6 hover:bg-slate-600'
        onClick={() => {
          setShowModal(true);
          setFormStatus('ADD')
        }}
      >新增分類</button>
      <div id="table" className='w-full mt-5'>
        <table className="table-auto border border-slate-200 w-full rounded-md">
          <thead>
            <tr>
              <th className='bg-zinc-100 border-b border-zinc-300 text-left'>ID</th>
              <th className='bg-zinc-100 border-b border-zinc-300 text-left'>排序</th>
              <th className='bg-zinc-100 border-b border-zinc-300 text-left'>名稱(英-中)</th>
              <th className='bg-zinc-100 border-b border-zinc-300 text-left'>Slug</th>
              <th className='bg-zinc-100 border-b border-zinc-300 text-left'>直式影片</th>
              <th className='bg-zinc-100 border-b border-zinc-300 text-left'>橫式影片</th>
              <th className='bg-zinc-100 border-b border-zinc-300 text-left'>顯示</th>
              <th className='bg-zinc-100 border-b border-zinc-300 text-left'>操作</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-slate-200'>
            {categoryData.length > 0 ? categoryData.map((item) => {
              const { uid, id, name, name_cht, sort_num, display, slug, cover_video, video_url, cover_video_file, header_video_file } = item
              const hasCover = cover_video_file || cover_video;
              const hasHeader = header_video_file || video_url;
              return (
                <tr className='hover:bg-zinc-200' key={uid || id}>
                  <td className='p-2 text-xs'>{id}</td>
                  <td className='p-2 text-xs'>{sort_num}</td>
                  <td className='p-2 text-xs'>{name} - {name_cht}</td>
                  <td className='p-2 text-xs'>{slug}</td>
                  <td className='p-2 text-xs'>{hasCover ? '已設定' : '—'}</td>
                  <td className='p-2 text-xs'>{hasHeader ? '已設定' : '—'}</td>
                  <td className='p-2 text-xs'>{display === '1' ? '顯示' : '不顯示'}</td>
                  <td className='p-2 text-xs'>
                    <button
                      className='text-xs rounded-md bg-black text-white py-2 px-6 hover:bg-slate-600'
                      onClick={() => {
                        setShowModal(true);
                        setSingleCategory(item)
                        setFormStatus('EDIT')
                      }}>編輯</button>
                    <button
                      className='text-xs rounded-md bg-black text-white py-2 px-6 hover:bg-slate-600 ml-2'
                      onClick={() => onDelete(uid)}>刪除</button>
                  </td>
                </tr>
              )
            }) : <tr><td colSpan={8}><LoadingAnim /></td></tr>}
          </tbody>
        </table>
      </div>

      {showModal && <CategoryForm handleCreateCategory={handleCreateCategory} handleEditCategory={handleEditCategory} />}
    </section>
  )
}

export default Category
