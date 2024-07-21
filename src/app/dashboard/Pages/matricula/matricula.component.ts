import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import {Curso, cursoUsuarios, Usuario} from "../../../interfaces/global.interfaces";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { CursoService } from "../../../services/curso.service";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";

import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import {CommonModule, DatePipe} from "@angular/common";
import { MatSortModule } from "@angular/material/sort";
import { MatSelectModule } from "@angular/material/select";
import { MatDividerModule } from "@angular/material/divider";
import { isEmpty } from "rxjs";
import { UsuariosService } from "../../../services/usuarios.service";
import {CrearComponent} from "./crear/crear.component";
import {EliminarComponent} from "./eliminar/eliminar.component";

@Component({
  selector: 'app-matricula',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatIconModule,
    MatPaginatorModule,
    MatSelectModule,
    MatButtonModule,
    MatDividerModule,
    MatDialogModule
  ],
  templateUrl: './matricula.component.html',
  styles: ``,
  providers: [DatePipe]
})
export class MatriculaComponent {
  dataSource: MatTableDataSource<Curso>;
  usuarios: Usuario[] = [];
  displayedColumns: string[] = ['Curso', 'Estudiantes', 'Acciones'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private apiService: CursoService,
    private apiServiceU: UsuariosService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.dataSource = new MatTableDataSource<Curso>([]);
  }

  ngOnInit(): void {

    this.getListCursos();
    this.getListUsuarios();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator; // Asignar paginador después de que se inicialice
  }

  getListCursos(): void {
    this.apiService.getListCursos().subscribe({
      next: response => {
        this.dataSource.data = response.map(curso => ({
          ...curso,
          cursoUsuarios: curso.cursoUsuarios.map(cursoUsuario => ({
            ...cursoUsuario,
            nombre: this.usuarios.find(usuario => usuario.id === cursoUsuario.usuarioId)?.nombre || 'Desconocido'
          }))
        }));

      },

      error: error => {
        console.error('Error obteniendo la lista de cursos:', error);
        this.snackBar.open('Error obteniendo la lista de cursos', 'Cerrar', {
          duration: 3000,
        });
      }
    });
  }


  private getListUsuarios() {
    this.apiServiceU.getListUsuarios().subscribe({
      next: response => {
        this.usuarios = response;
        this.getListCursos();
      },
      error: error => {
        console.error('Error obteniendo la lista de usuarios:', error);
        this.snackBar.open('Error obteniendo la lista de usuarios', 'Cerrar', {
          duration: 3000,
        });
      }
    });
  }


  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage(); // Ir a la primera página al aplicar filtro
    }
  }

  openEliminar(element: Curso): void {
    const dialogRef = this.dialog.open(EliminarComponent, {
      width: '400px',
      data: element

    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getListCursos();
      }
    });
    this.getListCursos();
  }

  openEditUserModal(element: Curso): void {
    const dialogRef = this.dialog.open(CrearComponent , {
      width: '400px',
      data: element
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getListCursos();
      }
    });
  }

  eliminar(element: Curso): void {
    try {
      this.apiService.eliminarCurso(element.id).subscribe(
        response => {
          this.getListCursos(); // Actualizar la lista después de eliminar
          this.snackBar.open('Curso eliminado exitosamente', 'Cerrar', {
            duration: 3000,
          });
        },
      );
    } catch (error) {
      this.snackBar.open('Error eliminando el curso', 'Cerrar', {
        duration: 3000,
      });
    }
  }

  protected readonly isEmpty = isEmpty;
}
