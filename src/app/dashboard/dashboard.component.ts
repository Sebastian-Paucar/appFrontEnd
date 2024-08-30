
import { Component, OnInit } from '@angular/core';

import { sidemenuComponent } from "../shared/sidemenu/side-menu.component";
import {RouterOutlet} from "@angular/router";


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [sidemenuComponent, RouterOutlet],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent  {

}
