import React from 'react'
import { useRecoilState } from 'recoil';
import { modalState, movieState } from '../../atoms/modalAtom';
import { Movie } from '../../types';
import { motion,AnimatePresence  } from "framer-motion"
function Thumbnail({movie,categorystyle}) {
  const [showModal, setShowModal] = useRecoilState(modalState);
  const [currentMovie, setCurrentMovie] = useRecoilState(movieState);
  return (
    <AnimatePresence>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{type:'spring' , stiffness:50 , delay:0.15}}
      className={categorystyle ? 'relative w-1/5 px-2 cursor-pointer transition-transform duration-200 ease-out md:h-36 md:hover:scale-105' : `relative h-28 min-w-[180px] cursor-pointer transition-transform duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105 `}
      onClick={() => {
        setShowModal(true);
        setCurrentMovie(movie);
      }}
    >
      <img
        src={movie.imgpath} 
        layout="fill"
        className="rounded-sm object-cover md:rounded saturate-80"
        alt={movie.title}
      />
    </motion.div>
    </AnimatePresence>
  )
}

export default Thumbnail