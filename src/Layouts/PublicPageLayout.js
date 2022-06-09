import React from 'react'
import { Outlet} from 'react-router-dom';


import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'

import NavData from '../Components/navbar.json'
import footerData from '../Components/footer.json'
import socialMediaData from '../Components/socialitemData.json'

function PublicPageLayout() {
  const {socialmedia} = socialMediaData
  const {navbar} =NavData
  return (
    <React.Fragment>
      <Navbar data={navbar}/>
      <Outlet />
      <Footer footerData={footerData} socialmedia={socialmedia}/>
    </React.Fragment>
  )
}

export default PublicPageLayout