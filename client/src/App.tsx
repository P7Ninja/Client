import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
      <Login></Login>
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