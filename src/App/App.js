import './App.scss';
import { BrowserRouter , Routes, Route} from 'react-router-dom';

import PublicPageLayout from '..//Layouts/PublicPageLayout'
import DashboardPageLayout from '../Layouts/DashboardPageLayout'


//pages
import Home from '../Pages/Front/Home/Home'
import About from '../Pages/Front/About/About'
import Work from '../Pages/Front/Work/Work'
import Services from '../Pages/Front/Services/Services';
import Contact from '../Pages/Front/Contact/Contact'
import AdminHome from '../Pages/Back/Home.js'
import By_Category from '../Pages/Front/Work/By_Category';


function App() {
  return (
    <BrowserRouter>
      <Routes> 
            <Route path="/"  element={ <PublicPageLayout/>}>
              <Route path="" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/work" element={<Work />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/services" element={<Services />} />
              <Route path="/By_Category/:cid" element={<By_Category />} />

            </Route>
            
            <Route path="admin"  element={ <DashboardPageLayout/>}>
              <Route  path="" element={<AdminHome/>} />
            </Route>
            
 
          
      </Routes>
    </BrowserRouter>
  );
}

export default App;
