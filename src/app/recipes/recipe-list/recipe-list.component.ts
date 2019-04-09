import { Component, OnInit } from "@angular/core";
import { Recipe } from "../recipes.model";

@Component({
  selector: "app-recipe-list",
  templateUrl: "./recipe-list.component.html",
  styleUrls: ["./recipe-list.component.css"]
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe(
      "Vino",
      "Rosso",
      "https://s.tannico.it/media/catalog/product/cache/2/thumbnail/0dc2d03fe217f8c83829496872af24a0/8/0/8055681240063_01.jpg"
    ),
    new Recipe(
      "Vino",
      "Rosso",
      "https://s.tannico.it/media/catalog/product/cache/2/thumbnail/0dc2d03fe217f8c83829496872af24a0/8/0/8055681240063_01.jpg"
    )
  ];
  constructor() {}

  ngOnInit() {}
}
