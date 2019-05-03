import { Component, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from '../recipes.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import * as fromRecipe from '../store/recipe.reducers';
import * as RecipeListActions from '../store/recipe.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipeState: Observable<fromRecipe.State>;
  recipeChangedSubscription: Subscription;

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromRecipe.FeatureState>
  ) {}

  ngOnInit() {
    this.recipeState = this.store.select('recipes'); // 'recipeState' because it's the name we specified in the store module, in the forRoot
    // this.recipeChangedSubscription = this. recipeService.recipeChanged;
    //   .subscribe(
    //   (recipeState: Recipe[]) => {
    //     this.recipeState = recipeState;
    //   }
    // );
    // this.recipeState = this.recipeService.getRecipes();
  }

  onNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  ngOnDestroy() {
    // this.recipeChangedSubscription.unsubscribe();
  }
}
