import { Ingredient } from '../shared/ingredient.model';
import { EventEmitter } from '@angular/core';

export class ShoppingListService {
  ingredientAdded = new EventEmitter<Ingredient>();

  private ingredients: Ingredient[] = [
    new Ingredient('Grapes', 50),
    new Ingredient('Sulphites', 5)
  ];

  getIngredients() {
    return this.ingredients.slice();
  }
}
