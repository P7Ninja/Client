import React, { useState, ChangeEvent, FormEvent } from 'react';
import './User.scss';

type FormState = {
  name: string;
  password: string;
  email: string;
  city: string;
  useFoodWasteDiscounts: boolean;
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
};

const User = () => {
  const [formData, setFormData] = useState<FormState>({
    name: '',
    password: '',
    email: '',
    city: '',
    useFoodWasteDiscounts: false,
    calories: 0,
    protein: 0,
    fat: 0,
    carbs: 0,
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
      [name]: value ? parseInt(value, 10) : 0,
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formData);
    
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div id="input-row">
        <input className="personalInformation" id="name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Name"
        />
        <input className="personalInformation" id="password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          placeholder="Password"
        />
      </div>
      <div id="input-row">
        <input className="personalInformation" id="email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Email"
        />
        <input className="personalInformation" id="city"
          type="text"
          name="city"
          value={formData.city}
          onChange={handleInputChange}
          placeholder="City"
        />
      </div>
  
      <label>
        Use Food Waste Discounts:
        <input
          type="checkbox"
          name="useFoodWasteDiscounts"
          checked={formData.useFoodWasteDiscounts}
          onChange={handleInputChange}
        />
        <br/>
      </label>
      Calories
      <input
        type="text"
        name="calories"
        value={formData.calories}
        onChange={handleInputChange}
        placeholder="Calories"
      />
      Protein
      <input
        type="text"
        name="protein"
        value={formData.protein}
        onChange={handleInputChange}
        placeholder="Protein (g)"
      />
      Carbohydrates
      <input
        type="text"
        name="carbs"
        value={formData.carbs}
        onChange={handleInputChange}
        placeholder="Carbs (g)"
      />
      Fat
      <input
        type="text"
        name="fat"
        value={formData.fat}
        onChange={handleInputChange}
        placeholder="Fat (g)"
      />
      <button type="submit" className="submit">Submit</button>
    </form>
  );
};



export default User;