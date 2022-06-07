import React from 'react'
import { Outlet} from 'react-router-dom';

import Header from '../Components/Header'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import footerData from '../Components/footer.json'
import socialMediaData from '../Components/socialitemData.json'

function PublicPageLayout() {
  const {socialmedia} = socialMediaData
  return (
    <React.Fragment>
      <Header/>
      <Navbar/>
      <Outlet />
      <Footer footerData={footerData} socialmedia={socialmedia}/>
    </React.Fragment>
  )
}

export default PublicPageLayout