
export type Health = {
    id: number,
    Height: number,
    Weight: number,
    FatPercentage: number,
    MusclePercentage: number,
    WaterPercentage: number,
};

export interface IHealthService {
    GetAll(query: string): Promise<Health[]>;
    GetHealths(idList: number[]): Promise<Health[]>;
    PostHealth(health: Health): Promise<Health>;
    DeleteHealth(id: number): Promise<void>;
}


export class HealthService implements IHealthService {
    private baseUrl = "http://localhost:1234";
    async GetHealths(idList: number[]): Promise<Health[]> {
        return await fetch(`${this.baseUrl}/healthservice/api/healths/list`,
            {
                method: "POST", body: JSON.stringify(idList),
                headers: new Headers({ 'content-type': 'application/json' })
            })
            .then(res => res.json());
    }

    async GetAll(query: string): Promise<Health[]> {
        return await fetch(`${this.baseUrl}/healthservice/api/healths?query=${query}`).then(res => res.json());
    }

    async PostHealth(health: Health): Promise<Health> {
        return await fetch(`${this.baseUrl}/healthservice/api/healths`,
            {
                method: "POST", body: JSON.stringify(health),
                headers: new Headers({ 'content-type': 'application/json' })
            })
            .then(res => res.json());
    }

    async DeleteHealth(id: number): Promise<void> {
        await fetch(`${this.baseUrl}/healthservice/api/healths/${id}`, { method: "DELETE" });
    }
}

