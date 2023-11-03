import { useState } from 'react'
import './App.css'

function App() {
  return (
    <>
      <LoginSignup></LoginSignup>
    </>
  )
}

export default App

function LoginSignup() {
  const [showSignup, setShowSignup] = useState(false)
  
  if (!showSignup) {
    return (
      <Login setShowSignup={setShowSignup}></Login>
    )
  }
  else {
    return (
      <Signup setShowSignup={setShowSignup}></Signup>
    )
  }
}

interface LoginSignupProps {
  setShowSignup: (f: boolean) => void
}

function Signup({setShowSignup: setShowSignup} : LoginSignupProps) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [mail, setMail] = useState("")
  const [gender, setGender] = useState("")
  const [birthdate, setBirthdate] = useState("1999-01-01")
  return <>
    <form onSubmit={e => e.preventDefault()}>
      <h1>Ny bruger</h1>
      <input type='text' value={username} onChange={e => setUsername(e.target.value)} placeholder='Brugernavn' required />
      <br />
      <input type='password' value={password} onChange={e => setPassword(e.target.value)} placeholder='Adgangskode' required />
      <br />
      <input type='email' value={mail} onChange={e => setMail(e.target.value)} placeholder='Email adresse' required />
      <br />
      <label>Fødselsdato</label>
      <br />
      <input type='date' value={birthdate} onChange={e => setBirthdate(e.target.value)} required />
      <br />
      <input type='radio' name='gender' id='male' onClick={() => setGender("male")} required></input>
      <label htmlFor="male">Mand</label>
      <input type='radio' name='gender' id='female' onClick={() => setGender("female")} required></input>
      <label htmlFor='female'>Kvinde</label>
      <button type='submit'>Opret bruger</button>
      <br />
      <a onClick={() => setShowSignup(false)}>Tilbage til login</a>
    </form>
  </>
}

function Login({setShowSignup: setShowSignup} : LoginSignupProps) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  return (
    <form onSubmit={e => e.preventDefault()}>
      <h1>Log ind</h1>
      <input type='text' value={username} onChange={e => setUsername(e.target.value)} placeholder='Brugernavn' required />
      <br />
      <input type='password' value={password} onChange={e => setPassword(e.target.value)} placeholder='Adgangskode' required />
      <br />
      <button type='submit'>Log ind</button>
      <br />
      <a onClick={() => setShowSignup(true)}>Opret ny bruger</a>
    </form>
  )
}
