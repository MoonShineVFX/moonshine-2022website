import React, { useState, useEffect } from 'react'
import { getCategory} from '../../../Helper/getfunction'
import ImgHeader from '../../../Components/ImgHeader'
import Header from '../../../Components/Header'
import { useParams } from "react-router-dom";
import { LoadingAnim } from '../../../Helper/HtmlComponents';
function By_Category() {
  let { name } = useParams();
  const [categoryData, setCategoryData] = useState([]);
  useEffect(()=>{
    getCategory((res)=>{
      setCategoryData(res)
      console.log(res)
    })
  },[])
  console.log(useParams())
  return (
    <section id="by_category">
       <Header v_url={'work01.png'} />


    </section>
  )
}

export default By_Category