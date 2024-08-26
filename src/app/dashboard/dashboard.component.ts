import { Component } from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {sidemenuComponent} from "../shared/sidemenu/side-menu.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet, sidemenuComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']  // Referencia al archivo CSS
})
export class DashboardComponent { }
