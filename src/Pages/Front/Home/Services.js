import React,{useState} from 'react'
import { BsArrowRightCircle } from "react-icons/bs";
function Services({data}) {
  let [addActive, setAddActive] = useState({
    class: null,
    index: 1
  });
  const hoverOn = (e) => {
    setAddActive({
      index: parseInt(e.currentTarget.dataset.id),
      show: true
    });
  };

  const hoverOff = (e) => {
    setAddActive({
      index: parseInt(e.currentTarget.dataset.id),
      show: false
    });
  };
  return (
    <div id="Home_services">
      <div className="home_header">
        <h1>Services</h1>
        <div className="desc">Animation is what we do best, whether it's 3D or 2D <br />
photorealistic or stylized, characters or products, we breathe a soul into flat concepts. </div>
      </div>
      <div className="service_list_container">
        <div className="service_list">
          {
            data ? data.map((item)=>{
              const { id,image,title,desc} = item
              return(
                <div 
                  data-id={id}
                  key = {id}
                  className={addActive.index === id ? "service_item active" : "service_item"  }
                  style={{backgroundImage: `url(${process.env.PUBLIC_URL + '/images/service/'+image})`}}
                  onMouseOver={hoverOn}
                  onMouseOut={hoverOff}
                >
                  <div className="content">
                    <div className="title">{title}</div>
                    <div className="desc">
                      {desc}
                    </div>
                    <div className='icon_btn'>
                      <BsArrowRightCircle size={25}/>
                    </div>
                  </div>

                </div>
              )
            }) : <div>Loading</div>
          }
        </div>
      </div>

      
    </div>
  )
}

export default Services