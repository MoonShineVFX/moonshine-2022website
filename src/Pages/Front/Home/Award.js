import React from 'react'

function Award() {
  return (
    <div id="award">
      <div className="home_header center">
        <h1>Award</h1>
      </div>
      <ul className="award_list">
        <li>
          <img src={process.env.PUBLIC_URL + '/images/award/a01.png'} alt="" />
        </li>
        <li>
          <img src={process.env.PUBLIC_URL + '/images/award/a01.png'} alt="" />
        </li>
        <li>
          <img src={process.env.PUBLIC_URL + '/images/award/a01.png'} alt="" />
        </li>
        <li>
          <img src={process.env.PUBLIC_URL + '/images/award/a01.png'} alt="" />
        </li>
        <li>
          <img src={process.env.PUBLIC_URL + '/images/award/a01.png'} alt="" />
        </li>
      </ul>
    </div>
  )
}

export default Award