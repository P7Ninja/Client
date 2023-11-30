import { FormState } from "../containers/User/User";
import { JwtService } from "./JwtService";

export type CreateUserForm = {
    username: string;
    password: string;
    email: string;
    city: string;
    useFoodWasteDiscounts: boolean;
    birthday: string;
    gender: string;
    target_energy: Targets;
}

export type UserInfo = {
    username: string;
    email: string;
    gender: string;
    birthday: string;
    id: number;
    created: string;
    target_energy: Targets;
}

export type Targets = {
    calories: number;
    fat: number;
    carbohydrates: number;
    protein: number;
}

interface IUserService {
    Login(username: string, password: string): Promise<Response>;
    CreateUser(form: FormState): Promise<Response>;
    SignOut(): void;
    GetUser(): Promise<UserInfo | null>;
}

export class UserService implements IUserService {
    private baseUrl = "http://127.0.0.1:8001"
    SignOut(): void {
        JwtService.ClearJwt();
    }
    async CreateUser(form: FormState): Promise<Response> {
        const targets: Targets = { calories: form.calories, protein: form.protein, fat: form.fat, carbohydrates: form.carbs }
        const createUserForm: CreateUserForm = { username: form.username, email: form.email, password: form.password, birthday: form.birthdate, city: form.city, gender: form.gender, target_energy: targets, useFoodWasteDiscounts: form.useFoodWasteDiscounts }

        return await fetch(`${this.baseUrl}/user`,
            {
                method: "POST",
                body: JSON.stringify(createUserForm),
                headers: new Headers({ "content-type": "application/json" })
            });
    }
    async Login(username: string, password: string): Promise<Response> {
        const res = await fetch(`${this.baseUrl}/login`,
            {
                method: "POST",
                body: `username=${username}&password=${password}`,
                headers: new Headers({ "content-type": "application/x-www-form-urlencoded" })
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