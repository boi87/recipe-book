import { Recipe } from '../recipes.model';
import { Ingredient } from '../../shared/ingredient.model';
import * as RecipeActions from './recipe.actions';

export interface FeatureState {
  recipes: State;
}

export interface State {
  recipes: Recipe[];
}

const initialState: State = {
  recipes: [
    new Recipe(
      1,
      'Wine',
      'Red, full bodied.',
      'https://s.tannico.it/media/catalog/product/cache/2/thumbnail/0dc2d03fe217f8c83829496872af24a0/8/0/8055681240063_01.jpg',
      [new Ingredient('Red Grapes', 100), new Ingredient('Sulphites', 20)]
    ),
    new Recipe(
      2,
      'Wine',
      'White, crisp and refreshing',
      'https://s.tannico.it/media/catalog/product/cache/43/thumbnail/0dc2d03fe217f8c83829496872af24a0/b/i/bia_3.jpg',
      [new Ingredient('White Grapes', 100), new Ingredient('Sulphites', 1)] // thanks to constructor
    )
  ]
};

export function recipeReducer(
  state = initialState,
  action: RecipeActions.RecipeActions
) {
  switch (action.type) {
    case RecipeActions.SET_RECIPES:
      return { ...state, recipes: [...action.payload] };

    case RecipeActions.ADD_RECIPE:
      return { ...state, recipes: [...state.recipes, action.payload] };

    case RecipeActions.UPDATE_RECIPE:
      // return {
      //   ...state,
      //   recipeState: {
      //     ...state.recipeState,
      //     ...(state.recipeState[action.payload.index] =
      //       action.payload.updatedRecipe)
      //   }
      // };
      // MAX SOLUTION
      const recipe = state.recipes[action.payload.index];
      const updatedRecipe = { ...recipe, ...action.payload.updatedRecipe };
      const recipes = [...state.recipes];
      recipes[action.payload.index] = updatedRecipe;
      return {
        ...state,
        recipes: recipes
      };

    case RecipeActions.DELETE_RECIPE:
      return {
        ...state,
        recipes: {
          ...state.recipes.splice(action.payload, 1)
        }
      };

    default:
      return state;
  }
}
