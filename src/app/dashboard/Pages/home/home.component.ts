import { Component, Input, OnInit } from '@angular/core';

import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../../../services/auth.service";
import {TokenService} from "../../../services/token.service";


@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styles: [``]
})
export class HomeComponent implements OnInit {
  code= '';

  constructor(
  private activatedRoute: ActivatedRoute,
  private authService: AuthService,
  private tokenService: TokenService
  ) {}

  ngOnInit(): void {
this.activatedRoute.queryParams.subscribe(data => {
  this.code = data['code'];
  this.getToken()
});
  }
getToken():void{
    this.authService.getToken(this.code).subscribe(
      data =>{
        this.tokenService.setToken(data.access_token,data.refresh_token);
      },
      error => {
        console.log(error)}
    )
}

}
