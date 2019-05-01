import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromShoppingList from '../store/shopping-list.reducers';
@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') shoppingListForm: NgForm;
  subscription: Subscription;
  editMode = false;
  deleteMode = false;
  clearMode = false;
  // editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private store: Store<fromShoppingList.AppState>) {}

  ngOnInit() {
    this.subscription = this.store.select('shoppingList').subscribe(data => {
      if (data.editedIngredientIndex > -1) {
        this.editedItem = data.editedIngredient;
        this.editMode = true;
        this.shoppingListForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        });
      } else {
        this.editMode = false;
      }
    });
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    // console.log(value);
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode && !this.deleteMode) {
      this.store.dispatch(
        new ShoppingListActions.UpdateIngredient(newIngredient)
      );
      form.reset();
      this.editMode = false;
    } else if (this.editMode && this.deleteMode) {
      this.store.dispatch(
        new ShoppingListActions.DeleteIngredient(this.editedItemIndex)
      );
      form.reset();
      this.editMode = false;
      this.deleteMode = false;
    } else {
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
      form.reset();
    }
  }

  onDelete() {
    this.deleteMode = true;
  }

  onClear() {
    // this.shoppingListService.clearAll();
    this.shoppingListForm.reset();
    this.editMode = false;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
