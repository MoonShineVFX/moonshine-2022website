import React from 'react'
import {Outlet} from 'react-router-dom';
function DashboardPageLayout() {
  return (
    <div>
      <h1>dasboard</h1>
      <Outlet />
    </div>
  )
}

export default DashboardPageLayout