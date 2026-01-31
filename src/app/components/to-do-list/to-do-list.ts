import { Component } from '@angular/core';
import {Item, ToDoItem} from './to-do-item/to-do-item';
import {ToDoAdd} from './to-do-add/to-do-add';

@Component({
  selector: 'app-to-do-list',
  imports: [
    ToDoAdd,
    ToDoItem
  ],
  templateUrl: './to-do-list.html',
  styleUrl: './to-do-list.scss',
})

export class ToDoList {
  public items: Item[] = [
    {
      id: 1,
      text: "Нужно что-то сделать (1)..."
    },
    {
      id: 2,
      text: "Нужно что-то сделать (2)..."
    },
  ];

  public deleteItem(item: Item): void {
    this.items = this.items.filter(element => element.id !== item.id);
  }

  public addItem(text: string): void {
    const maxId: number = Math.max(...this.items.map(obj => obj.id));
    this.items.push({id: maxId + 1, text});
    console.log(this.items);
  }
}
