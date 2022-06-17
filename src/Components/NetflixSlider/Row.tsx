import React,{useRef, useState, useEffect} from 'react'
import { HiOutlineChevronRight,HiOutlineChevronLeft } from "react-icons/hi";
import Thumbnail from './Thumbnail';

//helper
import { queryByCategoryId } from '../../Helper/getfunction'

function Row({title,movies,categoryData}) {
  // console.log(categoryData)
  const rowRef = useRef<HTMLDivElement>(null);
  const [isMoved, setIsMoved] = useState(false);
  const [workData, setWorkData] = useState([]);

  const handleClick = (direction) => {
    setIsMoved(true);

    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;

      const scrollTo =
        direction === 'left'
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;
      rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };
  useEffect(()=>{
    queryByCategoryId(categoryData.id , function(res){
      setWorkData(res)
    })
  },[])

  return (
    <div className="h-40 space-y-0.5 md:space-y-2">
      <h2 className="w-56 cursor-pointer text-sm font-semibold text-[#e5e5e5] transition-colors duration-200 hover:text-white md:text-2xl">
        {title}
      </h2>
      <div className="group relative md:-ml-2">
        <HiOutlineChevronLeft
          className={`absolute top-0 bottom-0 left-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100 ${
            !isMoved && 'hidden'
          }`}
          onClick={() => handleClick('left')}
        />

        <div
          ref={rowRef}
          className="flex items-center overflow-hidden space-x-0.5  md:space-x-2.5 md:p-2"
        >
          {
            workData.length > 0 ?
            workData.map((movie) => (
              <Thumbnail key={movie.id} movie={movie} />
            )) : <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24"></svg>
          }
        </div>

        <HiOutlineChevronRight
          className="absolute top-0 bottom-0 right-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100"
          onClick={() => handleClick('right')}
        />
        <div className="absolute top-0 bottom-0 right-0 z-30 m-auto h-full w-80 cursor-pointer opacity-100 transition bg-gradient-to-l from-black pointer-events-none"></div>
      </div>
    </div>
  )
}

export default Row