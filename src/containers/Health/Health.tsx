import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { HealthService } from '../../Services/HealthService';
import { Chart } from 'react-google-charts';

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

  const [chartVisible, setChartVisible] = useState<boolean>(false);

  const [entries, setEntries] = useState<HealthEntry[]>([]);

  const [label, setLabel] = useState<string>('height');

  const options = {
    title: `${label.charAt(0).toUpperCase() + label.slice(1)} history`,
    curveType: 'function',
    legend: { position: 'bottom' },
  };

  const handleLabel = (event: ChangeEvent<HTMLSelectElement>) => {
    handleGetEntries();
    const { value } = event.target;
    setLabel(value);
  };

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
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    formData.dateStamp = new Date();
    await healthService.PostHealth(formData).then((data) => data);
  };

  // this needs id from a given entry instead of from an input field
  const handleDelete = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await healthService.DeleteHealth(id).then((data) => data);
  };

  const handleGetEntries = async () => {
    const res = await healthService.GetHealth().then((data) => data);
    setEntries(res);
    setChartVisible(true);
  };

  useEffect(() => {
    const mockEvent = {
      target: {
        value: 'height',
      },
    };
    handleLabel(mockEvent as ChangeEvent<HTMLSelectElement>);
  }, []); 
  

  const getData = () => {
    const dates = entries.map((entry) => entry.dateStamp);
    const values = entries.map((entry) => entry[label as keyof HealthEntry]);

    if (dates.length !== values.length) {
      console.error('Dates and values are not the same length');
    }

    const entriesForGraph: any = [];
    for (let i = 0; i < dates.length; i++) {
      const date = new Date(dates[i]);
      entriesForGraph.push([date.toLocaleDateString('da-DK'), values[i]]);
    }

    const data = [
      ['Date', `${label}(${label === 'weight' ? 'kg' : label === 'height' ? 'cm' : '%'})`],
      ...entriesForGraph,
    ];

    return data;
  };

  return (
    <>
      <script onLoad={() => handleGetEntries}></script>
      <h1>Health Graph</h1>

      <select onChange={(event: ChangeEvent<HTMLSelectElement>) => handleLabel(event)} defaultValue={'height'}>
        <option value="height">Height</option>
        <option value="weight">Weight</option>
        <option value="fatPercentage">Fat</option>
        <option value="musclePercentage">Muscle</option>
        <option value="waterPercentage">Water</option>
      </select>

      {chartVisible ? (
        <Chart
          chartType="LineChart"
          width="100%"
          height="400px"
          data={getData()}
          options={options}
        />
      ) : (
        <p>No data available</p>
      )}

      <h1>Health</h1>
      <form onSubmit={handleSubmit} className="form-container">
        <h2>Add Entry</h2>
        <label htmlFor="height">height</label>
        <input type="number" name="height" value={formData.height} onChange={handleInputChange} placeholder="cm" />
        <label htmlFor="weight">weight</label>
        <input type="number" name="weight" value={formData.weight} onChange={handleInputChange} placeholder="kg" />
        <label htmlFor="fatPercentage">Fat Percentage</label>
        <input type="number" name="fatPercentage" value={formData.fatPercentage} onChange={handleInputChange} placeholder="%" />
        <label htmlFor="musclePercentage">Muscle Percentage</label>
        <input type="number" name="musclePercentage" value={formData.musclePercentage} onChange={handleInputChange} placeholder="%" />
        <label htmlFor="waterPercentage">Water Percentage</label>
        <input type="number" name="waterPercentage" value={formData.waterPercentage} onChange={handleInputChange} placeholder="%" />
        <button type="submit">Add Item</button>
      </form>
      <form onSubmit={handleDelete} className="form-container">
        <h2>Delete Entry</h2>
        <select onChange={handleIDChange}>
          {entries.map((i) => (
            <option value={i.id}>{i.dateStamp.toLocaleString()}</option>
          ))}
        </select>
        <button type="submit">Delete Item</button>
      </form>
    </>
  );
};

export default Health;
