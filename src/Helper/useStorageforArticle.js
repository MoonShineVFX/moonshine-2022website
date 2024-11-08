import { useState, useEffect } from "react";
import Resizer from "react-image-file-resizer";
//firebase
import db from '../firebaseConfig/firestorage'
import {ref,uploadBytesResumable, getDownloadURL,getStorage  } from "firebase/storage"


export const useStorageforArticle = (file) => {
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(null);
    const [onlineUrl, setOnlineUrl] = useState(null);
    const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file.file,
        file.maxWidth,
        file.maxHeight,
        file.compressFormat,
        file.quality,
        0,
        (uri) => {
          resolve(uri);
        },
        "file"
      );
    });

    const getImageDimensions = (file) => new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
          resolve({ width: img.width, height: img.height });
      };
      img.onerror = reject;
      img.src = URL.createObjectURL(file);
  });
    // runs every time the file value changes
    // 應該先等按下確認後地上傳圖片
    // 選擇圖片後先顯示給使用者看 但還沒上傳 然後按下確定再上傳
    useEffect(() => {
        const uploadImage = async ()=>{
          if (file) {
            let image = file.file
            // storage ref
            const dimensions = await getImageDimensions(file.file);
            if (dimensions.width > 1501 || file.file.type !== 'image/gif') {
              image = await resizeFile(file);
            }
            const storageRef =await ref(db, file.folder+file.filename);
            const uploadTask =uploadBytesResumable(storageRef, image);
            uploadTask.on('state_changed', (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                setProgress(progress)
                switch (snapshot.state) {
                  case 'paused':
                    console.log('Upload is paused');
                    break;
                  case 'running':
                    console.log('Upload is running');
                    break;
                  default:
                    console.log(' ')
                }
              }, 
              (error) => {
                setError(error)
              }, 
              () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                  console.log('File available at', downloadURL);
                  setOnlineUrl(downloadURL)
                });
              }
            ); 
          }
        }
        uploadImage()

    }, [file]);

    return { progress, onlineUrl, error};
};



export const useImageUrl = (img)=>{
  const [onlineUrl, setOnlineUrl] = useState(null);
  const storage = getStorage();
//'data/14607268903042.jpg'
  // console.log(`data/${img}`)
  const imagesRef = ref(storage, `data/${img}`);
  getDownloadURL(imagesRef).then((url)=>{ 
    setOnlineUrl(url)
  })
  .catch((error) => {
    switch (error.code) {
      case 'storage/object-not-found':
        // File doesn't exist
        break;
      case 'storage/unauthorized':
        // User doesn't have permission to access the object
        break;
      case 'storage/canceled':
        // User canceled the upload
        break;
  
      case 'storage/unknown':
        // Unknown error occurred, inspect the server response
        break;
      default:
        console.log('')
    }
  })

  return onlineUrl 
}