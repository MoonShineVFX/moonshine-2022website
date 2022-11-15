import React,{useState} from 'react'
import ReactFullpage from '@fullpage/react-fullpage';
import ReactPageScroller from 'react-page-scroller';
//import units
import Home_mainCategory from './Home_mainCategory';
import Home_mainAbout from './Home_mainAbout';
import Home_mainService from './Home_mainService';
import Footer from '../../../Components/Footer';


function Fullpage(){
  const [currentPage, setCurrentPage] = useState("");
  const handlePageChange = (e)=>{
    console.log(e)
  }
  return(
    <React.Fragment>
      <ReactPageScroller
        animationTimer={500}
        pageOnChange={(e)=>{handlePageChange(e)}}
        containerWidth={'100%'}
      >
        <Home_mainCategory />
        <Home_mainAbout />
        <Home_mainService />
      </ReactPageScroller>
    </React.Fragment>
  )

}


export default Fullpage