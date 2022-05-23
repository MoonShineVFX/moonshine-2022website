import './App.scss';
import { BrowserRouter , Routes, Route} from 'react-router-dom';

import PublicPageLayout from '..//Layouts/PublicPageLayout'
import DashboardPageLayout from '../Layouts/DashboardPageLayout'


//pages
import Home from '../Pages/Front/Home/Home'
import AdminHome from '../Pages/Back/Home.js'


function App() {
  return (
    <BrowserRouter>
      <Routes> 
            <Route path="/"  element={ <PublicPageLayout/>}>
              <Route path="" element={<Home />} />

            </Route>
            
            <Route path="admin"  element={ <DashboardPageLayout/>}>
              <Route  path="" element={<AdminHome/>} />
            </Route>
            
 
          
      </Routes>
    </BrowserRouter>
  );
}

export default App;
