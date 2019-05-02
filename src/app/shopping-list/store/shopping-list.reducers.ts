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

    case ShoppingListActions.UPDATE_INGREDIENT:
      const ingredient = state.ingredients[state.editedIngredientIndex];
      const updatedIngredient = { ...ingredient, ...action.payload.ingredient };

      const ingredients = [...state.ingredients];
      ingredients[state.editedIngredientIndex] = updatedIngredient;
      return {
        ...state,
        ingredients,
        editedIngredient: null,
        editedIngredientIndex: -1
      };

    case ShoppingListActions.DELETE_INGREDIENT:
      const oldIngredients = [...state.ingredients];
      oldIngredients.splice(state.editedIngredientIndex, 1);
      return {
        ...state,
        ingredients: oldIngredients,
        editedIngredient: null,
        editedIngredientIndex: -1
      };

    case ShoppingListActions.START_EDIT:
      const editedIngredient = { ...state.ingredients[action.payload] };
      return {
        ...state,
        editedIngredient,
        editedIngredientIndex: action.payload
      };

    case ShoppingListActions.STOP_EDIT:
      return {
        ...state,
        editedIngredient = null,
        editedIngredientIndex: -1
      };

    default:
      return state;
  }
}
