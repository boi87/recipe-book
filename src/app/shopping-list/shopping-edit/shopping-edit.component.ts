import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../store/shopping-list.actions';
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
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(
    private shoppingListService: ShoppingListService,
    private store: Store<{ shoppingList: { ingredients: Ingredient[] } }>
  ) {}

  ngOnInit() {
    this.subscription = this.shoppingListService.startedEditing.subscribe(
      (index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.shoppingListService.getIngredient(index);
        this.shoppingListForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        });
      }
    );
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    console.log(value);
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode && !this.deleteMode) {
      this.shoppingListService.updateIngredient(
        this.editedItemIndex,
        newIngredient
      );
      form.reset();
      this.editMode = false;
    } else if (this.editMode && this.deleteMode) {
      this.shoppingListService.deleteIngredient(this.editedItemIndex);
      form.reset();
      this.editMode = false;
      this.deleteMode = false;
    } else {
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));

      // this.shoppingListService.onIngredientAdded(newIngredient);
      form.reset();
    }
  }

  onDelete() {
    this.deleteMode = true;
  }

  onClear() {
    this.shoppingListService.clearAll();
    this.shoppingListForm.reset();
    this.editMode = false;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
