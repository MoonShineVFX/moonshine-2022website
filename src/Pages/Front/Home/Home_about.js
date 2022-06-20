import React from 'react'
import { Link   } from "react-router-dom";
function Home_about() {
  return (
    <div id="home_about">
      <div className="home_about_container">
        <div className="content">
          <div className="title">
            About
          </div>
          <div className="desc">
            Animation is what we do best, whether it's 3D or 2D, 
photorealistic or stylized, characters or products, we breathe a soul into flat concepts. 
          </div>
          <div className="mt-3 hover:text-white text-gray-400 transition text-xs">
            <Link to='about'>
              More
            </Link>
          </div>
        </div>
        <div className="image_cover" style={{backgroundImage: `url(${process.env.PUBLIC_URL + '/images/about/a01.png'})`}}>

        </div>
      </div>
    </div>
  )
}

export default Home_about