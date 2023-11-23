import { useState, ChangeEvent, FormEvent } from 'react';

type FormState = {
    Date: string;
    Height: number;
    Weight: number;
    FatPercentage: number;
    MusclePercentage: number;
    WaterPercentage: number;
};

const Health = () => {
    const [formData, setFormData] = useState<FormState>({
        Date: '',
        Height: 0,
        Weight: 0,
        FatPercentage: 0,
        MusclePercentage: 0,
        WaterPercentage: 0,
    });

    const [id, setID] = useState<number>(0);

    const [lastEntry, setGetLastEntry] = useState<FormState>({
        Date: 'test',
        Height: 0,
        Weight: 0,
        FatPercentage: 0,
        MusclePercentage: 0,
        WaterPercentage: 0,
    });

    var [entries, setGetEntries] = useState<FormState[]>([{Date: 'test', Height: 0, Weight: 0, FatPercentage: 0, MusclePercentage: 0, WaterPercentage: 0}]);
    
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
            [name]: parseFloat(value),
        });
    };
    
    const handleIDChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setID(parseInt(value));
    }
    
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(formData);

        // insert post request here
    };

    // this needs id from a given entry instead of from an input field
    const handleDelete = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("Deleting entry with id: " + id);
        
        // insert delete request here
    };
 
    const handleGetLastEntry = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        console.log("Getting last entry");
        
        // replace below with get request
        lastEntry.Date = "tests";
        lastEntry.Height = 1;
        lastEntry.Weight = 2;
        lastEntry.FatPercentage = 3;
        lastEntry.MusclePercentage = 4;
        lastEntry.WaterPercentage = 5;
        // end of replace

        setGetLastEntry(lastEntry);
        document.getElementById("Date")!.innerHTML = "Date: " + lastEntry.Date;
        document.getElementById("Height")!.innerHTML = "Height: " + lastEntry.Height;
        document.getElementById("Weight")!.innerHTML = "Weight: " + lastEntry.Weight;
        document.getElementById("FatPercentage")!.innerHTML = "Fat Percentage: " + lastEntry.FatPercentage;
        document.getElementById("MusclePercentage")!.innerHTML = "Muscle Percentage: " + lastEntry.MusclePercentage;
        document.getElementById("WaterPercentage")!.innerHTML = "Water Percentage: " + lastEntry.WaterPercentage;          
    };

    const handleGetEntries = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        

        // replace below with get request
        entries = [//{Date: 'test', Height: 0, Weight: 0, FatPercentage: 0, MusclePercentage: 0, WaterPercentage: 0},
                   {Date: 'test2', Height: 1, Weight: 1, FatPercentage: 1, MusclePercentage: 1, WaterPercentage: 1},
                   {Date: 'test3', Height: 2, Weight: 2, FatPercentage: 2, MusclePercentage: 2, WaterPercentage: 2}];
        // end of replace

        setGetEntries(entries);
        
    };
    

    return <>
    <h1>Health</h1>
        <form onSubmit={handleSubmit} className="formContainer">
        <label htmlFor="Date">Date</label>
        <input
            type="date"
            name="Date"
            value={formData.Date}
            onChange={handleDateChange}
         />
        <label htmlFor="Height">Height</label>
        <input
            type="number"
            name="Height"
            value={formData.Height}
            onChange={handleInputChange}
            placeholder="cm"
            />
        <label htmlFor="Weight">Weight</label>
        <input
            type="number"
            name="Weight"
            value={formData.Weight}
            onChange={handleInputChange}
            placeholder="kg"
            />
        <label htmlFor="FatPercentage">Fat Percentage</label>
        <input
            type="number"
            name="FatPercentage"
            value={formData.FatPercentage}
            onChange={handleInputChange}
            placeholder="%"
            />
        <label htmlFor="MusclePercentage">Muscle Percentage</label>
        <input
            type="number"
            name="MusclePercentage"
            value={formData.MusclePercentage}
            onChange={handleInputChange}
            placeholder="%"
            />
        <label htmlFor="WaterPercentage">Water Percentage</label>
        <input
            type="number"
            name="WaterPercentage"
            value={formData.WaterPercentage}
            onChange={handleInputChange}
            placeholder="%"
            />
         <button type="submit">Add Item</button>
        </form>
        <form onSubmit={handleDelete} className="formContainer">
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
        <form onSubmit={handleGetLastEntry} className="formContainer">
            <button type="submit">Get Last Entry</button>
            <br/>
            <form className="formContainer">
                <p id="Date">Date: {lastEntry.Date}</p>
                <p id="Height">Height: {lastEntry.Height}</p>
                <p id="Weight">Weight: {lastEntry.Weight}</p>
                <p id="FatPercentage">Fat Percentage: {lastEntry.FatPercentage}</p>
                <p id="MusclePercentage">Muscle Percentage: {lastEntry.MusclePercentage}</p>
                <p id="WaterPercentage">Water Percentage: {lastEntry.WaterPercentage}</p>
            </form>
        </form>
        <form onSubmit={handleGetEntries} className="formContainer">
            <button type="submit">Get Entries</button>
            <br/>
            <tbody>
                {entries.map((entry) => (
                    <tr key={entry.Date}>
                        <td>{entry.Date}</td>
                        <td>{entry.Height}</td>
                        <td>{entry.Weight}</td>
                        <td>{entry.FatPercentage}</td>
                        <td>{entry.MusclePercentage}</td>
                        <td>{entry.WaterPercentage}</td>
                    </tr>
                ))}
            </tbody>
        </form>
    </>
}

export default Health;