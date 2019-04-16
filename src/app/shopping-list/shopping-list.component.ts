import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { stringify } from '@angular/core/src/util';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  providers: [ShoppingListService]
})
export class ShoppingListComponent {
  ingredients: Ingredient[];

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();
    // this.shoppingListService.ingredientAdded.subscribe(
    //   (ingredients: Ingredient) => {
    //     this.ingredients = ingredients;
    //   }
    // );
  }

  //   onIngredientAdded(ingredient: { name: string; amount: number }) {
  //     this.ingredients.push(new Ingredient(ingredient.name, ingredient.amount));
  //   }
}
