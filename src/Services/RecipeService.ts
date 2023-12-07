import { JwtService } from "./JwtService";
import { Recipe } from '../schemas';

export interface IRecipeService {
    GetRecipe(recipeID: number): Promise<Recipe>;
}

export class RecipeService implements IRecipeService {
    private baseUrl = "/api"

    async GetRecipe(recipeID: number): Promise<Recipe> {
        try {
            const response = await fetch(`${this.baseUrl}/recipe/${recipeID}`, {
                method: 'GET',
                headers: JwtService.getDefaultHeader(),
            });
            const data = await response.json();
            return data
        } catch(error) {
            console.error("There was a problem fetching from the recipeservice")
            throw error;
        }
    }
}