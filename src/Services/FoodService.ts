import { JwtService } from "./JwtService";

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
}

export class FoodService implements IFoodService {
    private baseUrl = "/api";
    async GetFoods(idList: number[]): Promise<Food[]> {
        const headers = JwtService.getDefaultHeader();
        headers.append('content-type', 'application/json');
        return await fetch(`${this.baseUrl}/foods/list`,
            {
                method: "POST", body: JSON.stringify(idList),
                headers: headers
            })
            .then(res => res.json());
    }

    async GetAll(query: string): Promise<Food[]> {
        return await fetch(`${this.baseUrl}/foods?query=${query}`).then(res => res.json());
    }
}