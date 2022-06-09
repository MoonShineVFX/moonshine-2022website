import React from 'react'
function About() {
  return (
    <div id="Pages_about">
      <div 
        className="pageHeader" 
        style={{backgroundImage: `url(${process.env.PUBLIC_URL +'/images/intro/intro01.jpg'})`}}
      >

      </div>
    </div>
  )
}

export default About