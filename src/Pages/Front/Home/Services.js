import React from 'react'

function Services({data}) {
  return (
    <div id="Home_services">
      <div className="home_header">
        <h1>Services</h1>
        <div className="desc">Animation is what we do best, whether it's 3D or 2D <br />
photorealistic or stylized, characters or products, we breathe a soul into flat concepts. </div>
      </div>
      <div className="service_list">
        {
          data ? data.map((item)=>{
            const { id,image,title,desc} = item
            return(
              <div 
                key = {id}
                className="service_item" 
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

export default Services