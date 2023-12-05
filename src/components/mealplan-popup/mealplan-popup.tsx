import React, { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import '../styling/mealplan-popup.scss';
import { MealPlanService, IMealPlanService } from '../../Services/MealPlanService';
import { MealPlan, days, Recipe } from '../../schemas';
import { RecipeService, IRecipeService } from '../../Services/RecipeService';

interface MealplanPopupProps {
  mealplan: MealPlan;
}

const mealPlanService: IMealPlanService = new MealPlanService();
const recipeService: IRecipeService = new RecipeService();

const MealplanPopup: React.FC<MealplanPopupProps> = (props) => {
  const { mealplan } = props;
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const currentDate = new Date();

  useEffect(() => {
    const fetchRecipes = async () => {
      if (selectedDay !== null && mealplan.days[selectedDay]) {
        const recipesForDay = mealplan.days[selectedDay].recipes;
        const recipesData = await Promise.all(recipesForDay.map(recipeID => recipeService.GetRecipe(recipeID)));
        setRecipes(recipesData);
      }
    };

    fetchRecipes();
  }, [selectedDay, mealplan.days]);

  const DeleteMealPlan = async () => {
    try {
      await mealPlanService.DeleteMealPlan(mealplan.planID);
    } catch (error) {
      console.error(`There was a problem deleting a meal plan: ${error}`);
    }
  };

  return (
    <Popup
      trigger={
        <button className="button">
          {`${mealplan.startDate.substring(0, 10)} to ${mealplan.endDate.substring(0, 10)} ${
            currentDate >= new Date(mealplan.startDate) && currentDate <= new Date(mealplan.endDate)
              ? '(Active)'
              : ''
          }`}
        </button>
      }
      modal
      nested
      contentStyle={{
        padding: '20px',
        borderRadius: '30px',
        // Apply the "modal-content" class directly to the contentStyle
        maxHeight: '400px', // Set a maximum height according to your design
        overflowY: 'auto', // Ensure content is scrollable
      }}
    >
      <div className="modal">
        <div className="dropdown">
          <label>Select a day:</label>
          <select
            value={selectedDay === null ? '' : selectedDay}
            onChange={(e) => setSelectedDay(Number(e.target.value))}
          >
            <option value="" disabled>
              Select a day
            </option>

            {Array.isArray(mealplan.days) &&
              mealplan.days.map((_day: days, index: number) => (
                <option key={index} value={index}>
                  Day {index + 1}
                </option>
              ))}
          </select>
          <button onClick={DeleteMealPlan} style={{ backgroundColor: 'red' }}>
            Delete
          </button>
        </div>
        {selectedDay !== null && mealplan.days[selectedDay] && (
          <div className="mealplanlist">
            <p>Total Calories: {mealplan.days[selectedDay].totalCalories}</p>
            <p>Total Protein: {mealplan.days[selectedDay].totalProtein}</p>
            <p>Total Carbohydrates: {mealplan.days[selectedDay].totalCarbohydrates}</p>
            <p>Total Fat: {mealplan.days[selectedDay].totalFat}</p>
            {recipes.length > 0 ? (
              <div>
                <h3>Recipes:</h3>
                <ul>
                  {recipes.map((recipe, index) => (
                    <div key={index}>
                      <h4>Recipe {index + 1}: {recipe.title}</h4>
                      <p>Servings: {recipe.servings}</p>
                      <p>Instructions: {recipe.instructions}</p>
                      <p>URL: {recipe.url}</p>

                      {Array.isArray(recipe.ingredients) && recipe.ingredients.length > 0 && (
                        <div>
                          <h5>Ingredients:</h5>
                          <ul>
                            {recipe.ingredients.map((ingredient, i) => (
                              <li key={i}>
                                {ingredient.amount} {ingredient.unit} - {ingredient.item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {Array.isArray(recipe.energy) && recipe.energy.length > 0 && (
                        <div>
                          <h5>Energy:</h5>
                          <ul>
                            {recipe.energy.map((energy, i) => (
                              <li key={i}>
                                Calories: {energy.calories}, Protein: {energy.protein}, Carbohydrates: {energy.carbohydrates}, Fat: {energy.fat}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <p>Tags: {Array.isArray(recipe.tags) ? recipe.tags.join(', ') : 'No tags'}</p>
                    </div>
                  ))}
                </ul>
              </div>
            ) : (
              <p>No recipes for this day</p>
            )}
          </div>
        )}
      </div>
    </Popup>
  );
};

export default MealplanPopup;
