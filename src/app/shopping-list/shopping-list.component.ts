import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { stringify } from '@angular/core/src/util';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent {
  ingredients: Ingredient[];
  ingredientAdded: Ingredient;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();
    this.shoppingListService.ingredientsChanged.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }
    );

    // this.shoppingListService.ingredientAdded.subscribe(ingredientAdded => {
    //   this.ingredients.push = ingredientAdded;
    // });
  }

  //   onIngredientAdded(ingredient: { name: string; amount: number }) {
  //     this.ingredients.push(new Ingredient(ingredient.name, ingredient.amount));
  //   }
}
