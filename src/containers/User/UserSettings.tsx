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
        <strong>Targets:</strong>
        <p>{context.user?.target_energy.calories} kcal</p>
        <p>Protein: {context.user?.target_energy.protein} g.</p>
        <p>Carbs: {context.user?.target_energy.carbohydrates} g.</p>
        <p>Fat: {context.user?.target_energy.fat} g.</p>
        <button onClick={signout}>Sign out</button>
    </>
}