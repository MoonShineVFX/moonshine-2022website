import React from 'react'
import { useRecoilValue } from 'recoil';
import { modalState, movieState } from '../../../atoms/modalAtom';
import { Movie } from '../../../types';
import ImgHeader from '../../../Components/ImgHeader'
import Row from '../../../Components/NetflixSlider/Row'
import Modal from '../../../Components/NetflixSlider/Modal';


//data
import worksData from './work.json'
function Work() {
  const {works} = worksData
  const showModal = useRecoilValue(modalState);
  return (
    <div id="work">
      <ImgHeader imgPath={'work01.png'} />
      <main className="relative pl-4 pb-24 lg:space-y-24 lg:pl-16 -mt-20 z-10">
        <Row title="Trending Now" movies={works} />
        <Row title="Animation" movies={works} />
        <Row title="VFX" movies={works} />
        <Row title="Product" movies={works} />
        <Row title="Motion Design" movies={works} />
        <Row title="New Media" movies={works} />
        <Row title="Virtual Production" movies={works} />
      </main>
      
      {showModal && <Modal />}
    </div>
  )
}

export default Work