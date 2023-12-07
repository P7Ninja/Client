import { JwtService } from "./JwtService";
import { MealPlan, GenerateMealPlan } from "../schemas";

export interface IMealPlanService {
    GetMealPlans(): Promise<MealPlan[]>;
    PostGenerateMealPlan(generateMeal: GenerateMealPlan): Promise<Response>;
    DeleteMealPlan(planID: number): Promise<Response>;
}
  
export class MealPlanService implements IMealPlanService {
    private baseUrl = "/api";

    async GetMealPlans(): Promise<MealPlan[]> {
      try {
        const response = await fetch(`${this.baseUrl}/mealPlan/all`, {
          method: 'GET',
          headers: JwtService.getDefaultHeader(),
        });
    
        const data = await response.json();
        console.log('API Response:', data);
    
        return data;
      } catch (error) {
        console.error('Error fetching meal plans:', error);
        throw error; 
      }
    }

    async PostGenerateMealPlan(generateMeal: GenerateMealPlan): Promise<Response> {
      const headers = JwtService.getDefaultHeader();
      headers.append('Content-Type', 'application/json');
    
      const body = JSON.stringify({
        targets: generateMeal.targets,
        split_days: generateMeal.split_days,
      });
    
      return await fetch(`${this.baseUrl}/generate`, {
        method: "POST",
        headers: headers,
        body: body,
      });
    }

    async DeleteMealPlan(planID: number): Promise<Response> {
      const headers = JwtService.getDefaultHeader();
      headers.append('content-type', 'application/json');
      return await fetch(`${this.baseUrl}/mealPlan/${planID}`,
      { 
          method: "Delete",
          headers: headers
      })
    }  
  }
  