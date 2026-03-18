import { Component } from '@angular/core';
import {Toast} from './components/toast/toast';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [Toast, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {

}
