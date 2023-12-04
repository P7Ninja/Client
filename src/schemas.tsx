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