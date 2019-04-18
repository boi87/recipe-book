import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipes.model';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  @Input() recipe: Recipe;
  ingredients: Ingredient[];

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();
  }

  onAddToShoppingList(ingredients: Ingredient[]) {
    // ingredients.map(ingredientItem =>
    // this.shoppingListService.onIngredientAdded(ingredientItem)
    // );
    this.ingredients.push(...ingredients);
    this.shoppingListService.ingredientsChanged.emit(this.ingredients.slice());

    // alert('Ingredients were added to shopping list');
    console.log(ingredients);
    console.log(this.ingredients);
  }
}

// <app-recipe-detail
// *ngIf="selectedRecipe; else infoText"
//   [recipe]="selectedRecipe"
//   ></app-recipe-detail>
//   <!--    <ng-template #infoText><p>Please select a recipe!</p></ng-template>-->
