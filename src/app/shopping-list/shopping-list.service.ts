import { Ingredient } from '../shared/ingredient.model';

import { Subject } from 'rxjs';

export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 2),
    new Ingredient('Oranges', 5)
  ];

  getIngredients() {
    return this.ingredients.slice();
  }

  onIngredientAdded(ingredientAdded: Ingredient) {
    this.ingredients.push(ingredientAdded);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
