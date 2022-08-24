import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import './App.scss';
import { BrowserRouter , Routes, Route} from 'react-router-dom';
import PublicPageLayout from '../Layouts/PublicPageLayout'
import DashboardPageLayout from '../Layouts/DashboardPageLayout'
import { AuthProvider } from "../Components/Auth";
import PublicRoutes from '../Routes/PublicRoutes'
import ProtectedRoutes from '../Routes/ProtectedRoutes'
//login
import Login from '../Components/Login'
//pages
import Home from '../Pages/Front/Home/Home'
import About from '../Pages/Front/About/About'
import Work from '../Pages/Front/Work/Work'
import DefaultWork from '../Pages/Front/DefaultWork/DefaultWork';
import Services from '../Pages/Front/Services/Services';
import Contact from '../Pages/Front/Contact/Contact'
import By_Category from '../Pages/Front/Work/By_Category';
//Back Pages
import AdminHome from '../Pages/Back/Home.js'
import AdminCateogry from '../Pages/Back/Category'
import AdminAward from '../Pages/Back/Award'
import AdminServices from '../Pages/Back/Services'
import AdminAbout from '../Pages/Back/About'
import AminContact from '../Pages/Back/Contact'
import AdminHeader from '../Pages/Back/AdminHeader'



function App() {
  useEffect(() => {
    setTimeout(function() {
        AOS.init({
          
        });
    }, 100);
    // AOS.refresh()
  }, []);
  return (
    <AuthProvider>
    <BrowserRouter>
      <Routes> 
            <Route path="/"  element={ <PublicPageLayout/>}>
              <Route path="" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/work" element={<DefaultWork />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/services" element={<Services />} />
              <Route path="/By_Category/:cid" element={<By_Category />} />

            </Route>
            
            <Route path="admin"  element={ <ProtectedRoutes/>}>
              <Route  path="" element={<AdminHome/>} />
              <Route  path="category" element={<AdminCateogry/>} />
              <Route  path="award" element={<AdminAward/>} />
              <Route  path="service" element={<AdminServices/>} />
              <Route  path="about" element={<AdminAbout/>} />
              <Route  path="contact" element={<AminContact/>} />
              <Route  path="headers" element={<AdminHeader/>} />
            </Route> 

            <Route path="login" element={<PublicRoutes />}>
              <Route path="/login" element={<Login />} />
            </Route>
            
 
          
      </Routes>
    </BrowserRouter>
    </AuthProvider>

  );
}

export default App;
