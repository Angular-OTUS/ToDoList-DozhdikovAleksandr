import {ChangeDetectionStrategy, Component, output, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatFormField, MatInput} from '@angular/material/input';
import {ButtonComponent} from '../../button-component/button-component';

@Component({
  selector: 'app-to-do-add',
  imports: [
    FormsModule,
    MatInput,
    MatFormField,
    ButtonComponent,
  ],
  templateUrl: './to-do-add.html',
  styleUrl: './to-do-add.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToDoAdd {
  textValue = signal<string>('');

  readonly addItem = output<string>();

  public add(text: string): void {

    if (!text.length) {
      return;
    }
    this.addItem.emit(text);
    this.textValue.set('');
  }
}
