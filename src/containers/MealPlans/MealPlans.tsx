import React, { useState, useEffect } from 'react';
import 'reactjs-popup/dist/index.css';
import './MealPlans.scss';
import MealplanPopup from '../../components/mealplan-popup/mealplan-popup';
import GenerateMealplanPopup from '../../components/generate-mealplan-popup/generate-mealplan-popup';
import { MealPlan, MealPlanService, IMealPlanService } from '../../Services/MealPlanService';

const mealPlanService: IMealPlanService = new MealPlanService();
const mealPlanPlaceholder: MealPlan = { planID: 0, startDate: '', endDate: '', days: [] };

const MealPlanPage = () => {
  const [mealPlans, setMealPlans] = useState<MealPlan[]>([mealPlanPlaceholder]);

  useEffect(() => {
    const fetchMealPlans = async () => {
      try {
        const data = await mealPlanService.GetMealPlans();
        if (typeof data === 'object' && data !== null) {
          const plansArray = Object.values(data) as MealPlan[];
          setMealPlans(plansArray);
        } else {
          console.error('GetMealPlans response is not in the expected format:', data);
        }
      } catch (error) {
        console.error('Error fetching meal plans:', error);
      }
    };

    fetchMealPlans(); 
  }, []); 

  return (
    <>
      <h1>Mealplan</h1>
      <GenerateMealplanPopup />
      <ul style={{ listStyleType: 'none' }}>
        {mealPlans.map((mealplan) => (
          <li key={mealplan.planID}>
            <MealplanPopup mealplan={mealplan} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default MealPlanPage;
