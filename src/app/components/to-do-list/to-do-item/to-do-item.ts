import {Component, input, output} from '@angular/core';

export interface Item {
  id: number;
  text: string;
}

@Component({
  selector: 'app-to-do-item',
  imports: [],
  templateUrl: './to-do-item.html',
  styleUrl: './to-do-item.scss',
})
export class ToDoItem {

  readonly item = input.required<Item>();
  readonly deleteItem = output<Item>();

  public delete(item: Item): void {
    this.deleteItem.emit(item);
  }
}
