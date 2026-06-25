import React, { useState, useEffect } from 'react'
import { useRecoilState } from 'recoil';
import { formDisplayState,formStatusState,adminAwardState } from './atoms/fromTypes';
import AwardForm from './Components/AwardForm';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import {getAwardForDashboard, createAward, deleteAward, updateAward} from '../../Helper/getfunction'
import {LoadingAnim} from '../../Helper/HtmlComponents'
import { useStorage } from "../../Helper/useStorage";

const IMAGE_TYPES = ["image/png", "image/jpeg", "image/jpg"];

function buildAwardPayload(data, imgFileName) {
  const payload = {
    title: data.title,
    awardtitle: data.awardtitle,
    subtitle: data.subtitle || "",
    sort_num: data.sort_num ? data.sort_num : '666',
    display: data.display || '1',
  };
  if (imgFileName) {
    payload.img = imgFileName;
  }
  return payload;
}

function uploadAwardImage(setFile, selectedFile, imgFileName) {
  setFile({
    filename: imgFileName,
    file: selectedFile,
    folder: 'img_award/',
    maxWidth: 200,
    maxHeight: 200,
    compressFormat: "PNG",
    quality: 90,
  });
}

function Award() {
  const [awardData, setAwardData] = useState([]);
  const [showModal, setShowModal] = useRecoilState(formDisplayState);
  const [, setFormStatus] = useRecoilState(formStatusState);
  const [, setSingleAward] = useRecoilState(adminAwardState);
  const [file, setFile] = useState(null);
  useStorage(file);

  const refreshAwards = () => {
    getAwardForDashboard((res) => {
      setAwardData(res)
    })
  }

  const onDelete = (uid) => {
    confirmAlert({
      title: '確認刪除這筆資料',
      buttons: [
        {
          label: '確定',
          onClick: () => deleteAward(uid, (res) => {
            fetchDataDoneFun('刪除資料失敗，錯誤訊息:', res)
          })
        },
        { label: '取消' },
      ]
    });
  }

  const fetchDataDoneFun = (customStr, res) => {
    setShowModal(false)
    if (res === 'success') {
      refreshAwards()
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

  const handleCreate = (data) => {
    const selectedFile = data.file?.[0];
    const imgFileName = selectedFile ? `${Date.now()}.png` : null;

    if (selectedFile && !IMAGE_TYPES.includes(selectedFile.type)) {
      showErrorAlert('圖片格式錯誤：', '請上傳 PNG 或 JPG')
      return;
    }

    if (selectedFile) {
      uploadAwardImage(setFile, selectedFile, imgFileName);
    }

    const currentData = {
      id: Date.now().toString(36),
      time_added: new Date(+new Date() + 8 * 3600 * 1000).toISOString().replace(/T/, ' ').replace(/\..+/, ''),
      ...buildAwardPayload(data, imgFileName),
    };

    createAward(currentData, (res) => {
      fetchDataDoneFun('新增資料失敗，錯誤訊息:', res)
    })
  }

  const handleEdit = (uid, data) => {
    const selectedFile = data.file?.[0];
    const imgFileName = selectedFile ? `${Date.now()}.png` : null;
    const currentData = buildAwardPayload(data, imgFileName);

    if (selectedFile && !IMAGE_TYPES.includes(selectedFile.type)) {
      showErrorAlert('圖片格式錯誤：', '請上傳 PNG 或 JPG')
      return;
    }

    if (selectedFile) {
      uploadAwardImage(setFile, selectedFile, imgFileName);
    }

    updateAward(uid, currentData, (res) => {
      fetchDataDoneFun('編輯資料失敗，錯誤訊息:', res)
    })
  }

  useEffect(() => {
    refreshAwards()
  }, [])

  return (
    <section className='w-full bg-white p-5 text-black relative'>
      <div className='w-full border-b mb-10'>
        <h1>管理獎項</h1>
        <p className='text-sm text-zinc-500 mt-2'>欄位對應首頁 Awards 區塊：作品名稱、獎項名稱、獎項說明、Logo 圖片</p>
      </div>
      <button
        className='text-xs rounded-md bg-black text-white py-2 px-6 hover:bg-slate-600'
        onClick={() => {
          setShowModal(true);
          setFormStatus('ADD')
        }}
      >新增獎項</button>
      <div id="table" className='w-full mt-5'>
        <table className="table-auto border border-slate-200 w-full rounded-md">
          <thead>
            <tr>
              <th className='bg-zinc-100 border-b border-zinc-300 text-left'>ID</th>
              <th className='bg-zinc-100 border-b border-zinc-300 text-left'>排序</th>
              <th className='bg-zinc-100 border-b border-zinc-300 text-left'>作品名稱</th>
              <th className='bg-zinc-100 border-b border-zinc-300 text-left'>獎項名稱</th>
              <th className='bg-zinc-100 border-b border-zinc-300 text-left'>圖片</th>
              <th className='bg-zinc-100 border-b border-zinc-300 text-left'>顯示</th>
              <th className='bg-zinc-100 border-b border-zinc-300 text-left'>編輯</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-slate-200'>
            {awardData.length > 0 ? awardData.map((item) => {
              const { uid, id, title, awardtitle, imgpath, sort_num, display } = item
              return (
                <tr className='hover:bg-zinc-200' key={uid || id}>
                  <td className='p-2 text-xs'>{id}</td>
                  <td className='p-2 text-xs'>{sort_num}</td>
                  <td className='p-2 text-xs'>{title}</td>
                  <td className='p-2 text-xs'>{awardtitle}</td>
                  <td className='p-2 text-xs'>{imgpath ? '是' : '否'}</td>
                  <td className='p-2 text-xs'>{display === '1' ? '顯示' : '不顯示'}</td>
                  <td className='p-2 text-xs'>
                    <button
                      className='text-xs rounded-md bg-black text-white py-2 px-6 hover:bg-slate-600'
                      onClick={() => {
                        setShowModal(true);
                        setSingleAward(item)
                        setFormStatus('EDIT')
                      }}>編輯</button>
                    <button
                      className='text-xs rounded-md bg-black text-white py-2 px-6 hover:bg-slate-600 ml-2'
                      onClick={() => onDelete(uid)}>刪除</button>
                  </td>
                </tr>
              )
            }) : <tr><td colSpan={7}><LoadingAnim /></td></tr>}
          </tbody>
        </table>
      </div>

      {showModal && <AwardForm handleCreate={handleCreate} handleEdit={handleEdit} />}
    </section>
  )
}

export default Award
