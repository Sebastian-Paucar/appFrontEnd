import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of, throwError } from 'rxjs';

import { MatPaginator } from '@angular/material/paginator';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import {CursoService} from "../services/curso.service";
import {Curso} from "../interfaces/global.interfaces";
import {CursosComponent} from "../dashboard/Pages/cursos/cursos.component";
import {EditarComponent} from "../dashboard/Pages/cursos/editar/editar.component";
import {CrearComponent} from "../dashboard/Pages/cursos/crear/crear.component";

describe('CursosComponent', () => {
  let component: CursosComponent;
  let fixture: ComponentFixture<CursosComponent>;
  let cursoService: CursoService;
  let mockPaginator: MatPaginator;

  const mockCursos: Curso[] = [
    { id: 1, nombre: 'Curso 1', cursoUsuarios: [] },
    { id: 2, nombre: 'Curso 2', cursoUsuarios: [] }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        HttpClientTestingModule,
        MatTableModule,
        MatPaginatorModule,
        MatDialogModule,
        MatSnackBarModule,
        MatButtonModule,
        CursosComponent
      ],
      providers: [CursoService],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CursosComponent);
    component = fixture.componentInstance;
    cursoService = TestBed.inject(CursoService);
    mockPaginator = fixture.debugElement.query(By.directive(MatPaginator)).componentInstance as MatPaginator;

    // Configuración de los espías
    spyOn(cursoService, 'getListCursos').and.returnValue(of(mockCursos));
    spyOn(cursoService, 'eliminarCurso').and.returnValue(of(mockCursos[0]));
    fixture.detectChanges();
  });

  it('debería crearse', () => {
    // @ts-ignore
    expect(component).toBeTruthy();
  });

  it('debería cargar la lista de cursos al iniciar', () => {
    component.ngOnInit();
    // @ts-ignore
    expect(cursoService.getListCursos).toHaveBeenCalled();
    // @ts-ignore
    expect(component.dataSource.data).toEqual(mockCursos);
  });


  it('debería abrir el diálogo de creación y recargar cursos al cerrarlo', () => {
    spyOn(component, 'getListCursos');
    const dialogRef = { afterClosed: () => of(true) } as any;
    spyOn(component['dialog'], 'open').and.returnValue(dialogRef);

    component.openCrear();
    // @ts-ignore
    expect(component['dialog'].open).toHaveBeenCalledWith(CrearComponent, { width: '400px', data: null });
    // @ts-ignore
    expect(component.getListCursos).toHaveBeenCalled();
  });

  it('debería abrir el diálogo de edición y recargar cursos al cerrarlo', () => {
    spyOn(component, 'getListCursos');
    const dialogRef = { afterClosed: () => of(true) } as any;
    spyOn(component['dialog'], 'open').and.returnValue(dialogRef);

    component.openEditUserModal(mockCursos[0]);
    // @ts-ignore
    expect(component['dialog'].open).toHaveBeenCalledWith(EditarComponent, { width: '400px', data: mockCursos[0] });
    // @ts-ignore
    expect(component.getListCursos).toHaveBeenCalled();
  });

  it('debería eliminar un curso y mostrar el snackbar de éxito', () => {
    spyOn(component['snackBar'], 'open');
    component.eliminar(mockCursos[0]);
    // @ts-ignore
    expect(cursoService.eliminarCurso).toHaveBeenCalledWith(mockCursos[0].id);
    // @ts-ignore
    expect(component['snackBar'].open).toHaveBeenCalledWith('Autor eliminado exitosamente', 'Cerrar', { duration: 3000 });
  });



});
