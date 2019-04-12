import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  Input,
  ChangeDetectionStrategy
} from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent {
  @Output() ingredientAdded = new EventEmitter<{
    name: string;
    amount: number;
  }>();
}
