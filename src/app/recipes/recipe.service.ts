import { Recipe } from './recipes.model';
import { EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe(
      'Vino',
      'Rosso',
      'https://s.tannico.it/media/catalog/product/cache/2/thumbnail/0dc2d03fe217f8c83829496872af24a0/8/0/8055681240063_01.jpg',
      [new Ingredient('White Grapes', 100), new Ingredient('Sulphites', 20)]
    ),
    new Recipe(
      'Vino',
      'Bianco',
      'https://s.tannico.it/media/catalog/product/cache/43/thumbnail/0dc2d03fe217f8c83829496872af24a0/b/i/bia_3.jpg',
      [new Ingredient('Red Grapes', 100), new Ingredient('Sulphites', 1)] // thanks to constructor
    )
  ];

  getRecipes() {
    return this.recipes.slice();
  }
}
