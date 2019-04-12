import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent {
  // @Output() ingredientWasAdded: Ingredient = new EventEmitter<Ingredient>()

  ingredients: Ingredient[] = [
    new Ingredient('Grapes', 50),
    new Ingredient('Sulphites', 5)
  ];

  onIngredientAdded(ingredient: { name: string; amount: number }) {
    this.ingredients.push(new Ingredient(ingredient.name, ingredient.amount));
  }
}
