import React, { useState, ChangeEvent, FormEvent } from 'react';

type FormState = {
    Item: string;
    Quantity: number;
};

const Inventory = () => {
    const [formData, setFormData] = useState<FormState>({
        Item: '',
        Quantity: 0,
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
    
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(formData);
    };
    

    return <div>
        <form onSubmit={handleSubmit} className="formContainer">
        Item
        <input
            type="text"
            name="item"
            value={formData.Item}
            onChange={handleInputChange}
            placeholder="Item"
         />
         Quantity
        <input
            type="number"
            name="quantity"
            value={formData.Quantity}
            onChange={handleInputChange}
            placeholder="Quantity"
         />
         <button type="submit">Add Item</button>
        </form>
    </div>
}

export default Inventory;