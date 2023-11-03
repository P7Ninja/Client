import React, { useState, ChangeEvent, FormEvent } from 'react';

type FormState = {
    Weight: number;
    Date: string;
};

const Health = () => {
    const [formData, setFormData] = useState<FormState>({
        Weight: 0,
        Date: '',
    });
    
    const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value, // value is a string in the format "YYYY-MM-DD"
        });
    };
    
    
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(formData);
    };
    

    return <div>
        <form onSubmit={handleSubmit} className="formContainer">
        Weight
        <input
            type="text"
            name="Weight"
            value={formData.Weight}
            onChange={handleInputChange}
            placeholder="kg"
        />
        Date
        <input
            type="date"
            name="Date"
            value={formData.Date}
            onChange={handleDateChange}
         />
         <button type="submit">Add Item</button>
        </form>
    </div>
}

export default Health;