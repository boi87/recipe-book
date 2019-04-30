import { Ingredient } from '../shared/ingredient.model';
import * as ShoppingListActions from './store/shopping-list.actions';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';

export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();

  private store: Store<{ shoppingList: { ingredients: Ingredient[] } }>;

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 2),
    new Ingredient('Oranges', 5)
  ];

  getIngredients() {
    return this.ingredients.slice();
  }

  getIngredient(index: number) {
    return this.ingredients[index];
  }

  onIngredientAdded(ingredientAdded: Ingredient) {
    // this.store.dispatch(new ShoppingListActions.AddIngredients());

    const check = this.ingredients.map(
      e => e.name.toLowerCase() === ingredientAdded.name.toLowerCase()
    );
    const dupe = check.indexOf(true) !== -1;
    console.log(check);
    console.log(check.indexOf(true) !== -1);

    if (dupe) {
      console.log('its a dupe');
      this.ingredients.map(e => {
        if (e.name.toLowerCase() === ingredientAdded.name.toLowerCase()) {
          // e.amount = ingredientAdded.amount + e.amount;
          e.amount += ingredientAdded.amount;
        }
      });

      // this.shoppingListState['ingredientAdded.amount'] += ingredientAdded.amount;
    } else {
      this.ingredients.push(ingredientAdded);
      this.ingredientsChanged.next(this.ingredients.slice());
    }
  }

  updateIngredient(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    this.ingredientsChanged.next(this.ingredients);
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  clearAll() {
    this.ingredients.splice(0);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
