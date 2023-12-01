import { useContext } from "react";
import { UserContext } from "../../App";
import { UserService } from "../../Services/UserService";

export function UserSettings() {
  const context = useContext(UserContext);
  const userservice = new UserService();

    const signout = () => {
        userservice.SignOut();
        context.setUser?.(null);
      }
    
    return <>
        <h1>Account</h1>
        <h3>{context.user?.username}</h3>
        <p>{context.user?.email}</p>
        <button onClick={signout}>Sign out</button>
    </>
}