import { Component, OnInit, Output, EventEmitter } from "@angular/core";
// import { EventEmitter } from "events";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
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
    this.recipesVisibilityFired.emit(this.recipesVisible);
    console.log(this.recipesVisible);
  }

  toggleShoppingListVisibility() {
    this.shoppingListVisible = !this.shoppingListVisible;
    this.ShoppingListVisibilityFired.emit(this.shoppingListVisible);
    console.log(this.shoppingListVisible);
  }
}
