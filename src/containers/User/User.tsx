import { useState, ChangeEvent, useContext } from 'react';
import './User.scss';
import { UserContext } from '../../App';
import { UserSettings } from './UserSettings';
import { UserService } from '../../Services/UserService';
import { useNavigate } from 'react-router-dom';

export type FormState = {
  username: string;
  password: string;
  email: string;
  city: string;
  useFoodWasteDiscounts: boolean;
  birthdate: string,
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
  gender: string;
};

const User = () => {
  const [showLogin, setShowLogin] = useState(true);
  const context = useContext(UserContext);

  if (context.user != null) {
    return <UserSettings />
  }
  if (showLogin) {
    return <Login gotoCreateAccount={() => setShowLogin(false)} />
  }
  else {
    return <CreateAccount gotoLogin={() => setShowLogin(true)} />
  }
};

interface CreateAccountProps {
  gotoLogin: () => void,
}

function CreateAccount(props: CreateAccountProps) {
  const userservice = new UserService();
  const [msg, setMsg] = useState("");
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormState>({
    username: '',
    password: '',
    email: '',
    city: '',
    useFoodWasteDiscounts: false,
    calories: 0,
    protein: 0,
    fat: 0,
    carbs: 0,
    birthdate: "1999-01-01",
    gender: "male",
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: parseInt(value, 10),
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (page == 0) {
      setPage(1);
      return;
    }
    setLoading(true);
    const res = await userservice.CreateUser(formData);
    if (res.ok) {
      props.gotoLogin();
    }
    else {
      const details = (await res.json()).detail;
      setMsg(details);
    }
    setLoading(false);
  }

  return <>
    <h1>Sign up</h1>

    <form id='form' onSubmit={handleSubmit}>
      <div className={page != 0 ? "hidden" : "login-form"}>
        <h2 style={{ margin: "10px 0 0 0" }}>Account information</h2>
        <label>Username</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          placeholder="Username"
          required
        />
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          placeholder="Password"
          required
        />
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Email"
          required
        />
        <label>City</label>
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleInputChange}
          placeholder="City"
        />
        <div style={{ display: "flex", justifyContent: "left", gap: "20px" }}>
          Gender
          <div>
            <input
              type='radio'
              name='gender'
              id='male'
              value="male"
              onChange={handleInputChange}
              required
            />
            <label htmlFor="male"> Male</label>
          </div>
          <div>
            <input
              type='radio'
              name='gender'
              id='female'
              onChange={handleInputChange}
              value="female"
              required
            />
            <label htmlFor='female'> Female</label>
          </div>
        </div>
        <div className='input-field-container'>
          Birthday
          <input
            type="date"
            name="birthdate"
            value={formData.birthdate}
            onChange={handleInputChange}
            placeholder="Birthdate"
            required
          />
        </div>
        <label>
          <input
            type="checkbox"
            name="useFoodWasteDiscounts"
            checked={formData.useFoodWasteDiscounts}
            onChange={handleInputChange}
          />
          Use Food Waste Discounts
          <br />
        </label>
        {msg != "" && <p style={{ margin: "0 0", color: "red" }}>{msg}.</p>}
        <button type="submit">Next</button>
      </div>
      <div className={page != 1 ? "hidden" : "login-form"}>
        <a onClick={() => setPage(0)}>◀ Back</a>
        <h2 style={{ margin: "10px 0 0 0" }}>Energy targets</h2>
        <div className='input-field-container'>
          Calories
          <input
            type="number"
            name="calories"
            value={formData.calories || ''}
            onChange={handleNumberChange}
            placeholder="Calories"
            min="0"
            required={page == 1}
          />
        </div>
        <div className='input-field-container'>
          Protein
          <input
            type="number"
            name="protein"
            value={formData.protein || ''}
            onChange={handleNumberChange}
            placeholder="Protein (g)"
            min="0"
            required={page == 1}
          />
        </div>
        <div className='input-field-container'>
          Carbohydrates
          <input
            type="number"
            name="carbs"
            value={formData.carbs || ''}
            onChange={handleNumberChange}
            placeholder="Carbs (g)"
            min="0"
            required={page == 1}
          />
        </div>
        <div className='input-field-container'>
          Fat
          <input
            type="number"
            name="fat"
            value={formData.fat || ''}
            onChange={handleNumberChange}
            placeholder="Fat (g)"
            min="0"
            required={page == 1}
          />
        </div>
        {msg != "" && <p style={{ margin: "0 0", color: "red" }}>{msg}.</p>}
        <button type="submit">{loading ? "Creating account..." : "Sign up"}</button>
      </div>
      <span>Already have an account? <a onClick={props.gotoLogin}>Log in</a></span>
    </form>
  </>
}

interface LoginProps {
  gotoCreateAccount: () => void,
}

function Login(props: LoginProps) {
  const userservice = new UserService();
  const context = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    const res = await userservice.Login(username, password)
    if (res.ok) {
      context.setUser?.(await userservice.GetUser());
      navigate("/")
    }
    else {
      const details = (await res.json()).detail;
      setMsg(details);
    }
    setPassword("");
    setLoading(false);
  }


  return (
    <>
      <h1>Log in</h1>
      <form onSubmit={handleSubmit} className='login-form'>
        <label>Username</label>
        <input type='text' value={username} onChange={e => setUsername(e.target.value)} required />
        <br />
        <label>Password</label>
        <input type='password' value={password} onChange={e => setPassword(e.target.value)} required />
        <br />
        {msg != "" && <p style={{ margin: "0 0", color: "red" }}>{msg}.</p>}
        <button type='submit'>{loading ? "Logging in..." : "Log in"}</button>
        <br />
        <span>Don't have an account yet? <a onClick={props.gotoCreateAccount}>Sign up</a></span>

      </form>
    </>
  )
}


export default User;