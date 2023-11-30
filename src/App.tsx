import Sidebar from './components/Sidebar/sidebar'
import { Route, Routes } from 'react-router-dom';
import { BrowserRouter as Router} from 'react-router-dom';

import User from './containers/User/User'
import MealPlans from './containers/MealPlans/MealPlans'
import Health from './containers/Health/Health'
import Inventory from './containers/Inventory/Inventory';

import './App.scss'
import { useState, createContext, useEffect } from 'react';
import { UserService, UserInfo } from './Services/UserService';


export type UserContextValue = {
  user: UserInfo | null,
  setUser: ((user: UserInfo | null) => void) | null,
}
export const UserContext = createContext<UserContextValue>({user: null, setUser: null});

function App() {
  const [user, setUser] = useState<UserInfo | null>(null);
  useEffect(() => {
    const getUser = async () => {
      const u = await new UserService().GetUser();
      setUser(u);
    }
    getUser();
  }, []);
  
  return (
    <>
      <UserContext.Provider value={{user, setUser}}>
          <Router>
            <Sidebar />
            <div className='container'>
              {user == null && (
                <User />
              )}
              {user != null && (
                <Routes>
                  <Route path="user" element={<User />} />
                  <Route path="mealplans" element={<MealPlans />} />
                  <Route path="/" element={<MealPlans />} />
                  <Route path="inventory" element={<Inventory />} />
                  <Route path="health" element={<Health />} />
                </Routes>
              )}
            </div>
          </Router>
      </UserContext.Provider>
    </>
  )
}


export default App