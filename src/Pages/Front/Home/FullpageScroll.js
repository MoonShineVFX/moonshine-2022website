import React,{useState} from 'react'
import ReactFullpage from '@fullpage/react-fullpage';
//import units
import Home_mainCategory from './Home_mainCategory';
import Home_mainAbout from './Home_mainAbout';
import Home_mainService from './Home_mainService';
import Footer from '../../../Components/Footer';


function FullpageScroll(){
  const [currentPage, setCurrentPage] = useState("");

  return(
    <ReactFullpage
      //fullpage options
      licenseKey = {'VKGDI-QLS3J-S8IPJ-NAEY6-JXCCJ'}
      navigation
      scrollingSpeed = {1000} /* Options here */

      render={({ state, fullpageApi }) => {
        return (
          <ReactFullpage.Wrapper>
            <div className="section">
              <Home_mainCategory />
            </div>
            <div className="section">
              <Home_mainAbout />
            </div>
            <div className="section">
              <Home_mainService />
            </div>
          </ReactFullpage.Wrapper>
        );
      }}
    />
  )

}


export default FullpageScroll