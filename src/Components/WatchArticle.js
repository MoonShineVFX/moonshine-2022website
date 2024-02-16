import React,{useState,useEffect} from 'react'
import {getWorkByidForArticle} from '../Helper/getfunction'
import { useParams, Link,useNavigate } from 'react-router-dom';
import ReactPlayer from 'react-player';
import Header from '../Components/Header'
function WatchArticle() {
  const {workid} = useParams();
	let navigate = useNavigate();
	const [data ,setData] = useState(null)
	console.log(data)
	const gridColsClassMap = {
    '1': 'grid-cols-1',
    '2': 'grid-cols-2',
    '3': 'grid-cols-3',
  };
  useEffect(()=>{
		if(!workid) return

		getWorkByidForArticle(workid,function(res){
			setData(res)
			console.log(res)
		})

		// window.onpopstate = () =>{
		// 	navigate(-1)
		// }
	},[])
  return (
    <section id="watch_article">
			{data &&
				<div className=" relative aspect-video">
					<ReactPlayer
						url={data.artlcle_layout ? data.artlcle_layout.artlcle_video_cover : data.video_url}
						className='react-player'
						playing
						controls
						muted
						width='100vw'
						height='56.25vw'

					/>
      	</div>
			}
			<div className='w-10/12 lg:w-11/12 mx-auto'>
				{
					data?.artlcle_layout  ?
						<div className='flex justify-center flex-col  relative'>
							<div className=' text-lg lg:text-3xl font-normal mt-10 lg:mt-20  text-white/80'>{data?.artlcle_layout.artlcle_title}</div>

							{data.artlcle_layout &&
								<div className='flex gap-8  lg:my-10 text-white/60'>
									<div className='text-base leading-normal lg:leading-6  whitespace-pre-line w-1/2' data-aos="fade-up" data-aos-duration="1500">
										<div className=' uppercase text-white mb-4 '>statement</div>
										{data.artlcle_layout.artlcle_statement}

									</div>
									<div className='text-base leading-normal lg:leading-6  whitespace-pre-line w-1/2' data-aos="fade-up" data-aos-duration="1500">
										<div className=' uppercase text-white mb-4'>description</div>
										{data.artlcle_layout.artlcle_description}
									</div>
								</div>

							}									

							{data.artlcle_layout && 
								<div className=' flex flex-col  justify-between'>
									{data.artlcle_layout.article_imglist.map((item, index) => (
										<div key={index} className='' data-aos="fade-up" data-aos-duration="1500"> {/* 使用外层的index作为key */}
											{item.type === 'divider' ? (
												<div className="my-2 border-t-2 border-gray-400"></div>
											) : (
												<div className={`grid ${gridColsClassMap[parseInt(item.type[0], 10)]} gap-4`}>
													{item.imgurl.map((element, columnIdx) => (
														<div key={index + '-' + columnIdx} className="mb-4 relative"> {/* 修改key为组合形式 */}
															<img src={element} alt="" className='object-cover w-full h-full ' />
														</div>
													))}
												</div>
											)}
										</div>
									))}
								</div>
							}


						</div>

					: <div className='text-white/50 text-sm mt-2'>尚未加入頁面內容..</div>
				}
			</div>
		</section>
  )
}

export default WatchArticle



