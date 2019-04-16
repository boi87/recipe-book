import { Ingredient } from '../shared/ingredient.model';
import { EventEmitter } from '@angular/core';

export class ShoppingListService {
  ingredientsChanged = new EventEmitter<Ingredient[]>();

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 2),
    new Ingredient('Oranges', 5)
  ];

  getIngredients() {
    return this.ingredients.slice();
  }

  onIngredientAdded(ingredientAdded: Ingredient) {
    this.ingredients.push(ingredientAdded);
    this.ingredientsChanged.emit(this.ingredients.slice());
  }
}
