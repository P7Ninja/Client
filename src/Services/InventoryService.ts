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
    name: string | null,
}

export interface IInventoryService {
    GetAllForUser(userId: number): Promise<Inventory[]>;
    Post(userId: number, name: string): Promise<Response>;
    PostToInv(invId: number, foodId: number, expirationDate: string): Promise<Response>;
    DeleteItem(invId: number, itemId: number): Promise<Response>;
    DeleteInv(invId: number): Promise<Response>;
}

export class InventoryService implements IInventoryService {
    private baseUrl = "http://localhost:8001";
    async GetAllForUser(): Promise<Inventory[]> {
        return await fetch(`${this.baseUrl}/inventories`,
            {
                headers: JwtService.getDefaultHeader()
            })
            .then(res => res.json())
    }

    async Post(userId: number, name: string): Promise<Response> {
        const headers = JwtService.getDefaultHeader();
        headers.append('content-type', 'application/json');
        return await fetch(`${this.baseUrl}/inventories`,
            {
                method: "POST",
                body: JSON.stringify({ "userId": userId, "name": name }),
                headers: headers
            });
    }

    async PostToInv(invId: number, foodId: number, expirationDate: string): Promise<Response> {
        const headers = JwtService.getDefaultHeader();
        headers.append('content-type', 'application/json');
        return await fetch(`${this.baseUrl}/inventories/${invId}`,
            {
                method: "POST",
                body: JSON.stringify({ "foodId": foodId, "expirationDate": expirationDate }),
                headers: headers
            });
    }

    async DeleteItem(invId: number, itemId: number): Promise<Response> {
        return await fetch(`${this.baseUrl}/inventories/${invId}/${itemId}`,
        { 
            method: "Delete",
            headers: JwtService.getDefaultHeader()
        })
    }

    async DeleteInv(invId: number): Promise<Response> {
        return await fetch(`${this.baseUrl}/api/inventories/${invId}`,
        {
            method: "Delete",
            headers: JwtService.getDefaultHeader()
        })
    }
}