import React from 'react'
import { useRecoilState } from 'recoil';
import { modalState, movieState } from '../../atoms/modalAtom';
import { Movie } from '../../types';
function Thumbnail({movie}) {
  const [showModal, setShowModal] = useRecoilState(modalState);
  const [currentMovie, setCurrentMovie] = useRecoilState(movieState);
  return (
    <div
      className="relative h-28 min-w-[180px] cursor-pointer transition-transform duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105"
      onClick={() => {
        setShowModal(true);
        setCurrentMovie(movie);
      }}
    >
      <img
        src={process.env.PUBLIC_URL + '/images/work/'+ movie.image} 
        layout="fill"
        className="rounded-sm object-cover md:rounded saturate-80"
        alt={'movie.name'}
      />
    </div>
  )
}

export default Thumbnail