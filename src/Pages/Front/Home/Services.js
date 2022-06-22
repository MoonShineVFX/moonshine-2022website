import React,{useState} from 'react'
import { BsArrowRightCircle } from "react-icons/bs";
import { Link   } from "react-router-dom";
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
              const { id,image,title,desc,params_name} = item
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
                    <div className="mt-3 hover:translate-x-2.5 transition">
                      <Link to={`services?q=${params_name}`}>
                        <BsArrowRightCircle size={25}/>
                      </Link>
                    </div>

                  </div>

                </div>
              )
            }) : <svg className="animate-spin h-5 w-5 mr-3 fill-white" width="16px" height="16px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path fill-rule="evenodd" clip-rule="evenodd" d="M13.917 7A6.002 6.002 0 0 0 2.083 7H1.071a7.002 7.002 0 0 1 13.858 0h-1.012z"/></svg>
          }
        </div>
      </div>

      
    </div>
  )
}

export default Services