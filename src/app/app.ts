import { Component } from '@angular/core';
import {Toast} from './components/toast/toast';
import {RouterOutlet} from '@angular/router';
import {Menu} from './components/menu/menu';

@Component({
  selector: 'app-root',
  imports: [Toast, RouterOutlet, Menu],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {

}
