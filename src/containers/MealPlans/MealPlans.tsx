import { useState, ChangeEvent, FormEvent, useEffect, useContext } from 'react';

import 'reactjs-popup/dist/index.css';
import './MealPlans.scss'
import MealplanPopup from '../../components/mealplan-popup/mealplan-popup'
import GenerateMealplanPopup from '../../components/generate-mealplan-popup/generate-mealplan-popup';
import { MealPlanService, IMealPlanService } from '../../Services/MealPlanService';
import { UserContext } from '../../App';

import Popup from 'reactjs-popup';
import fetch from 'node-fetch'

interface MealPlanType {
    planID: number;
    startDate: string;
    endDate: string;
}

const mealPlanService: IMealPlanService = new MealPlanService();



const MealPlan = () => {
    const { user } = useContext(UserContext);
    const [mealPlans, setMealPlans] = useState<MealPlanType[]>([]);
    const context = useContext(UserContext);
  
    // useEffect(() => {
    //   const fetchData = async () => {
    //     try {
    //       if (user) {
    //         const userID = user.id;
    //         const response = await fetch(`http://127.0.0.1:3005/mealPlans/${userID}`);
    //         const data = await response.json() as MealPlanType[];
    //         setMealPlans(data);
    //         console.log(data);
    //       }
    //     } catch (error) {
    //       console.error('Error fetching data:', error);
    //     }
    //   };
  
    //   fetchData();
    // }, [user]);

    type Plan = {
        planID: number;
        startDate: string;
        endDate: string;
        // Add other properties as needed
      };
      
    type PlanData = Record<string, Plan>;

    const GetMealPlans = async() => {
        // if(context.user == null) return; 
        // Replace with this: return await mealPlanService.GetMealPlans(context.user?.id).then(data => data);
        var test = await mealPlanService.GetMealPlans(1).then(data => data);
        
        Object.keys(test).forEach((key: any) => {
            const plan = test[key];
            console.log(`Plan ID for ${key}: ${plan.planID}`);
        });
        return await mealPlanService.GetMealPlans(1).then(data => data);
    };

    const mealplans = GetMealPlans()

    return (
        <>

        
        <h1>Mealplan</h1>
        <GenerateMealplanPopup />
        <ul style={{listStyleType: "none"}}>

            <li><MealplanPopup dateRange='01/12/2023 to 01/13/2023 (Active)'/></li>
            
            <li><MealplanPopup dateRange='01/10/2023 to 01/11/2023'/></li>
            <li><MealplanPopup dateRange='01/09/2023 to 01/09/2023'/></li>
        </ul>
    </>
    );
};


export default MealPlan;

