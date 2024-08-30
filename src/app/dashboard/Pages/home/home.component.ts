import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { TokenService } from '../../../services/token.service';
import {
  MatCardTitle,
  MatCardModule,
  MatCardFooter,
  MatCard,
  MatCardHeader,
  MatCardContent
} from '@angular/material/card';
@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  imports: [
    MatCardFooter,
    MatCard,
    MatCardTitle,
    MatCardHeader,
    MatCardContent
  ],
  styles: [``]
})
export class HomeComponent  {



}
