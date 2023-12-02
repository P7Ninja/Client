import { JwtService } from "./JwtService";

export type MealPlan = {
    id: number,
    userId: number,
    planID: number,
};

interface MealsPerDay {
    planID: number,
    meals: number,
    totalCalories: number,
    totalProtein: number,
    totalCarbohydrates: number,
    totalFat: number
}

interface MealPlanRecipes {
    planID: number;
    startDate: string;
    endDate: string;
}

export interface IMealPlanService {
    GetMealPlans(): Promise<Response[]>;
}
  
export class MealPlanService implements IMealPlanService {
    private baseUrl = "http://localhost:3005";
  
    async GetMealPlans(): Promise<Response[]> {
      return await fetch(`${this.baseUrl}/mealPlans/1`, {
        method: 'GET'
      }).then((res) => res.json());
    }
  }
  