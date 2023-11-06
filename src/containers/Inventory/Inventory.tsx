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
    

    return <div>
        <form onSubmit={handleSubmit} className="formContainer">
            Item
            <input
                type="text"
                name="Item"
                value={formData.Item}
                onChange={handleInputChange}
                placeholder="Item123"
            />
            Quantity
            <input
                type="number"
                name="Quantity"
                value={formData.Quantity}
                onChange={handleNumberChange}
                placeholder="Quantity"
            />
            <button type="submit">Add Item</button>
        </form>
    </div>
}

export default Inventory;