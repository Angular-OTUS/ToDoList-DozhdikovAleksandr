import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ROUTE_PATH} from '../../app.routes';
import {RouterLink, RouterLinkActive} from '@angular/router';


@Component({
  selector: 'app-menu',
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Menu {
  readonly ROUTE_PATH = ROUTE_PATH;
}
