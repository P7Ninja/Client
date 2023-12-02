import { JwtService } from "./JwtService";

export type MealPlan = {
    planID: number;
    startDate: string;
    endDate: string;
    days: days[];
};

export type days = {
  totalCalories: number;
  totalProtein: number;
  totalCarbohydrates: number;
  totalFat: number;
  recipes: [];
}

export interface IMealPlanService {
    GetMealPlans(): Promise<MealPlan[]>;
}
  
export class MealPlanService implements IMealPlanService {
    private baseUrl = "http://localhost:3005";

    async GetMealPlans(): Promise<MealPlan[]> {
      return await fetch(`${this.baseUrl}/mealPlans/1`, {
        method: 'GET'
      }).then((res) => res.json());


    }
  }
  