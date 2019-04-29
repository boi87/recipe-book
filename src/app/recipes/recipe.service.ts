import { Recipe } from './recipes.model';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

export class RecipeService {
  recipeChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe(
      1,
      'Wine',
      'Red, full bodied.',
      'https://s.tannico.it/media/catalog/product/cache/2/thumbnail/0dc2d03fe217f8c83829496872af24a0/8/0/8055681240063_01.jpg',
      [new Ingredient('Red Grapes', 100), new Ingredient('Sulphites', 20)]
    ),
    new Recipe(
      2,
      'Wine',
      'White, crisp and refreshing',
      'https://s.tannico.it/media/catalog/product/cache/43/thumbnail/0dc2d03fe217f8c83829496872af24a0/b/i/bia_3.jpg',
      [new Ingredient('White Grapes', 100), new Ingredient('Sulphites', 1)] // thanks to constructor
    )
  ];

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipeChanged.next(this.recipes.slice());
  }
}
