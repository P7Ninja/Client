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
    
    async GetHealth(): Promise<HealthEntry[]> {
        const headers = JwtService.getDefaultHeader();
        return await fetch(`/api/health/history`,
        {
            method: "GET",
            headers: headers
        }
        ).then(res => res.json());
    }

    async PostHealth(health: Health): Promise<Health> {
        const headers = JwtService.getDefaultHeader();
        headers.append('content-type', 'application/json');
        return await fetch(`/api/health`,
            {
                method: "POST", body: JSON.stringify(health),
                headers: headers
            })
            .then(res => res.json());
    }

    async DeleteHealth(id: number): Promise<void> {
        const headers = JwtService.getDefaultHeader();
        headers.append('content-type', 'application/json');
        await fetch(`/api/health/` + id, 
        { 
            method: "DELETE",
            headers: headers 
        });
    }
}

