import React from 'react'
import { Link } from "react-router-dom";
import { auth } from '../../../firebaseConfig/fireauth';
import { signOut } from "firebase/auth";

function AdminNavbar() {
  return (
    <aside className="w-64 shrink-0" aria-label="Sidebar">
      <div className="fixed flex flex-col h-screen w-64 overflow-y-auto py-4 px-3 bg-gray-50 dark:bg-gray-800">
        <ul className="space-y-2 flex-1">
          <li>
            <Link to="/admin" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
              <svg className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg>
              <span className="ml-3">作品管理</span>
            </Link>
          </li>
          <li>
            <Link to='/admin/category' className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
              <svg className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
              <span className="flex-1 ml-3 whitespace-nowrap">首頁分類影片</span>
            </Link>
          </li>
          <li>
            <Link to='/admin/service' className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
              Services Page
            </Link>
          </li>
          <li>
            <Link to='/admin/award' className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
              Award (Home)
            </Link>
          </li>
          <li>
            <hr className="my-2 border-gray-200" />
          </li>
          <li>
            <Link to='/admin/headers' className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
              Header 圖影
            </Link>
          </li>
        </ul>

        <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-600">
          <button
            type="button"
            onClick={() => signOut(auth)}
            className="w-full rounded-lg px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white transition"
          >
            登出
          </button>
        </div>
      </div>
    </aside>
  )
}

export default AdminNavbar
