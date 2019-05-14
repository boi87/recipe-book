import { Component, EventEmitter, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as RecipeActions from '../recipes/store/recipe.actions';
import * as fromApp from '../shopping-list/store/shopping-list.reducers';

// import { EventEmitter } from "events";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  recipesVisibility = new EventEmitter<boolean>();
  shoppingListVisibility = new EventEmitter<boolean>();

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {}

  onFetchData() {
    this.store.dispatch(new RecipeActions.FetchRecipes());
  }

  onSaveData() {
    this.store.dispatch(new RecipeActions.StoreRecipes());
  }
}
