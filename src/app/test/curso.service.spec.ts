import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { environment } from '../environment/environment';
import {Curso, cursoUsuarios, Usuario} from '../interfaces/global.interfaces';
import {CursoService} from "../services/curso.service";

describe('CursoService', () => {
  let service: CursoService;
  let httpMock: HttpTestingController;
  const apiUrl = `${environment.endpointCourses}cursos`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CursoService]
    });

    service = TestBed.inject(CursoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('debe crearse', () => {
    // @ts-ignore
    expect(service).toBeTruthy();
  });

  describe('getListCursos', () => {
    it('debe recuperar una lista de cursos', () => {
      const mockCursos: Curso[] = [
        { id: 1, nombre: 'Curso 1', cursoUsuarios: [] },
        { id: 2, nombre: 'Curso 2', cursoUsuarios: [] }
      ];

      service.getListCursos().subscribe(cursos => {
        // @ts-ignore
        expect(cursos.length).toBe(2);
        // @ts-ignore
        expect(cursos).toEqual(mockCursos);
      });

      const req = httpMock.expectOne(apiUrl);
      // @ts-ignore
      expect(req.request.method).toBe('GET');
      req.flush(mockCursos);
    });
  });

  describe('getCurso', () => {
    it('debe recuperar un solo curso por ID', () => {
      const mockCurso: Curso = { id: 1, nombre: 'Curso 1', cursoUsuarios: [] };

      service.getCurso(1).subscribe(curso => {
        // @ts-ignore
        expect(curso).toEqual(mockCurso);
      });

      const req = httpMock.expectOne(`${apiUrl}/1`);
      // @ts-ignore
      expect(req.request.method).toBe('GET');
      req.flush(mockCurso);
    });
  });

  describe('agregarCurso', () => {
    it('añadir un nuevo curso', () => {
      const newCurso: Curso = { id: 1, nombre: 'Curso Nuevo', cursoUsuarios: [] };

      service.agregarCurso(newCurso).subscribe(curso => {
        // @ts-ignore
        expect(curso).toEqual(newCurso);
      });

      const req = httpMock.expectOne(apiUrl);
      // @ts-ignore
      expect(req.request.method).toBe('POST');
      req.flush(newCurso);
    });
  });

  describe('actualizarCurso', () => {
    it('actualizar un curso existente', () => {
      const updatedCurso: Curso = { id: 1, nombre: 'Curso Actualizado', cursoUsuarios: [] };

      service.actualizarCurso(1, updatedCurso).subscribe(curso => {
        // @ts-ignore
        expect(curso).toEqual(updatedCurso);
      });

      const req = httpMock.expectOne(`${apiUrl}/1`);
      // @ts-ignore
      expect(req.request.method).toBe('PUT');
      req.flush(updatedCurso);
    });
  });

  describe('eliminarCurso', () => {
    it('eliminar un curso por ID', () => {
      service.eliminarCurso(1).subscribe(curso => {
        // @ts-ignore
        expect(curso.id).toBe(1);
      });

      const req = httpMock.expectOne(`${apiUrl}/1`);
      // @ts-ignore
      expect(req.request.method).toBe('DELETE');
      req.flush({ id: 1, nombre: 'Curso Eliminado', cursoUsuarios: [] });
    });
  });

  describe('agregarMatricula', () => {
    it('añadir un usuario a un curso', () => {
      const usuario: Usuario = { id: 1, nombre: 'Usuario 1', email: 'usuario1@example.com', password: 'password123' };
      const cursousuario: cursoUsuarios  = { id: 1, nombre: 'Usuario 1',usuarioId: 1 };
      const updatedCurso: Curso = { id: 1, nombre: 'Curso 1', cursoUsuarios: [cursousuario] };

      service.agregarMatricula(usuario, 1).subscribe(curso => {
        // @ts-ignore
        expect(curso).toEqual(updatedCurso);
      });

      const req = httpMock.expectOne(`${apiUrl}/asignar-usuario/1`);
      // @ts-ignore
      expect(req.request.method).toBe('PUT');
      req.flush(updatedCurso);
    });
  });

  describe('eliminarMatricula', () => {
    it('eliminar un usuario de un curso', () => {
      service.eliminarMatricula(1, 1).subscribe(response => {
        // @ts-ignore
        expect(response).toBeTruthy();
      });

      const req = httpMock.expectOne(`${apiUrl}/eliminar-usuario/1?usuarioId=1`);
      // @ts-ignore
      expect(req.request.method).toBe('DELETE');
      req.flush({});
    });
  });

});
