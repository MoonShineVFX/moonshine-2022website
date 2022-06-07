import React from 'react'

function Footer({footerData,socialmedia}) {
  const {footer} = footerData
  return (
    <div className="footer">
      <div className="companyInfo">
        <p>{footer.tel}</p>
        <p>{footer.email }</p>
        <p>{footer.address}</p>
      </div>
      <div className="logos">
        {socialmedia.length >0 ? 
            socialmedia.map((item,index)=>{
              const {id ,image , link} = item
              return(
              
                    <div key={id} className="social">
                      <a href={link} target="_blank" rel="noreferrer">
                        <img src={process.env.PUBLIC_URL+ '/images/socialicon/' + image} alt="" />
                      </a> 
                    </div>
                
              )
            }) : <div></div>
        }
        <div className="mslogo"><img src={process.env.PUBLIC_URL + '/images/logo.png'} alt=""/></div>
      </div>
      <div className="copyright">{footer.copyright}</div> 
    </div>  
  )
}

export default Footer