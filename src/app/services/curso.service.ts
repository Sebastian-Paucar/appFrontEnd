import { Injectable } from '@angular/core';
import {environment} from "../environment/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Curso,Usuario} from "../interfaces/global.interfaces";

@Injectable({
  providedIn: 'root'
})
export class CursoService {


  private endpoint: string = environment.endpointCourses;
  private apiUrl: string = this.endpoint + 'cursos';

  constructor(private http: HttpClient) {}

  // Métodos para operaciones con autores

  getListCursos(): Observable<Curso[]> {
    return this.http.get<Curso[]>(`${this.apiUrl}`);
  }

  getCurso(id: number): Observable<Curso> {
    return this.http.get<Curso>(`${this.apiUrl}/${id}`);
  }

  agregarCurso(curso: Curso): Observable<Curso> {
    return this.http.post<Curso>(`${this.apiUrl}`, curso);
  }

  actualizarCurso(id: number, curso: Curso): Observable<Curso> {
    return this.http.put<Curso>(`${this.apiUrl}/${id}`, curso);
  }

  eliminarCurso(id: number): Observable<Curso> {
    return this.http.delete<Curso>(`${this.apiUrl}/${id}`);
  }

  agregarMatricula(usuario: Usuario, idcurso: number): Observable<Curso> {
    return this.http.put<Curso>(`${this.apiUrl}/asignar-usuario/${idcurso}`, usuario);
  }
  eliminarMatricula(usuarioId: number, idcurso: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/eliminar-usuario/${idcurso}?usuarioId=${usuarioId}`);
  }

}
