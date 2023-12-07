import { Food } from "./FoodService";
import { JwtService } from "./JwtService";

export type Inventory = {
    id: number,
    userId: number,
    name: string,
    items: InventoryItem[]
};

export type InventoryItem = {
    id: number,
    foodId: number,
    expirationDate: string,
    timestamp: string,
    food: Food
}

export interface IInventoryService {
    GetAllForUser(userId: number): Promise<Inventory[]>;
    Post(userId: number, name: string): Promise<Response>;
    PostToInv(invId: number, foodId: number, expirationDate: string): Promise<Response>;
    DeleteItem(invId: number, itemId: number): Promise<Response>;
    DeleteInv(inv: Inventory): Promise<Response>;
}

export class InventoryService implements IInventoryService {
    // private baseUrl = "http://127.0.0.1";
    async GetAllForUser(): Promise<Inventory[]> {
        return await fetch(`/api/inventories`,
            {
                headers: JwtService.getDefaultHeader()
            })
            .then(res => res.json())
    }

    async Post(userId: number, name: string): Promise<Response> {
        const headers = JwtService.getDefaultHeader();
        headers.append('content-type', 'application/json');
        return await fetch(`/api/inventories`,
            {
                method: "POST",
                body: JSON.stringify({ "userId": userId, "name": name}),
                headers: headers
            });
    }

    async PostToInv(invId: number, foodId: number, expirationDate: string): Promise<Response> {
        const headers = JwtService.getDefaultHeader();
        headers.append('content-type', 'application/json');
        return await fetch(`/api/inventories/${invId}`,
        {
            method: "POST",
            body: JSON.stringify({ "foodId": foodId, "expirationDate": expirationDate}),
            headers: headers
        });
    }
    
    async DeleteItem(invId: number, itemId: number): Promise<Response> {
        const headers = JwtService.getDefaultHeader();
        headers.append('content-type', 'application/json');
        return await fetch(`/api/inventories/${invId}/${itemId}`,
        { 
            method: "Delete",
            headers: headers
        })
    }

    async DeleteInv(inv: Inventory): Promise<Response> {
        const headers = JwtService.getDefaultHeader();
        headers.append('content-type', 'application/json');

        return await fetch(`/api/inventories/${inv.id}`,
        {
            method: "DELETE",
            headers: headers,
            body: JSON.stringify(inv)
        })
    }
}