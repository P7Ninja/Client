import { useState, useEffect } from 'react';
import 'reactjs-popup/dist/index.css';
import './MealPlans.scss';
import MealplanPopup from '../../components/mealplan-popup/mealplan-popup';
import GenerateMealplanPopup from '../../components/generate-mealplan-popup/generate-mealplan-popup';
import { MealPlanService, IMealPlanService } from '../../Services/MealPlanService';
import { MealPlan } from '../../schemas';

const mealPlanService: IMealPlanService = new MealPlanService();
const mealPlanPlaceholder: MealPlan = { planID: 0, startDate: '', endDate: '', days: [] };

const MealPlanPage = () => {
  const [mealPlans, setMealPlans] = useState<MealPlan[]>([mealPlanPlaceholder]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMealPlans = async () => {
      try {
        const data = await mealPlanService.GetMealPlans();
  
        const plansArray = Object.values(data).map((plan) => plan);
  
        setMealPlans(plansArray);
      } catch (error) {
        console.error('Error fetching meal plans:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchMealPlans();
  }, []);
  

  if(loading) {
    return <h2>Loading...</h2>
  }

  return (
    <>
      <h1>Mealplan</h1>
      <GenerateMealplanPopup />
      <ul style={{ listStyleType: 'none' }}>
        {mealPlans.reverse().map((mealplan) => (
          <li key={mealplan.planID}>
            <MealplanPopup mealplan={mealplan} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default MealPlanPage;
