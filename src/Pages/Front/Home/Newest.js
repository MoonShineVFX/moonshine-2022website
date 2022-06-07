import React from 'react'

function Newest({data}) {
  return (
    <div id="Newest">
      <div className="home_header header_newwest">
        <h1>Newest</h1>
        <div className="more">More</div>

      </div>
      
      
      <div className="newest_list">
        {
          data ? data.map((item)=>{
            const { id,image,title,desc} = item
            return(
              <div 
                key = {id}
                className="newest_item" 
                style={{backgroundImage: `url(${process.env.PUBLIC_URL + '/images/work/w01.png'})`}}
              >
                <div className="title">ASUS ROG Brand Video 5</div>
              </div>
            )
          }) : <div>Loading</div>
        }

      
      </div>
    </div>
  )
}

export default Newest