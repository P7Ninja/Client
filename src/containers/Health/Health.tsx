import { useState, ChangeEvent, FormEvent  } from 'react';
import { HealthService } from '../../Services/HealthService';
import LineChart from './InteractiveGraph';

const healthService = new HealthService();


type Health = {
    dateStamp: Date;
    height: number;
    weight: number;
    fatPercentage: number;
    musclePercentage: number;
    waterPercentage: number;
};

type HealthEntry = {
    id: number;
    userID: number;
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
        height: 0,
        weight: 0,
        fatPercentage: 0,
        musclePercentage: 0,
        waterPercentage: 0,
    });

    const [id, setID] = useState<number>(0);

    const [entries, setEntries] = useState<HealthEntry[]>([]);

    const [label, setLabel] = useState<string>("height");

    const handleLabel = (event: ChangeEvent<HTMLSelectElement>) => {
        handleGetEntries();
        const { value } = event.target;
        setLabel(value);
    }
    
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: parseFloat(value),
        });
    };
    
    const handleIDChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const { value } = event.target;
        setID(parseInt(value));
    }
    
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        formData.dateStamp = new Date();
        const res = await healthService.PostHealth(formData).then((data => data));
    };

    // this needs id from a given entry instead of from an input field
    const handleDelete = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const res = await healthService.DeleteHealth(id).then((data => data));
    };

    const handleGetEntries = async () => {
        const res = await healthService.GetHealth().then((data => data));
        setTimeout(async () => {
            setEntries(res);
        });
    };

    const getChartData = () => {
        var chartData = {
            labels: getGraphDates(),
            datasets: [
              {
                label: label,
                data: getGraphValues(),
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1,
              },
            ],
          };
        return chartData;
    }

    const getGraphDates = () => {
        var dates = entries.map(i => i.dateStamp);
        return dates;
    }

    const getGraphValues = () => {
        var values: number[] = [];
        if (label == "height")
            values = entries.map(i => i.height);
        else if (label == "weight")
            values = entries.map(i => i.weight);
        else if (label == "fat")
            values = entries.map(i => i.fatPercentage);
        else if (label == "muscle")
            values = entries.map(i => i.musclePercentage);
        else if (label == "water")
            values = entries.map(i => i.waterPercentage);
        return values;
    }

  return (
    <>
        <script onLoad={() => handleGetEntries}></script>
      <h1>Health Graph</h1>

      <select onChange={(event: ChangeEvent<HTMLSelectElement>) => {handleLabel(event); getChartData()}}>
        <option value="height">Height</option>
        <option value="weight">Weight</option>
        <option value="fat">Fat</option>
        <option value="muscle">Muscle</option>
        <option value="water">Water</option>
      </select>

      <LineChart data={getChartData()} />
    
        <h1>Health</h1>
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
                <select onChange={handleIDChange}>
                    {entries.map(i => <option value={i.id}>{i.dateStamp.toLocaleString()}</option>)}
                </select>
                <button type="submit">Delete Item</button>
            </form>
    </>
  );
}

export default Health;



