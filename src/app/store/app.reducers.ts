import { ActionReducerMap } from '@ngrx/store';

import * as fromShoppingList from '../shopping-list/store/shopping-list.reducers';
// import * as fromAuth from '../auth/store/auth.reducers'; // add later with auth part

export interface AppState {
  shoppingList: fromShoppingList.State;
  // auth: fromAuth.state // add later with auth part
}

export const reducers: ActionReducerMap<AppState> = {
  shoppingList: fromShoppingList.shoppingListReducer
  // auth: fromAuth.authReducer
};
