import React from 'react'
import { useRecoilState } from 'recoil';
import { modalState, movieState } from '../../../atoms/modalAtom';
import { Movie } from '../../../types';
import { Link   } from "react-router-dom";
import { motion,AnimatePresence  } from "framer-motion"
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
              <motion.div 
                key = {id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1}}
                exit={{ opacity: 0 }}
                transition={{type:'spring' , stiffness:50}}
                className="newest_item" 
                style={{backgroundImage: `url(${imgpath})`}}
                onClick={() => {
                  setShowModal(true);
                  setCurrentMovie(item);
                }}
              >
                <div className="title">{title}</div>
              </motion.div>
            )
          }) :<svg className="animate-spin h-5 w-5 mr-3 fill-white" width="16px" height="16px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path fill-rule="evenodd" clip-rule="evenodd" d="M13.917 7A6.002 6.002 0 0 0 2.083 7H1.071a7.002 7.002 0 0 1 13.858 0h-1.012z"/></svg>
        }

      
      </div>
    </div>
  )
}

export default Newest