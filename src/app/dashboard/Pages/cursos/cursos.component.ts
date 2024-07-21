import {Component, ViewChild} from '@angular/core';

import {Curso} from "../../../interfaces/global.interfaces";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatIconModule} from "@angular/material/icon";
import {CursoService} from "../../../services/curso.service";
import {CommonModule, DatePipe} from "@angular/common";
import {CrearComponent} from "./crear/crear.component";
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from "@angular/material/input";
import {MatSortModule} from "@angular/material/sort";
import {MatSelectModule} from "@angular/material/select";
import {MatButtonModule} from "@angular/material/button";
import {MatDividerModule} from "@angular/material/divider";
import {EditarComponent} from "./editar/editar.component";

@Component({
  selector: 'app-cursos',
  standalone: true,
  imports: [CommonModule,
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
  templateUrl: './cursos.component.html',
  styles: ``,
  providers: [DatePipe]
})
export class CursosComponent {
  dataSource: MatTableDataSource<Curso>;
  displayedColumns: string[] = ['Id', 'Nombre','Acciones'];


  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(
    private apiService: CursoService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.dataSource = new MatTableDataSource<Curso>([]);
  }

  ngOnInit(): void {
    this.getListCursos();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator; // Asignar paginador después de que se inicialice
  }

  getListCursos(): void {
    this.apiService.getListCursos().subscribe({
      next: response => {
        this.dataSource.data = response;
      },
      error: error => {
        console.error('Error obteniendo la lista de cursos:', error);
        this.snackBar.open('Error obteniendo la lista de cursos', 'Cerrar', {
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

  openCrear(): void {
    const dialogRef = this.dialog.open(CrearComponent, {
      width: '400px',
      data: null // Puedes enviar datos adicionales al diálogo si es necesario
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getListCursos();

      }
    });
  }

  openEditUserModal(element: Curso): void {
    const dialogRef = this.dialog.open(EditarComponent, {
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
          this.snackBar.open('Autor eliminado exitosamente', 'Cerrar', {
            duration: 3000,
          });
        },
      );
    } catch (error) {
      this.snackBar.open('Error eliminando el autor', 'Cerrar', {
        duration: 3000,
      });
    }
  }
}
