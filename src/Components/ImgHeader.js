import React from 'react'

function ImgHeader({imgPath,button}) {
  return (
    <div id="img_header">
      <div className="img-wrapper">
        {/* <iframe src="https://player.vimeo.com/video/706129402?background=1&autoplay=1&loop=1&byline=0&title=0"
                frameBorder="0" allowFullScreen></iframe> */}

        <div className="imgbg" 
        style={{backgroundImage: `url(${process.env.PUBLIC_URL + '/images/work/' + imgPath})`}}>
          
        </div>
        {button && <div className='inline-flex items-center justify-center h-12 px-10 py-0 text-xl font-semibold text-center text-gray-200 no-underline align-middle transition-all duration-300 ease-in-out bg-transparent border-2 border-gray-600 border-solid rounded-full cursor-pointer select-none hover:text-white hover:border-white focus:shadow-xs focus:no-underline absolute z-40 top-2/4 left-1/2 -translate-x-1/2'> {button}</div> }
        
        
        
        
      </div>

    
    </div>
  )
}

export default ImgHeader