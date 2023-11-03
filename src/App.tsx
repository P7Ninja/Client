import { useState } from 'react'
import Sidebar from './components/sidebar'
import { Route, Routes } from 'react-router-dom';
import { BrowserRouter as Router} from 'react-router-dom';
import User from './containers/User'
import MealPlans from './containers/MealPlans'
import Inventory from './containers/Inventory'
import Health from './containers/Health'

import './App.scss'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <Login></Login> */}
      <Router>
        <Sidebar />
        <div>
          <Routes>
            <Route path="user" element={<User />} />
            <Route path="meal_plans" element={<MealPlans />} />
            <Route path="inventory" element={<Inventory />} />
            <Route path="health" element={<Health />} />
          </Routes>
        </div>
      </Router>
    </>
  )
}

export default App

function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [mail, setMail] = useState("")
  const [gender, setGender] = useState("")
  const [birthdate, setBirthdate] = useState("1999-01-01")
  const [isCreatingUser, setIsCreatingUser] = useState(false)
  
  if (!isCreatingUser) {
    return (
      <>
        <form onSubmit={e => e.preventDefault()}>
          <h1>Log ind</h1>
          <input type='text' value={username} onChange={e => setUsername(e.target.value)} placeholder='Brugernavn'required/>
          <br/>
          <input type='password' value={password} onChange={e => setPassword(e.target.value)} placeholder='Adgangskode' required/>
          <br/>
          <button type='submit'>Log ind</button>
          <br/>
          <a onClick={() => setIsCreatingUser(true)}>Opret ny bruger</a>
        </form>
      </>
    )
  }
  else {
    return (
      <>
        <form onSubmit={e => e.preventDefault()}>
          <h1>Ny bruger</h1>
          <input type='text' value={username} onChange={e => setUsername(e.target.value)} placeholder='Brugernavn' required/>
          <br/>
          <input type='password' value={password} onChange={e => setPassword(e.target.value)} placeholder='Adgangskode' required/>
          <br/>
          <input type='email' value={mail} onChange={e => setMail(e.target.value)} placeholder='Email adresse' required/>
          <br/>
          <label>Fødselsdato</label>
          <br/>
          <input type='date' value={birthdate} onChange={e => setBirthdate(e.target.value)} required/>
          <br/>
          <input type='radio' name='gender' id='male' onClick={() => setGender("male")} required></input>
          <label htmlFor="male">Mand</label>
          <input type='radio' name='gender' id='female' onClick={() => setGender("female")} required></input>
          <label htmlFor='female'>Kvinde</label>
          <button type='submit'>Opret bruger</button>
          <br/>
          <a onClick={() => setIsCreatingUser(false)}>Tilbage til login</a>
        </form>
      </>
    )
  }
}