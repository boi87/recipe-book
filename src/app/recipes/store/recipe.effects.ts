import {Actions, Effect, ofType} from '@ngrx/effects';
import * as RecipeActions from './recipe.actions';
import * as fromRecipe from './recipe.reducers';
import {catchError, map, mergeMap, switchMap, withLatestFrom} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {Recipe} from '../recipes.model';
import {HttpClient, HttpRequest} from '@angular/common/http';
import {Store} from '@ngrx/store';

@Injectable()
export class RecipeEffects {
  @Effect()
  recipeFetch = this.actions$.pipe(
    ofType(RecipeActions.FETCH_RECIPES),
    mergeMap((action : any) => {
      return this.httpClient.get<Recipe[]>('http://localhost:3000/recipes');
    }),
    map(data => {
      return {
        type: RecipeActions.SET_RECIPES,
        payload: data
      };
    })
  );

  @Effect({dispatch: false})
  recipeStore = this.actions$.pipe(
    ofType(RecipeActions.STORE_RECIPES),
    withLatestFrom(this.store.select('recipes')),
    switchMap(([action, state]) => {
      const req = new HttpRequest(
        'PUT',
        'http://localhost:3000/recipes',
        state.recipes,
        {reportProgress: true}
      );
      return this.httpClient.request(req);
    })
  );

  @Effect()
  recipeIngredientsUpdate = this.actions$.pipe(
    ofType(RecipeActions.UPDATE_RECIPE),
    switchMap((action : RecipeActions.UpdateRecipe) => {
      return this.httpClient
        .post<Recipe[]>(`http://localhost:3000/recipes/${action.payload.index}`, action.payload.updatedRecipe)
        .pipe(
          switchMap((data : Recipe[]) => {
            console.log(data);
            return [{
              type: RecipeActions.SET_RECIPES,
              payload: data
            }];
          }),
          catchError((error) => {
            console.log(error);
            return [{
              type: 'ERROR',
            }];
          })
        );
    }),
    // catchError((error) => {
    //   console.log(error);
    //   return {
    //     type: 'ERROR',
    //   };
    // })
  );

  constructor(
    private actions$ : Actions,
    private httpClient : HttpClient,
    private store : Store<fromRecipe.FeatureState>
  ) {
  }
}
