
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
    private baseUrl = "http://localhost";
    private headers = new Headers({ 'content-type': 'application/json',
                        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbiIsImlkIjoxLCJleHAiOjE3MDE1MTIwNjl9.0dPVsFkVbguY0Z23U4Vi6A_Yw15GwTz2qOcTS8fbxPw',
                        'accept': 'application/json' })
    async GetHealth(): Promise<HealthEntry[]> {
        return await fetch(`${this.baseUrl}/api/health/history`,
        {
            method: "Get",
            headers: this.headers
        }
        ).then(res => res.json());
    }

    async PostHealth(health: Health): Promise<Health> {
        return await fetch(`${this.baseUrl}/api/health`,
            {
                method: "POST", body: JSON.stringify(health),
                headers: this.headers
            })
            .then(res => res.json());
    }

    async DeleteHealth(id: number): Promise<void> {
        await fetch(`${this.baseUrl}/api/health/` + id, 
        { 
            method: "DELETE",
            headers: this.headers 
        });
    }
}

