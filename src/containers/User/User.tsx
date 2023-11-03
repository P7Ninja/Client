import React, { useState, ChangeEvent, FormEvent } from 'react';
import './User.scss';

// Define the shape of the form state
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
  // Set up state for the form inputs
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

  // Handle changes in text inputs
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // Handle changes in number inputs
  const handleNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value ? parseInt(value, 10) : 0,
    });
  };

  // Handle form submission
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formData);
    
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <input className="personalInformation"
        type="text"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        placeholder="Name"
      />
      <input className="personalInformation"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleInputChange}
        placeholder="Password"
      />
      <input className="personalInformation"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
        placeholder="Email"
      />
      <input className="personalInformation"
        type="text"
        name="city"
        value={formData.city}
        onChange={handleInputChange}
        placeholder="City"
      />
  
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
        onChange={handleNumberChange}
        placeholder="Calories"
      />
      Protein
      <input
        type="text"
        name="protein"
        value={formData.protein}
        onChange={handleNumberChange}
        placeholder="Protein (g)"
      />
      Carbohydrates
      <input
        type="number"
        name="carbs"
        value={formData.carbs}
        onChange={handleNumberChange}
        placeholder="Carbs (g)"
      />
      Fat
      <input
        type="text"
        name="fat"
        value={formData.fat}
        onChange={handleNumberChange}
        placeholder="Fat (g)"
      />
      <button type="submit">Submit</button>
    </form>
  );
};



export default User;