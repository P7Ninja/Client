import { useState, ChangeEvent, FormEvent, useEffect, useContext } from 'react';
import { Food, FoodService, IFoodService } from '../../Services/FoodService';
import { Inventory, InventoryService, IInventoryService } from '../../Services/InventoryService';
import './Inventory.scss'
import { UserContext } from '../../App';

type FormState = {
  FoodId: number;
  ExpirationDate: string;
};

const placeholder: Food = { cal: 0, carbs: 0, category: "", discount: 0, fat: 0, id: 0, name: "Search to see suggestions...", price: 0, priceKg: 0, protein: 0, vendor: "" };
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
  const days = Math.ceil((new Date(formData.ExpirationDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
  
  const context = useContext(UserContext);

  // add/subtract x days to the expiration date
  const addDays = (days: number) => {
    const date = new Date(formData.ExpirationDate)
    date.setDate(date.getDate() + days)
    setFormData({
      ...formData,
      ["ExpirationDate"]: date.toISOString().substring(0, 10)
    });
  }

  // deletes an item from a specific inventory
  // (er der en nemmere måde?? ved alle de andre ting jeg prøvede opdaterer ui ikke)
  const deleteItem = (inv: Inventory, itemId: number) => {
    const itemIdx = inv.items.findIndex(i => i.id == itemId);
    inv.items.splice(itemIdx, 1);
    const index = inventories.indexOf(inv);
    const newInvs = [...inventories]
    newInvs[index].items = inv.items
    setInventories(newInvs);
  }

  // Handle changes in select element
  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
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
    if (context.user == null) return;
    const res = await inventoryService.PostToInv(inventories[current].id, formData.FoodId, formData.ExpirationDate);
    if (res.ok) {
      updateInvs(context.user?.id);
      setQuery("");
    }
  };


  // Handle changes in query input (triggers useEffect below)
  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    cancelTimer();
    setQuery(event.target.value);
  };
  // When query changes, GET foods from foodservice (after timeout)
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
      setFormData(f => {
        f.FoodId = 0;
        return f;
      });
    }
  }, [query])

  const updateInvs = async (userId: number) => {
    const invs = await inventoryService.GetAllForUser(userId).then(data => data);

    { // for getting food names. Should maybe be done on backend instead.
      const foodIds: number[] = [];
      invs.forEach(inv => {
        inv.items.forEach(i => foodIds.push(i.foodId));
      });
      const invFoods = await foodService.GetFoods(foodIds).then(data => data);
      invs.forEach(inv => {
        inv.items.forEach(i => i.name = invFoods.filter(f => f.id == i.foodId)[0].name);
      });
    }

    setInventories(invs);
  }

  useEffect(() => {
    if (context.user == null) return;
    updateInvs(context.user?.id);
  }, [context.user, context.user?.id]);

  if (context.user == null) return <p>Login to see inventories</p>;

  return (
    <>
      <div>
        <h1>Inventory</h1>
        <form onSubmit={handleSubmit} className="form-container">
          <input
            type="text"
            name="query"
            value={query}
            onChange={handleQueryChange}
            placeholder="Search"
            autoComplete="off"
          />
          <br />
          <select onChange={handleSelectChange} name='FoodId'>
            {foods?.map((food) => {
              return <option value={food.id} key={food.id}>{food.name}</option>
            })}
          </select>
          <br />
          <div style={{ display: "flex", justifyContent: "space-between", alignContent: "center", gap: "10px" }}>
            <input
              type="date"
              name="ExpirationDate"
              value={formData.ExpirationDate}
              onChange={handleDateChange}
              placeholder="Expiration date"
              style={{ flexGrow: "1" }}
            />
            <div className='date-row'>
              <button className='day-btn' type='button' onClick={() => addDays(-1)}>-</button>
              <div className='day-div'>
                <span style={{ fontSize: "1.1rem" }}>{days}</span>
                <span style={{ fontSize: "0.9rem", marginTop: "-9px", width: "40px" }}>
                  {Math.abs(days) == 1 ? "Day" : "Days"}
                </span>
              </div>
              <button className='day-btn' type='button' onClick={() => addDays(1)}>+</button>
            </div>
          </div>
          <br />
          <button type="submit" disabled={foods.length == 0 || formData.FoodId == 0}>Add item</button>
        </form>
      </div>
      <Inventories
        inventories={inventories}
        current={current}
        setCurrent={setCurrent}
        removeItem={deleteItem}
        update={updateInvs} />
    </>
  )
}

