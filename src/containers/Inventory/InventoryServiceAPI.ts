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
    private baseUrl = "http://localhost:1234";
    async GetAllForUser(userId: number): Promise<Inventory[]> {
        return await fetch(`${this.baseUrl}/inventoryservice/api/inventories/user/${userId}`).then(res => res.json())
    }

    async Post(userId: number, name: string): Promise<Response> {
        return await fetch(`${this.baseUrl}/inventoryservice/api/inventories`,
            {
                method: "POST",
                body: JSON.stringify({ "userId": userId, "name": name }),
                headers: new Headers({ 'content-type': 'application/json' })
            });
    }

    async PostToInv(invId: number, foodId: number, expirationDate: string): Promise<Response> {
        return await fetch(`${this.baseUrl}/inventoryservice/api/inventories/${invId}`,
            {
                method: "POST",
                body: JSON.stringify({ "foodId": foodId, "expirationDate": expirationDate }),
                headers: new Headers({ 'content-type': 'application/json' })
            });
    }

    async DeleteItem(invId: number, itemId: number): Promise<Response> {
        return await fetch(`${this.baseUrl}/inventoryservice/api/inventories/${invId}/${itemId}`, { method: "Delete" })
    }
    
    async DeleteInv(invId: number): Promise<Response> {
        return await fetch(`${this.baseUrl}/inventoryservice/api/inventories/${invId}`, { method: "Delete" })
    }
}