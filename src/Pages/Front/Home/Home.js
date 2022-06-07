import React from 'react'
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

      <Newest data={newest}/> 
      <Service data={service}/>
      <Home_about />
      <Award />
      
    </section>
  )
}

export default Home