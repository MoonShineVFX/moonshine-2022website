import React,{useState,useEffect} from 'react'
import {getWorkByidForArticle} from '../Helper/getfunction'
import { useParams, Link } from 'react-router-dom';
import ReactPlayer from 'react-player';
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
    <section id="watch_article">
			<div className='w-8/12 mx-auto'>
				{
					data ?
						<div className='flex justify-center flex-col items-center relative'>
							<div className='text-2xl font-normal my-10'>{data.title}</div>
							<div className='relative  bg-black aspect-video w-full'>
								<ReactPlayer
										url={data.video_url}
										width="100%"
										height="100%"
										style={{ position: 'absolute', top: '0', left: '0' }}
										playing
										controls
									/>
							
							</div>
						</div>

					: <div>Loading..</div>
				}
			</div>
		</section>
  )
}

export default WatchArticle