import React from 'react'
import ImgHeader from '../../../Components/ImgHeader'
import Row from '../../../Components/NetflixSlider/Row'

//data
import worksData from './work.json'
function Work() {
  const {works} = worksData
  return (
    <div id="work">
      <ImgHeader imgPath={'work01.png'} />
      <main className="relative pl-4 pb-24 lg:space-y-24 lg:pl-16">
        <Row title="Trending Now" movies={works} />
      </main>
      

    </div>
  )
}

export default Work