import React,{ useEffect, useState } from 'react'
import { HiOutlineX ,HiVolumeUp ,HiVolumeOff} from "react-icons/hi";
import MuiModal from '@mui/material/Modal';
import ReactPlayer from 'react-player';
import { useRecoilState, useRecoilValue } from 'recoil';
import { modalState, movieState } from '../../atoms/modalAtom';
import { Element, Genre, Movie } from '../../types';
function Modal() {
  const [showModal, setShowModal] = useRecoilState(modalState);
  const [trailer, setTrailer] = useState<string | null>(null);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [muted, setMuted] = useState<boolean>(false);
  const [addedToList, setAddedToList] = useState<boolean>(false);
  const [moviesInList, setMoviesInList] = useState< Movie[]>(
    []
  );
  const movie = useRecoilValue(movieState);
  const handleClose = () => {
    setShowModal(false);
  };
  return (
    <MuiModal
      open={showModal}
      onClose={handleClose}
      className="fixed !top-7 left-0 right-0 z-50 mx-auto w-full max-w-5xl overflow-hidden  rounded-md scrollbar-hide"
    >
      <>
        <button
            onClick={handleClose}
            className="modalButton absolute right-5 top-5 z-40 h-9 w-9 border-none bg-[#181818] hover:bg-[#181818]"
          >
          <HiOutlineX className="h-6 w-6" />
        </button>
        <div className="relative aspect-video">
          <ReactPlayer
            url={`https://vimeo.com/719047386`}
            width="100%"
            height="100%"
            style={{ position: 'absolute', top: '0', left: '0' }}
            playing
            controls
          />
          <div className="absolute bottom-10 flex w-full items-center justify-between px-10">
            
          </div>
        </div>
        <div className="flex space-x-16 rounded-b-md bg-[#181818] px-10 py-8">
          <div className="space-y-6 text-lg">
            <div className="flex items-center space-x-2 text-sm">
              <p className="font-semibold text-green-400">
                {movie?.vote_average * 10}% Match
              </p>
              <p className="font-light">
                {movie?.release_date || movie?.first_air_date}
              </p>
              <div className="flex h-4 items-center justify-center rounded border border-white/40 px-1.5 text-xs">
                HD
              </div>
            </div>

            <div className="flex flex-col gap-x-10 gap-y-4 font-light md:flex-row">
              <p className="w-5/6">{movie?.overview}</p>
              <div className="flex flex-col space-y-3 text-sm">
                <div>
                  <span className="text-[gray]">Genres: </span>
                  {genres.map((genre) => genre.name).join(', ')}
                </div>
                <div>
                  <span className="text-[gray]">Original language: </span>
                  {movie?.original_language}
                </div>

                <div>
                  <span className="text-[gray]">Total votes: </span>
                  {movie?.vote_count}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </MuiModal>
  )
}

export default Modal