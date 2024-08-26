import { Injectable } from '@angular/core';
import {environment} from "../environment/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
token_url=environment.token_url;
  constructor(private  http: HttpClient) { }

  public getToken(code: string): Observable<any> {
    let body = new URLSearchParams();
    body.set('grant_type', environment.grant_type);
    body.set('client_id', environment.client_id);
    body.set('redirect_uri', environment.redirect_uri);
    body.set('scope', environment.scope);
    body.set('code_verifier', environment.code_verifier);
    body.set('code', code);

    const basic_auth = 'Basic ' + btoa('client:123456');
    const headers_object = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': '*/*',
      'Authorization': basic_auth,
    });

    const httpOptions = { headers: headers_object };

    return this.http.post<any>(this.token_url, body, httpOptions).pipe(
      catchError(error => {
        console.error('Error al obtener el token:', error);
        return throwError(error);
      })
    );
  }

}
