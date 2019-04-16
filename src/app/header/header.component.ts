import { Component, OnInit, Output, EventEmitter } from '@angular/core';
// import { EventEmitter } from "events";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() recipesVisibilityFired = new EventEmitter<boolean>();
  @Output() ShoppingListVisibilityFired = new EventEmitter<boolean>();
  recipesVisible = false;
  shoppingListVisible = false;
  constructor() {}

  ngOnInit() {}

  toggleRecipesVisibility() {
    this.recipesVisible = !this.recipesVisible;
    this.shoppingListVisible = false;
    this.ShoppingListVisibilityFired.emit(this.shoppingListVisible);
    this.recipesVisibilityFired.emit(this.recipesVisible);
  }

  toggleShoppingListVisibility() {
    this.shoppingListVisible = !this.shoppingListVisible;
    this.recipesVisible = false;
    this.recipesVisibilityFired.emit(this.recipesVisible);
    this.ShoppingListVisibilityFired.emit(this.shoppingListVisible);
  }
}
