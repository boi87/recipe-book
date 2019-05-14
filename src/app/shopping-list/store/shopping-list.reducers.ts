import * as ShoppingListActions from './shopping-list.actions';

import { Ingredient } from '../../shared/ingredient.model';
import Swal from 'sweetalert2';

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
      console.log(action.payload);
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
      Swal.fire({
        type: 'success',
        text: 'Ingredient updated!',
        title: 'Well done!'
      });
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
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
      });

      Toast.fire({
        type: 'warning',
        title: 'Ingredient deleted'
      });

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
        editedIngredient: null,
        editedIngredientIndex: -1
      };
    default:
      return state;
  }
}
