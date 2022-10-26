import React, { useState, useEffect } from 'react'
import { getCategory} from '../../../Helper/getfunction'
import { LoadingAnim } from '../../../Helper/HtmlComponents';
function Home_mainCategory() {

  const [categoryData, setCategoryData] = useState([]);
  useEffect(()=>{
    getCategory((res)=>{
      setCategoryData(res)
      console.log(res)
    })
  },[])

  return (
    <div>
      <ul className='grid grid-cols-4 w-full h-screen'>
        {
          categoryData ? 
          categoryData.map((item,index)=>{
            const{id, name , name_cht,display,imgpath } = item
            return display === '1' ? 
              <li key={name+id} 
                  className="cursor-pointer text-white text-3xl font-thin bg-no-repeat bg-cover bg-center flex justify-center items-center opacity-50 hover:opacity-100 hover:tracking-widest transition-all  "
                  style={{backgroundImage : `url(${imgpath})`}}
              >
                {name }
              </li>
              :
              null


          }): <LoadingAnim />
        }
        </ul>

    </div>

  )
}

export default Home_mainCategory