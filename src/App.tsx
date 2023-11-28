import Sidebar from './components/Sidebar/sidebar'
import { Route, Routes } from 'react-router-dom';
import { BrowserRouter as Router} from 'react-router-dom';

import User from './containers/User/User'
import MealPlans from './containers/MealPlans/MealPlans'
import Health from './containers/Health/Health'
import Inventory from './containers/Inventory/Inventory';

import './App.scss'
import { useState, createContext, useEffect } from 'react';
import { CreateUserForm, Targets, UserService, UserInfo } from './Services/UserService';
import React from 'react';


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
            <Login />
            <Routes>
              <Route path="user" element={<User />} />
              <Route path="mealplans" element={<MealPlans />} />
              <Route path="inventory" element={<Inventory />} />
              <Route path="health" element={<Health />} />
              <Route path="login" element={<Login />} />
            </Routes>
          </div>
        </Router>
      </UserContext.Provider>
    </>
  )
}


export default App

function Login() {
  const userservice = new UserService();
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [mail, setMail] = useState("")
  const [gender, setGender] = useState("")
  const [birthdate, setBirthdate] = useState("1999-01-01")
  const [isCreatingUser, setIsCreatingUser] = useState(false)
  const [status, setStatus] = useState("")
  const [loading, setLoading] = useState(false)
  const context = React.useContext(UserContext)
  
  const handleNewUserSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    const targetEnergy: Targets = {calories: 2000, fat: 60, carbohydrates: 60, protein: 60};
    const form: CreateUserForm = {username: username, email: mail, birthday: birthdate, gender: gender, password: password, target_energy: targetEnergy};
    const res = await userservice.CreateUser(form);
    if (res.ok) {
      setStatus("User created!");
      setIsCreatingUser(false);
      reset();
    }
    else {
      const details = (await res.json()).detail;
      setStatus(`Error: ${details}`);
    }
    setLoading(false);
  }

  const reset = () => {
    setUsername(""); setPassword(""); setBirthdate("1999-01-01"); setMail(""); setGender("");
  }

  const signout = () => {
    userservice.SignOut();
    context.setUser?.(null);
  }

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    const res = await userservice.Login(username, password)
    if (res.ok) {
      context.setUser?.(await userservice.GetUser());
    }
    else {
      const details = (await res.json()).detail;
      setStatus(details);
    }
    reset();
    setLoading(false);
  }

  if (context.user != null) {
    return <>
      <p>Logged in as {context.user.username}</p>
      <button onClick={signout}>Signout</button>
    </>
  }

  if (!isCreatingUser) {
    return (
      <>
        <form onSubmit={handleLoginSubmit}>
          <h1>Login</h1>
          <input type='text' value={username} onChange={e => setUsername(e.target.value)} placeholder='Username'required/>
          <br/>
          <input type='password' value={password} onChange={e => setPassword(e.target.value)} placeholder='Password' required/>
          <br/>
          <p>{status}</p>
          <button type='submit'>{!loading ? "Login" : "Logging in..."}</button>
          <br/>
          <a onClick={() => setIsCreatingUser(true)}>Sign up</a>
        </form>
      </>
    )
  }
  else {
    return (
      <>
        <form onSubmit={handleNewUserSubmit}>
          <h1>Sign up</h1>
          <input type='text' value={username} onChange={e => setUsername(e.target.value)} placeholder='Username' required/>
          <br/>
          <input type='password' value={password} onChange={e => setPassword(e.target.value)} placeholder='Password' required/>
          <br/>
          <input type='email' value={mail} onChange={e => setMail(e.target.value)} placeholder='Email' required/>
          <br/>
          <label>Birthday</label>
          <br/>
          <input type='date' value={birthdate} onChange={e => setBirthdate(e.target.value)} required/>
          <br/>
          <input type='radio' name='gender' id='male' onClick={() => setGender("male")} required></input>
          <label htmlFor="male">Male</label>
          <input type='radio' name='gender' id='female' onClick={() => setGender("female")} required></input>
          <label htmlFor='female'>Female</label>
          <p>{status}</p>
          <button type='submit'>{!loading ? "Signup" : "Creating user..."}</button>
          <br/>
          <a onClick={() => setIsCreatingUser(false)}>Login</a>
        </form>
      </>
    )
  }
}
