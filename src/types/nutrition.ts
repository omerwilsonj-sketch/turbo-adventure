export interface MacroTargets {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface FoodItem {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  serving_size: string;
}

export interface FoodLog {
  id?: string;
  user_id: string;
  date: string;
  food_name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  servings: number;
}

export interface DailyNutritionSummary {
  consumed: MacroTargets;
  targets: MacroTargets;
}
