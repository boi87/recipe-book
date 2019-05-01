import { Ingredient } from '../shared/ingredient.model';
import * as ShoppingListActions from './store/shopping-list.actions';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';

export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();

  private store: Store<{
    shoppingList: { ingredients: Ingredient[] };
  }>;

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 2),
    new Ingredient('Oranges', 5)
  ];

  getIngredient(index: number) {
    return this.ingredients[index];
  }

  clearAll() {
    this.ingredients.splice(0);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
