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
}

export class FoodService implements IFoodService{
    async GetAll(query: string): Promise<Food[]> {
        return await fetch(`api/foodservice/api/Foods?query=${query}`).then(res => res.json())
    }
}