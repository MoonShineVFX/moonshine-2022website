import React from 'react'

function ImgHeader({imgPath}) {
  return (
    <div id="img_header">
      <div className="img-wrapper">
        {/* <iframe src="https://player.vimeo.com/video/706129402?background=1&autoplay=1&loop=1&byline=0&title=0"
                frameBorder="0" allowFullScreen></iframe> */}
        <div className="imgbg" 
        style={{backgroundImage: `url(${process.env.PUBLIC_URL + '/images/work/' + imgPath})`}}>
          
        </div>
      </div>

    
    </div>
  )
}

export default ImgHeader