import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipes.model';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ShoppingListService } from '../../shopping-list/shopping-list.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;
  ingredients: Ingredient[];

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private shoppingListService: ShoppingListService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params.id;
      this.recipe = this.recipeService.getRecipe(this.id);
    });
    console.log(this.id);
  }

  onAddToShoppingList(ingredients: Ingredient[]) {
    ingredients.map(ingredientItem =>
      this.shoppingListService.onIngredientAdded(ingredientItem)
    );
  }

  onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }
}
