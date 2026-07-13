import { MacroTargets } from '../types/nutrition';

export const calculateMSJ = (
  gender: 'male' | 'female',
  weightKg: number,
  heightCm: number,
  age: number,
  activityMultiplier: number = 1.2
): number => {
  let bmr = 10 * weightKg + 6.25 * heightCm - 5 * age;
  if (gender === 'male') {
    bmr += 5;
  } else {
    bmr -= 161;
  }
  return Math.round(bmr * activityMultiplier);
};

export const getMacroTargets = (
  totalCalories: number,
  weightKg: number,
  goal: 'recomp' | 'loss' | 'build' = 'recomp'
): MacroTargets => {
  let proteinPerKg = 2.1; // Default recomp
  let fatPerKg = 0.9;

  if (goal === 'loss') {
    proteinPerKg = 2.3;
    fatPerKg = 0.8;
  } else if (goal === 'build') {
    proteinPerKg = 1.9;
    fatPerKg = 1.0;
  }

  const proteinGrams = Math.round(weightKg * proteinPerKg);
  const fatGrams = Math.round(weightKg * fatPerKg);
  
  // Protein = 4 cal/g, Fat = 9 cal/g, Carbs = 4 cal/g
  const proteinCals = proteinGrams * 4;
  const fatCals = fatGrams * 9;
  const remainingCals = totalCalories - (proteinCals + fatCals);
  const carbGrams = Math.max(0, Math.round(remainingCals / 4));

  return {
    calories: totalCalories,
    protein: proteinGrams,
    carbs: carbGrams,
    fat: fatGrams,
  };
};
