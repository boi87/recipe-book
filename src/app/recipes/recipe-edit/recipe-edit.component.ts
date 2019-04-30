import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipes.model';
import { Ingredient } from '../../shared/ingredient.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styles: []
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params.id;
      this.editMode = params.id != null;
      console.log(this.editMode);
      this.initForm();
    });
  }

  onSubmit() {
    const newRecipe = new Recipe(
      this.id,
      this.recipeForm.value.name,
      this.recipeForm.value.description,
      this.recipeForm.value.imagepath,
      this.recipeForm.value.shoppingListState
    );

    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, newRecipe);
      this.onCancel();
    } else {
      this.recipeService.addRecipe(newRecipe);
      this.onCancel();
    }
  }

  // onSubmit() {
  //   console.log(this.recipeForm);
  //   if (this.editMode) {
  //     this.recipeService.updateRecipe(this.id, this.recipeForm.value);
  //   } else {
  //     this.recipeService.addRecipe(this.recipeForm.value);
  //   }
  // }

  onAddIngredient() {
    (this.recipeForm.get('shoppingListState') as FormArray).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    );
  }

  onCancel() {
    this.editMode = false;
    this.recipeForm.reset();
    this.router.navigate(['..'], { relativeTo: this.route });
  }

  onDeleteIngredient(index: number) {
    (this.recipeForm.get('shoppingListState') as FormArray).removeAt(index);
  }

  private initForm() {
    let recipeName = '';
    let recipeDescription = '';
    let recipeImagePath = '';
    const recipeIngredients = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeDescription = recipe.description;
      recipeImagePath = recipe.imagePath;
      if (recipe.ingredients) {
        recipe.ingredients.map(ingr =>
          recipeIngredients.push(
            new FormGroup({
              name: new FormControl(ingr.name, Validators.required),
              amount: new FormControl(
                ingr.amount,
                Validators.pattern(/^[1-9]+[0-9]*$/)
              )
            })
          )
        );
      }
    }
    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      imagepath: new FormControl(recipeImagePath, Validators.required),
      description: new FormControl(recipeDescription, Validators.required),
      ingredients: recipeIngredients
    });
  }
}
