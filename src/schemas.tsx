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
};

export type GenerateMealPlan = {
  targets: number[],
  split_days: number[]
}

export type Recipe = {
title: string
servings: number
instructions: string
url: string
energy: Energy[]
ingredients: Ingredient[]
tags: string[]
}

type Energy = {
calories: number
protein: number
carbohydrates: number
fat: number
}
  
type Ingredient = {
amount: number
unit: string
item: string
}