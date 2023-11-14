import Sidebar from './components/Sidebar/sidebar'
import { Route, Routes } from 'react-router-dom';
import { BrowserRouter as Router} from 'react-router-dom';
import Login from './containers/Login/Login'
import User from './containers/User/User'
import MealPlans from './containers/MealPlans/MealPlans'
import Health from './containers/Health/Health'
import Inventory from './containers/Inventory/Inventory';

import './App.scss'

function App() {
  return (
    <>
      <Router>
        <Login />
        {/* <Sidebar />
        <div className='container'>
          <Routes>
            <Route path="user" element={<User />} />
            <Route path="mealplans" element={<MealPlans />} />
            <Route path="inventory" element={<Inventory />} />
            <Route path="health" element={<Health />} />
          </Routes>
        </div> */}
      </Router>
    </>
  )
}

export default App