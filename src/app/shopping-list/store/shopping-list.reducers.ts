import * as ShoppingListActions from './shopping-list.actions';

import { Ingredient } from '../../shared/ingredient.model';

export interface AppState {
  shoppingList: State;
}

export interface State {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
}
// export const ADD_INGREDIENT = 'ADD_INGREDIENT';

const initialState: State = {
  ingredients: [new Ingredient('Apples', 2), new Ingredient('Oranges', 5)],
  editedIngredient: null,
  editedIngredientIndex: -1
};

export function shoppingListReducer(
  state = initialState,
  action: ShoppingListActions.ShoppingListActions
) {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload].reduce(
          (arr, ing) => {
            const index = arr.findIndex(
              x => x.name.trim().toLowerCase() === ing.name.trim().toLowerCase()
            );
            if (index !== -1) {
              arr[index].amount += ing.amount;
            } else {
              arr.push(ing);
            }
            return arr;
          },
          []
        )
      };

    case ShoppingListActions.ADD_INGREDIENT:
    case ShoppingListActions.UPDATE_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload].reduce(
          (arr, ing) => {
            const index = arr.findIndex(
              x => x.name.trim().toLowerCase() === ing.name.trim().toLowerCase()
            );
            if (index !== -1) {
              arr[index].amount += ing.amount;
            } else {
              arr.push(ing);
            }
            return arr;
          },
          []
        )
      };
    case ShoppingListActions.DELETE_INGREDIENT:
      const oldIngredients = [...state.ingredients];
      oldIngredients.splice(action.payload, 1);
      return {
        ...state,
        ingredients: oldIngredients
      };

    case ShoppingListActions.START_EDIT:
      const editedIngredient = { ...state.ingredients[action.payload] };
      return {
        ...state,
        editedIngredient,
        editedIngredientIndex: action.payload
      };

    default:
      return state;
  }
}
