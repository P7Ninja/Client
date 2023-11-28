import { useState, ChangeEvent, FormEvent } from 'react';
import { HealthService } from './HealthAPI';

const healthService = new HealthService();


type Health = {
    dateStamp: Date;
    height: number;
    weight: number;
    fatPercentage: number;
    musclePercentage: number;
    waterPercentage: number;
};

const Health = () => {
    const [formData, setFormData] = useState<Health>({
        dateStamp: new Date(),
        height: 1,
        weight: 0,
        fatPercentage: 0,
        musclePercentage: 0,
        waterPercentage: 0,
    });

    const [id, setID] = useState<number>(0);

    const [entries] = useState<Health[]>([{dateStamp: new Date(), height: 0, weight: 0, fatPercentage: 0, musclePercentage: 0, waterPercentage: 0}]);


    // const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    //     const { name, value } = event.target;
    //     setFormData({
    //         ...formData,
    //         [name]: new Date(value).toISOString(), // value is a string in the format "YYYY-MM-DD"
    //     });
    // };
    
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: parseFloat(value),
        });
    };
    
    const handleIDChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setID(parseInt(value));
    }
    
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        formData.dateStamp = new Date();
        const res = await healthService.PostHealth(formData).then((data => data));
        console.log(res);

        // insert post request here
    };

    // this needs id from a given entry instead of from an input field
    const handleDelete = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("Deleting entry with id: " + id);
        
        const res = await healthService.DeleteHealth(id).then((data => data));
        console.log(res);

        // insert delete request here
    };

    const handleGetEntries = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const res = await healthService.GetHealth().then((data => data));
        
        console.log(res)
        setTimeout(async () => {
            res.forEach(i => entries.push(i));
        });
        
        
    };
    

    return <>
    <h1>Health</h1>
        <form onSubmit={handleGetEntries} className="form-container">
            <h2>Get All Entries</h2>
            <button type="submit">Get Entries</button>
            <br/>
            <tbody>
                {entries.map((entry) => (
                    <tr key={entry.dateStamp.toLocaleString()}>

                        <td>{entry.dateStamp.toLocaleString()}</td>
                        <td>{entry.height}</td>
                        <td>{entry.weight}</td>
                        <td>{entry.fatPercentage}</td>
                        <td>{entry.musclePercentage}</td>
                        <td>{entry.waterPercentage}</td>
                    </tr>
                ))}
            </tbody>
        </form>
        <form onSubmit={handleSubmit} className="form-container">
        <h2>Add Entry</h2>
        <label htmlFor="height">height</label>
        <input
            type="number"
            name="height"
            value={formData.height}
            onChange={handleInputChange}
            placeholder="cm"
            />
        <label htmlFor="weight">weight</label>
        <input
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleInputChange}
            placeholder="kg"
            />
        <label htmlFor="fatPercentage">Fat Percentage</label>
        <input
            type="number"
            name="fatPercentage"
            value={formData.fatPercentage}
            onChange={handleInputChange}
            placeholder="%"
            />
        <label htmlFor="musclePercentage">Muscle Percentage</label>
        <input
            type="number"
            name="musclePercentage"
            value={formData.musclePercentage}
            onChange={handleInputChange}
            placeholder="%"
            />
        <label htmlFor="waterPercentage">Water Percentage</label>
        <input
            type="number"
            name="waterPercentage"
            value={formData.waterPercentage}
            onChange={handleInputChange}
            placeholder="%"
            />
         <button type="submit">Add Item</button>
        </form>
        <form onSubmit={handleDelete} className="form-container">
            <h2>Delete Entry</h2>
            <label htmlFor="id">ID</label>
            <input
                type="number"
                name="id"
                value={id}
                onChange={handleIDChange}
                placeholder="ID"
                />
            <button type="submit">Delete Item</button>
        </form>
        
    
    </>;;
}

export default Health;



