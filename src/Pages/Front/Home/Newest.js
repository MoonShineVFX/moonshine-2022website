import React from 'react'

function Newest() {
  return (
    <div id="Newest">
      Newest
      <div className="newest_list">
        <div 
          className="newest_item" 
          style={{backgroundImage: `url(${process.env.PUBLIC_URL + '/images/work/w01.png'})`}}
        >
          <div className="title">ASUS ROG Brand Video 5</div>
        </div>
        <div 
          className="newest_item" 
          style={{backgroundImage: `url(${process.env.PUBLIC_URL + '/images/work/w01.png'})`}}
        >
          <div className="title">ASUS ROG Brand Video 5</div>
        </div>
        <div 
          className="newest_item" 
          style={{backgroundImage: `url(${process.env.PUBLIC_URL + '/images/work/w01.png'})`}}
        >
          <div className="title">ASUS ROG Brand Video 5</div>
        </div>
        <div 
          className="newest_item" 
          style={{backgroundImage: `url(${process.env.PUBLIC_URL + '/images/work/w01.png'})`}}
        >
          <div className="title">ASUS ROG Brand Video 5</div>
        </div>
        <div 
          className="newest_item" 
          style={{backgroundImage: `url(${process.env.PUBLIC_URL + '/images/work/w01.png'})`}}
        >
          <div className="title">ASUS ROG Brand Video 5</div>
        </div>
      </div>
    </div>
  )
}

export default Newest