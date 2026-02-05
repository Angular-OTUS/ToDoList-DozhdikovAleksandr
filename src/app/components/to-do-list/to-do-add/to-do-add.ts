import {ChangeDetectionStrategy, Component, output} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatFormField, MatInput} from '@angular/material/input';

@Component({
  selector: 'app-to-do-add',
  imports: [
    FormsModule,
    MatInput,
    MatFormField
  ],
  templateUrl: './to-do-add.html',
  styleUrl: './to-do-add.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToDoAdd {
  textValue: string = '';

  readonly addItem = output<string>();

  public add(text: string): void {

    if (!text.length) {
      return;
    }
    this.addItem.emit(text);
    this.textValue = '';
  }
}
