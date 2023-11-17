export type Food = {
    id: number,
    name: string,
    price: number,
    priceKg: number,
    discount: number,
    vendor: string,
    category: string,
    fat: number,
    carbs: number,
    protein: number,
    cal: number,
};

export interface IFoodService {
    GetAll(query: string): Promise<Food[]>;
    GetFoods(idList: number[]): Promise<Food[]>;
    GetFood(query: string): Promise<Food>;

}

export class FoodService implements IFoodService {
    private baseUrl = "https://localhost:7088";
    async GetFoods(idList: number[]): Promise<Food[]> {
        return await fetch(`${this.baseUrl}/api/foods/list`,
            {
                method: "POST", body: JSON.stringify(idList),
                headers: new Headers({ 'content-type': 'application/json' })
            })
            .then(res => res.json());
    }

    async GetAll(query: string): Promise<Food[]> {
        return await fetch(`${this.baseUrl}/api/foods?query=${query}`).then(res => res.json());
    }

    async GetFood(query: string): Promise<Food> {
        return await fetch(`${this.baseUrl}/api/foods?query=${query}`).then(res => res.json())
    }

}