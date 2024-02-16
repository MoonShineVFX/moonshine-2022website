import React, { useState } from 'react';
import ReactPlayer from 'react-player'
const VideoPreview = ({url}) => {

  return (
    <div>
      <div className='w-full aspect-video border-dashed border-2  flex items-center justify-center rounded-md my-2 hover:bg-slate-50 relative'>
        {
          url ? 
          <div className='  relative w-full h-full bg-black pt-[56%]  '>
            <ReactPlayer 
              url={url}
              style={{ position: 'absolute', top: '0', left: '0' }}
              width={'100%'}
              height={'100%'}
            />
          </div>
          :
          <div className=' text-gray-500 flex flex-col items-center'>
            <div className='font-bold'>video preview</div>
            <div className='text-xs'>youtube,vimeo url</div>
          </div>
        }

      </div>


    
    </div>
  );
};

export default VideoPreview;