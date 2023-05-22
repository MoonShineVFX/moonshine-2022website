import React from 'react'
import "@google/model-viewer/dist/model-viewer";
function Ar_Preview_6701() {
  return (
    <section className='ar w-full bg-white p-5 text-black relative h-[90vh]'>
      <model-viewer
          src={process.env.PUBLIC_URL+ '/assets/6701/6701.glb'}
          ios-src={process.env.PUBLIC_URL+ '/assets/6701/6701.usdz'}
          alt="A 3D model of an People"
          camera-controls
          auto-rotate
          auto-play
          ar ar-scale="fixed"
          ar-modes="webxr scene-viewer quick-look"
          touch-action="pan-y"

          xr-environment
          
        >
          <button slot="ar-button" id="ar-button" >
            AR mode
          </button>

          <div id="ar-prompt">
            <img src="https://modelviewer.dev/shared-assets/icons/hand.png"/>
      </div>
        </model-viewer>
    </section>


  )
}

export default Ar_Preview_6701