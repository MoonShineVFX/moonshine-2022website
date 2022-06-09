import React from 'react'

import Header from '../../../Components/Header'
import Newest from '../Home/Newest'
import Service from '../Home/Services'
import Home_about from '../Home/Home_about'
import Award from './Award'


//data
import newestData from './Newest.json'
import serviceData from './Services.json'


function Home() {
  const {newest} = newestData
  const {service} = serviceData
  

  return (
    <section id="home">
      <Header />
      <div className="home_container">
        <Newest data={newest}/> 
        <Service data={service}/>
        <Home_about />
        <Award />
      </div>

      
    </section>
  )
}

export default Home