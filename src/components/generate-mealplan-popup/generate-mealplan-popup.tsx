import { useState, ChangeEvent, FormEvent } from 'react';
import Popup from 'reactjs-popup';
import '../styling/mealplan-popup.scss'
import './generate-mealplan-popup.scss'

type FormState = {
    calories: number;
    protein: number;
    fat: number;
    carbs: number;
    days: number;
};

const GenerateMealplanPopup: React.FC = () => {
    const [formData, setFormData] = useState<FormState>({
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0,
        days: 0
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
    
    return(
        <Popup 
            trigger={<button className="button">Generate Meal Plan</button>}
            modal
            nested
            contentStyle={{
                padding: '20px',
                borderRadius: '30px',
            }}
        >
            {(close: any) => (
                <div className="modal">
                    <button className='close' onClick={close}>
                        &times;
                    </button>
                    <form onSubmit={handleSubmit} className="form-container">
                        <label htmlFor="calories">Calories</label>
                        <input className="mealplanGeneration"
                            type="number"
                            name="calories"
                            value={formData.calories}
                            onChange={handleNumberChange}
                            placeholder="Calories"
                        />
                        <label htmlFor="protein">Protein</label>
                        <input className="mealplanGeneration"
                            type="number"
                            name="protein"
                            value={formData.protein}
                            onChange={handleNumberChange}
                            placeholder="Protein"
                        />
                        <label htmlFor="carbs">Carbohydrates</label>
                        <input className="mealplanGeneration"
                            type="number"
                            name="carbs"
                            value={formData.carbs}
                            onChange={handleNumberChange}
                            placeholder="Carbohydrates"
                        />
                        <label htmlFor="fat">Fats</label>
                        <input className="mealplanGeneration"
                            type="number"
                            name="fat"
                            value={formData.fat}
                            onChange={handleNumberChange}
                            placeholder="Fat"
                        />
                        <label htmlFor="days">Days</label>
                        <input className="mealplanGeneration"
                            type="number"
                            name="days"
                            value={formData.days}
                            onChange={handleNumberChange}
                            placeholder="Days"
                        />
                        <button type="submit">Generate meal plan</button>
                    </form>
                </div>
            )}
        </Popup>
    );
}

export default GenerateMealplanPopup;