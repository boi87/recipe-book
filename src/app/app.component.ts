import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "Recipe Book";
  recipesVisibility;
  shoppingListVisibility;
  constructor() {}

  ngOnInit() {}

  onRecipesVisibilityFired(visible: boolean) {
    console.log("recipeState visibility in app,", visible);
    this.recipesVisibility = visible;
  }

  onShoppingListVisibilityFired(visible: boolean) {
    console.log("shopping visibility in app,", visible);
    this.shoppingListVisibility = visible;
  }
}
