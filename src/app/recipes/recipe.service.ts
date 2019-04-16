import { Recipe } from './recipes.model';
import { EventEmitter } from '@angular/core';
// import {Recipe} from './recipes.model';

export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe(
      'Vino',
      'Rosso',
      'https://s.tannico.it/media/catalog/product/cache/2/thumbnail/0dc2d03fe217f8c83829496872af24a0/8/0/8055681240063_01.jpg'
    ),
    new Recipe(
      'Vino',
      'Bianco',
      'https://s.tannico.it/media/catalog/product/cache/43/thumbnail/0dc2d03fe217f8c83829496872af24a0/b/i/bia_3.jpg'
    )
  ];

  getRecipes() {
    return this.recipes.slice();
  }
}
