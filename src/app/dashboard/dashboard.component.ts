import { Component } from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {sidemenuComponent} from "../shared/sidemenu/side-menu.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet, sidemenuComponent],
  templateUrl: './dashboard.component.html',
  styles: `.content-container {
    width: 100%;
    height: 100%;
    transition: all 0.3s ease-in-out;
  }

  @media (min-width: 1024px) {
    .content-container {
      width: 80%;
      margin-left: auto; /* 56px */
    }
  }
  @media (width: 768px) {
    .content-container {
      width: 80%;
      margin-left: auto; /* 56px */
    }
  }
  @media (max-width: 640px) {
    .content-container {
      width: 80%;
      margin-left: auto; /* 56px */
    }
  }`
})
export class DashboardComponent {

}
