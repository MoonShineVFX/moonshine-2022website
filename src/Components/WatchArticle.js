import React,{useState,useEffect} from 'react'
import {getWorkByidForArticle} from '../Helper/getfunction'
import { useParams, Link } from 'react-router-dom';
function WatchArticle() {
  const {workid} = useParams();
	const [data ,setData] = useState(null)
	console.log(workid)
  useEffect(()=>{
		if(!workid) return

		getWorkByidForArticle(workid,function(res){
			setData(res)
			console.log(res)
		})
	},[])
  return (
    <div>WatchArticle</div>
  )
}

export default WatchArticle