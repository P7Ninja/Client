export abstract class JwtService {
    static GetJwt() : string {
        return localStorage.getItem("jwt") || "";
    }
    static setJwt(jwt: string) {
        localStorage.setItem("jwt", jwt);
    }
    static getDefaultHeader() {
        return new Headers({'Authorization': `Bearer ${this.GetJwt()}`,
                            'Content-Type': 'application/json'})
    }
    static ClearJwt() {
        localStorage.removeItem("jwt");
    }
}