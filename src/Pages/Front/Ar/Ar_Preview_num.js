import React from 'react'
import "@google/model-viewer/dist/model-viewer";
import { useParams,useNavigate,Link } from 'react-router-dom';
function Ar_Preview_num() {
  const { id } = useParams();
  console.log(id)
  return (
    <section className='ar w-full bg-white p-2 text-black relative h-[90vh]'>
      <model-viewer
          src={process.env.PUBLIC_URL+ '/assets/' +id+ '/animated_model.glb'}
          ios-src={process.env.PUBLIC_URL+ '/assets/' +id+ '/model.usdz'}
          alt="A 3D model of an People"
          camera-controls
          auto-rotate
          auto-play
          ar ar-scale="fixed"
          ar-modes="webxr scene-viewer quick-look"
          touch-action="pan-y"
          id="modelViewer"
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

export default Ar_Preview_num