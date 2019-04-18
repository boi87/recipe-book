import {Component, OnInit, Input} from '@angular/core';
import {Recipe} from '../../recipes.model';
import {RecipeService} from '../../recipe.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe;

  constructor(private recipeService: RecipeService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
  }

  onSelected() {
    this.recipeService.recipeSelected.emit(this.recipe);
    this.router.navigate(['/recipes', this.recipe.id], {relativeTo: this.route});
  }
}
