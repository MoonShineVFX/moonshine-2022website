import React from 'react'
import { Outlet} from 'react-router-dom';


import Navbar from '../Components/Navbar'
import MobileNavbar from '../Components/MobileNavbar';
import Footer from '../Components/Footer'

import NavData from '../Components/navbar.json'
import footerData from '../Components/footer.json'
import socialMediaData from '../Components/socialitemData.json'
import { RecoilRoot } from 'recoil';


function PublicPageLayout() {
  const {socialmedia} = socialMediaData
  const {navbar} =NavData
  return (
    <React.Fragment>
      <RecoilRoot>
      <Navbar data={navbar} socialmedia = {socialmedia}/>
      <MobileNavbar data={navbar} />
      <Outlet />
      <Footer footerData={footerData} socialmedia={socialmedia}/>
      </RecoilRoot>
    </React.Fragment>
  )
}

export default PublicPageLayout