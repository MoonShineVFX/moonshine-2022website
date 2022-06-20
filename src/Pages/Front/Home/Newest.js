import React from 'react'
import { useRecoilState } from 'recoil';
import { modalState, movieState } from '../../../atoms/modalAtom';
import { Movie } from '../../../types';
import { Link   } from "react-router-dom";
function Newest({data}) {
  console.log(data)
  const [showModal, setShowModal] = useRecoilState(modalState);
  const [currentMovie, setCurrentMovie] = useRecoilState(movieState);
  
  return (
    <div id="Newest">
      <div className="home_header header_newwest">
        <h1>Newest</h1>
        <Link to='work' className="more hover:text-white">More</Link>

      </div>
      
      
      <div className="newest_list">
        {
          data ? data.map((item)=>{
            const { id,image,title,imgpath} = item
            return(
              <div 
                key = {id}
                className="newest_item" 
                style={{backgroundImage: `url(${imgpath})`}}
                onClick={() => {
                  setShowModal(true);
                  setCurrentMovie(item);
                }}
              >
                <div className="title">{title}</div>
              </div>
            )
          }) : <div>Loading</div>
        }

      
      </div>
    </div>
  )
}

export default Newest