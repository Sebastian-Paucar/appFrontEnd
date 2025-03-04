import {Component} from '@angular/core';
import {MatTableDataSource, MatTableModule
} from "@angular/material/table";
import {MatFormFieldModule, } from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule,} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {Usuario} from "../../../interfaces/global.interfaces";
import {CommonModule, DatePipe} from "@angular/common";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {UsuariosService} from "../../../services/usuarios.service";
import {EditarComponent} from "./editar/editar.component";
import {MatSortModule} from "@angular/material/sort";
import {MatSelectModule} from "@angular/material/select";
import {MatDividerModule} from "@angular/material/divider";
import {CrearComponent} from "./crear/crear.component";

@Component({
  selector: 'app-usuarios',
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
  templateUrl: './usuarios.component.html',
  styles: `.password-hidden {
    -webkit-text-security: disc; /* Esto muestra puntos en lugar de texto */
    text-security: disc;
  }
  `,
  providers: [DatePipe]
})
export class UsuariosComponent {
  dataSource: MatTableDataSource<Usuario>;
  displayedColumns: string[] = ['id','nombre','email','password','Acciones'];
  paginator!: MatPaginator;
  constructor(
    private apiService: UsuariosService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.dataSource = new MatTableDataSource<Usuario>([]);
  }
  ngOnInit(): void {
    this.getListUsuarios();
  }
  private getListUsuarios() {
    this.apiService.getListUsuarios().subscribe({
      next: response => {
        this.dataSource.data = response;

      },
      error: error => {
        console.error('Error obteniendo la lista de usuarios:', error);
        this.snackBar.open('Error obteniendo la lista de usuarios', 'Cerrar', {
          duration: 3000,
        });
      }
    });
  }

  openCrear(): void {
    const dialogRef = this.dialog.open(CrearComponent, {
      width: '400px',
      data: null // Puedes enviar datos adicionales al diálogo si es necesario
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getListUsuarios();

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

  openEditUserModal(element:Usuario): void {
    const dialogRef = this.dialog.open(EditarComponent, {
      width: '400px',
      data: element
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getListUsuarios();
      }
    });
  }

  eliminar(element: Usuario): void {
    try {
      this.apiService.eliminarUsuario(element.id).subscribe(
        response => {
          this.getListUsuarios(); // Actualizar la lista después de eliminar
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
