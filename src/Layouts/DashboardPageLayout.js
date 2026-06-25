import React from 'react'
import {Outlet} from 'react-router-dom';
import AdminNavbar from '../Pages/Back/Components/AdminNavbar';
import { RecoilRoot } from 'recoil';
function DashboardPageLayout() {
  return (
    <RecoilRoot>
      <div className='flex min-h-screen w-full bg-gray-50'>
        <AdminNavbar />
        <main className='flex-1 min-h-screen bg-white'>
          <Outlet />
        </main>
      </div>
    </RecoilRoot>
  )
}

export default DashboardPageLayout