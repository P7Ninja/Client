import { JwtService } from "./JwtService";

export type Health = {
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

export interface IHealthService {
    GetHealth(idList: number[]): Promise<Health[]>;
    PostHealth(health: Health): Promise<Health>;
    DeleteHealth(id: number): Promise<void>;
}


export class HealthService implements IHealthService {
    private headers = JwtService.getDefaultHeader();
    
    async GetHealth(): Promise<HealthEntry[]> {
        return await fetch(`/api/health/history`,
        {
            method: "GET",
            headers: this.headers
        }
        ).then(res => res.json());
    }

    async PostHealth(health: Health): Promise<Health> {
        return await fetch(`/api/health`,
            {
                method: "POST", body: JSON.stringify(health),
                headers: this.headers
            })
            .then(res => res.json());
    }

    async DeleteHealth(id: number): Promise<void> {
        await fetch(`/api/health/` + id, 
        { 
            method: "DELETE",
            headers: this.headers 
        });
    }
}

