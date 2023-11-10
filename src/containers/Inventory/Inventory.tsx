import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { Food, FoodService, IFoodService } from './FoodServiceAPI';
import { Inventory, InventoryService, IInventoryService } from './InventoryServiceAPI';
import './Inventory.scss'

type FormState = {
    FoodId: number;
    ExpirationDate: string;
};

const placeholder: Food = { cal: 0, carbs: 0, category: "", discount: 0, fat: 0, id: 0, name: "Type to see suggestions", price: 0, priceKg: 0, protein: 0, vendor: "" };
const userId = 10;
const inventoryService: IInventoryService = new InventoryService();
const foodService: IFoodService = new FoodService();

function InventoryPage() {
    const [formData, setFormData] = useState<FormState>({
        FoodId: 0,
        ExpirationDate: new Date().toISOString().substring(0, 10)
    });
    const [inventories, setInventories] = useState<Inventory[]>([]);
    const [current, setCurrent] = useState(0);
    const [query, setQuery] = useState("");
    const [foods, setFoods] = useState<Food[]>([placeholder]);
    const [timer, setTimer] = useState(0);
    const cancelTimer = () => { if (timer != undefined) clearTimeout(timer) }

    const deleteItem = (inv: Inventory, itemId: number) => {
        const itemIdx = inv.items.findIndex(i => i.id == itemId);
        inv.items.splice(itemIdx, 1);
        const index = inventories.indexOf(inv);
        const newInvs = [...inventories]
        newInvs[index].items = inv.items
        setInventories(newInvs);
    }

    // Handle changes in text inputs
    const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
        cancelTimer();
        setQuery(event.target.value);
    };

    // Handle changes in select elements
    const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target;
        console.log(name, value);
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Handle changes in date inputs
    const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(formData)
        const res = await inventoryService.PostToInv(inventories[current].id, formData.FoodId, formData.ExpirationDate);
        if (res.ok) {
            updateInvs(userId);
            setQuery("");
        }
    };

    // When query changes, GET foods from foodservice
    useEffect(() => {
        if (query !== "") {
            setTimer(setTimeout(async () => {
                await foodService.GetAll(query).then(data => {
                    setFoods(data);
                    setFormData(f => {
                        if (data[0] != undefined) f.FoodId = data[0].id;
                        else f.FoodId = 0;
                        return f
                    });
                });
            }, 300)); // Wait 300 ms for user to finish typing to send request
        }
        else {
            setFoods([placeholder]);
        }
    }, [query])

    const updateInvs = async (userId: number) => {
        console.trace();
        await inventoryService.GetAllForUser(userId).then(data => setInventories(data));
    }

    useEffect(() => {
        updateInvs(userId)
    }, []);


    return (
        <>
            <div>
                <h1>Inventory</h1>
                <form onSubmit={handleSubmit} className="form-container">
                    <label htmlFor='item'>Item:</label>
                    <input
                        type="text"
                        name="query"
                        value={query}
                        onChange={handleQueryChange}
                        placeholder="Item"
                        autoComplete="off"
                    />
                    <br />
                    <select onChange={handleSelectChange} name='FoodId'>
                        {foods?.map((food) => {
                            return <option value={food.id} key={food.id}>{food.name}</option>
                        })}
                    </select>
                    <br />
                    <label htmlFor='ExpirationDate'>Expiration date:</label>
                    <input
                        type="date"
                        name="ExpirationDate"
                        value={formData.ExpirationDate}
                        onChange={handleDateChange}
                        placeholder="Expiration date"
                    />
                    <br />
                    <button type="submit">Add item</button>
                </form>
            </div>
            <Inventories inventories={inventories}
                current={current}
                setCurrent={setCurrent}
                removeItem={deleteItem}
                update={async () => await updateInvs(userId)} />
        </>
    )
}

interface InventoriesProps {
    inventories: Inventory[]
    current: number,
    setCurrent: (i: number) => void,
    removeItem: (inv: Inventory, itemId: number) => void,
    update: () => void,
}

function Inventories(props: InventoriesProps) {
    const inv = props.inventories[props.current];
    const [showNewInv, setShowNewInv] = useState(false);

    const deleteItem = async (itemId: number) => {
        const res = await inventoryService.DeleteItem(inv.id, itemId);
        if (res.ok) {
            props.removeItem(inv, itemId)
        }
    }
    const deleteInv = async () => {
        const res = await inventoryService.DeleteInv(inv.id);
        if (res.ok) {
            props.update();
            props.setCurrent(0);
        }
    }

    if (inv == null) return <NewInventory newCurrent={0} setCurrent={props.setCurrent} update={props.update} hide={() => setShowNewInv(false)} /> // while loading

    return (
        <>
            <div style={{ display: "flex", gap: "0px 10px", flexWrap: "wrap" }}>
                {props.inventories.map((item, idx) => {
                    return (
                        <div key={idx} onClick={() => { props.setCurrent(idx); setShowNewInv(false) }} className={idx == props.current && !showNewInv ? "inv-selector selected" : "inv-selector"}>{item.name}</div>
                    )
                })}
                <div onClick={() => setShowNewInv(!showNewInv)} className={showNewInv ? "inv-selector selected" : "inv-selector"}>+ new inv</div>
            </div>
            {showNewInv && <NewInventory update={async () => props.update()} hide={() => setShowNewInv(false)} newCurrent={props.inventories.length} setCurrent={props.setCurrent} />}
            {!showNewInv &&
                <div style={{ maxWidth: "500px" }}>
                    <button className='secondary-btn' style={{ float: "right" }} onClick={async () => deleteInv()}>X</button>
                    <h2>{inv.name}</h2>
                    <div>
                        {inv.items.map(item => {
                            const daysToExpiration = Math.ceil((new Date(item.expirationDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
                            return (
                                <div key={item.id} className='delete-btn-container item'>
                                    <button className='secondary-btn delete-btn' style={{ float: "right", position: "relative" }} onClick={() => deleteItem(item.id)}>X</button>
                                    {daysToExpiration < 0 && (<p style={{ color: "darkgrey" }}>{item.foodId} (expired {Math.abs(daysToExpiration)} {daysToExpiration == -1 ? "day" : "days"} ago)</p>)}
                                    {daysToExpiration >= 0 && (<p> {item.foodId} (expires in {daysToExpiration} {daysToExpiration == 1 ? "day" : "days"})</p>)}
                                </div>
                            )
                        })}
                    </div>
                </div>
            }
        </>
    )
}

interface NewInventoryProps {
    update: () => void,
    hide: () => void,
    newCurrent: number,
    setCurrent: (i: number) => void,
}

function NewInventory(props: NewInventoryProps) {
    const [name, setName] = useState("");
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const res = await inventoryService.Post(userId, name);
        if (res.ok) {
            props.update();
            props.hide();
            props.setCurrent(props.newCurrent);
        }
    }
    return (
        <>
            <form onSubmit={handleSubmit} className='form-container'>
                <h2>New inventory</h2>
                <label>Name:</label>
                <input type='text' minLength={1} onChange={e => setName(e.target.value)}></input>
                <button type='submit'>Ok</button>
            </form>
        </>
    )
}

export default InventoryPage;
