import { Injectable } from '@angular/core';
import { environment } from "../environment/environment";
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { Curso, Usuario } from "../interfaces/global.interfaces";
import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CursoService {

  private endpoint: string = environment.endpointCourses;
  private apiUrl: string = this.endpoint + 'cursos';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token: string | null = localStorage.getItem('access_token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }

  getListCursos(): Observable<Curso[]> {
    return this.http.get<Curso[]>(`${this.apiUrl}`, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }

  getCurso(id: number): Observable<Curso> {
    return this.http.get<Curso>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }

  agregarCurso(curso: Curso): Observable<Curso> {
    return this.http.post<Curso>(`${this.apiUrl}`, curso, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }

  actualizarCurso(id: number, curso: Curso): Observable<Curso> {
    return this.http.put<Curso>(`${this.apiUrl}/${id}`, curso, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }

  eliminarCurso(id: number): Observable<Curso> {
    return this.http.delete<Curso>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }

  agregarMatricula(usuario: Usuario, idcurso: number): Observable<Curso> {
    return this.http.put<Curso>(`${this.apiUrl}/asignar-usuario/${idcurso}`, usuario, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }

  eliminarMatricula(usuarioId: number, idcurso: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/eliminar-usuario/${idcurso}?usuarioId=${usuarioId}`, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }
}
