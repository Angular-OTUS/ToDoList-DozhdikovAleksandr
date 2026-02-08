import {Component, input} from '@angular/core';

@Component({
  selector: 'app-button-component',
  templateUrl: './button-component.html',
  styleUrl: './button-component.scss',
})
export class ButtonComponent {
  title = input.required<string>();
}
