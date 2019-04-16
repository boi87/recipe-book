import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
  // providers: [ShoppingListService]
})
export class ShoppingEditComponent implements OnInit {
  // @Output() ingredientAdded = new EventEmitter<Ingredient>();

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit() {}

  onAddIngredient(ingredient, amount) {
    this.shoppingListService.onIngredientAdded(
      new Ingredient(ingredient.value, amount.value)
    );
  }
}