interface InventoriesProps {
  inventories: Inventory[]
  current: number,
  setCurrent: (i: number) => void,
  removeItem: (inv: Inventory, itemId: number) => void,
  update: (userId: number) => Promise<void>,
}

function Inventories(props: InventoriesProps) {
  const inv = props.inventories[props.current];
  const [showNewInv, setShowNewInv] = useState(false);
  const context = useContext(UserContext);

  const deleteItem = async (itemId: number) => {
    const res = await inventoryService.DeleteItem(inv.id, itemId);
    if (res.ok) {
      props.removeItem(inv, itemId)
    }
  }
  const deleteInv = async () => {
    if (!confirm("Delete inventory?")) return;
    if (context.user == null) return;
    const res = await inventoryService.DeleteInv(inv);
    if (res.ok) {
      await props.update(context.user.id);
      props.setCurrent(0);
    }
  }

  if (inv == null)
    return <NewInventory
      newCurrent={0}
      setCurrent={props.setCurrent}
      update={props.update}
      hide={() => setShowNewInv(false)} />

  return (
    <>
      {/* Tabs for switching between inventories */}
      <div className='inv-selector-container'>
        {props.inventories.map((item, idx) =>
          <div
            key={idx}
            onClick={() => { props.setCurrent(idx); setShowNewInv(false); }}
            className={idx == props.current && !showNewInv ? "inv-selector selected" : "inv-selector"}>
            {item.name}
          </div>
        )}
        <div onClick={() => setShowNewInv(!showNewInv)} className={showNewInv ? "inv-selector plus selected" : "inv-selector plus"}>+</div>
      </div>

      {/* Show new inventory page */}
      {showNewInv &&
        <NewInventory
          update={props.update}
          hide={() => setShowNewInv(false)}
          newCurrent={props.inventories.length}
          setCurrent={props.setCurrent} />}

      {/* Show the items of the selected inventory */}
      {!showNewInv &&
        <div style={{ maxWidth: "500px" }}>
          <button className='delete-btn visible' style={{ float: "right" }} onClick={async () => deleteInv()}>⨉</button>
          <h2>{inv.name}</h2>
          <div className='items-container'>
            {inv.items.map(item => {
              const daysToExpiration = Math.ceil((new Date(item.expirationDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
              return (
                <div key={item.id} className='delete-btn-container item'>

                  {daysToExpiration < 0 &&
                    <p style={{ color: "darkgrey" }}>
                      {item.name} (expired {Math.abs(daysToExpiration)} {daysToExpiration == -1 ? "day" : "days"} ago)
                    </p>}

                  {daysToExpiration > 0 &&
                    <p>
                      {item.name} (expires in {daysToExpiration} {daysToExpiration == 1 ? "day" : "days"})
                    </p>}

                  {daysToExpiration == 0 &&
                    <p> {item.name} (expires today)</p>}

                  <button className='delete-btn' onClick={() => deleteItem(item.id)}>⨉</button>
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
  update: (userId: number) => Promise<void>,
  hide: () => void,
  newCurrent: number,
  setCurrent: (i: number) => void,
}

function NewInventory(props: NewInventoryProps) {
  const [name, setName] = useState("");
  const context = useContext(UserContext);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (context.user?.id == null) return;
    const res = await inventoryService.Post(context.user.id, name);
    if (res.ok) {
      await props.update(context.user.id);
      props.hide();
      props.setCurrent(props.newCurrent);
    }
  }
  return (
    <>
      <h2>New inventory</h2>
      <form onSubmit={handleSubmit} className='form-container' style={{ marginTop: "20px" }}>
        <input type='text' placeholder='Name' minLength={1} onChange={e => setName(e.target.value)}></input>
        <button type='submit'>Ok</button>
      </form>
    </>
  )
}

export default InventoryPage;
