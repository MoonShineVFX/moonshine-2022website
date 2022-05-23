import React from 'react'
import { Outlet} from 'react-router-dom';

import Header from '../Components/Header'
import Navbar from '../Components/Navbar'

function PublicPageLayout() {
  return (
    <React.Fragment>
      <Header/>
      <Navbar/>
      <Outlet />
    </React.Fragment>
  )
}

export default PublicPageLayout