import { JwtService } from "./JwtService";

export type CreateUserForm = {
    username: string,
    email: string,
    gender: string,
    birthday: string,
    target_energy: Targets,
    password: string
}
export type UserInfo = {
    username: string,
    email: string,
    gender: string,
    birthday: string,
    id: number,
    created: string,
    target_energy: Targets
}

export type Targets = {
    calories: number,
    fat: number,
    carbohydrates: number,
    protein: number,
}

interface IUserService {
    Login(username: string, password: string): Promise<Response>;
    CreateUser(form: CreateUserForm): Promise<Response>;
    SignOut(): void;
    GetUser(): Promise<UserInfo | null>;
}

export class UserService implements IUserService {
    private baseUrl = "http://127.0.0.1:8001"
    SignOut(): void {
        JwtService.ClearJwt();
    }
    async CreateUser(form: CreateUserForm): Promise<Response> {
        return await fetch(`${this.baseUrl}/user`,
        {
            method: "POST",
            body: JSON.stringify(form),
            headers: new Headers({"content-type": "application/json"})
        });
    }
    async Login(username: string, password: string): Promise<Response> {
        const res = await fetch(`${this.baseUrl}/login`,
        {
            method: "POST",
            body: `username=${username}&password=${password}`,
            headers: new Headers({"content-type": "application/x-www-form-urlencoded"})
        });
        if (res.ok) {
            const data = await res.json();
            const jwt = data.access_token;
            JwtService.setJwt(jwt);
        }
        return res
    }

    async GetUser(): Promise<UserInfo | null> {
        const res = await fetch(`${this.baseUrl}/user`,
            {
                headers: JwtService.getDefaultHeader()
            });
        if (res.ok) return await res.json();
        else return null
    }

}