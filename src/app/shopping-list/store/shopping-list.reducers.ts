import * as ShoppingListActions from './shopping-list.actions';

import { Ingredient } from '../../shared/ingredient.model';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';

const initialState = {
  ingredients: [new Ingredient('Apples', 2), new Ingredient('Oranges', 5)]
};

export function shoppingListReducer(
  state = initialState,
  action: ShoppingListActions.ShoppingListActions
) {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      //     const check = this.ingredients.map(
      //       e => e.name.toLowerCase() === ingredientAdded.name.toLowerCase()
      //     );
      //     const dupe = check.indexOf(true) !== -1;
      //     console.log(check);
      //     console.log(check.indexOf(true) !== -1);
      //
      //     if (dupe) {
      //       console.log('its a dupe');
      //       this.ingredients.map(e => {
      //         if (e.name.toLowerCase() === ingredientAdded.name.toLowerCase()) {
      //           // e.amount = ingredientAdded.amount + e.amount;
      //           e.amount += ingredientAdded.amount;
      //         }
      //       });
      //
      //       // this.shoppingListState['ingredientAdded.amount'] += ingredientAdded.amount;
      //     } else {
      //       this.ingredients.push(ingredientAdded);
      //       this.ingredientsChanged.next(this.ingredients.slice());
      //     }
      // }

      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      };
    case ShoppingListActions.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload]
      };

    case ShoppingListActions.UPDATE_INGREDIENT:
      const ingredient = state.ingredients[action.payload.index];
      const updatedIngredient = {
        ...ingredient,
        ...action.payload.ingredient
      };
      const ingredients = [...state.ingredients];
      ingredients[action.payload.index] = updatedIngredient;
      return {
        ...state,
        ingredients: ingredients
      };

    case ShoppingListActions.DELETE_INGREDIENT:
      const oldIngredients = [...state.ingredients];
      oldIngredients.splice(action.payload, 1);
      return {
        ...state,
        ingredients: oldIngredients
      };

    default:
      return state;
  }

  return state;
}
