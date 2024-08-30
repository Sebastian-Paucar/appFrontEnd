import {Component, OnInit} from '@angular/core';
import {
  MatTableDataSource,
  MatTableModule
} from "@angular/material/table";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { Usuario, Role } from "../../../interfaces/global.interfaces";
import { CommonModule, DatePipe } from "@angular/common";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { UsuariosService } from "../../../services/usuarios.service";
import { EditarComponent } from "./editar/editar.component";
import { MatSortModule } from "@angular/material/sort";
import { MatSelectModule } from "@angular/material/select";
import { MatDividerModule } from "@angular/material/divider";
import { CrearComponent } from "./crear/crear.component";
import {join} from "@angular/compiler-cli";

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
  styleUrls: ['./usuarios.component.css'], // Usando el archivo CSS separado
  providers: [DatePipe]
})
export class UsuariosComponent implements OnInit {
  dataSource: MatTableDataSource<Usuario>;
  displayedColumns: string[] = ['id', 'nombre', 'email', 'password',  'roles', 'Acciones'];
   roles:any;
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
    this.getListRoles();

  }

  private getListUsuarios() {
    this.apiService.getListUsuarios().subscribe({
      next: response => {
        // Modificar la contraseña para que solo muestre 10 puntos
        response.forEach(usuario => {
          usuario.password = '•'.repeat(10); // Muestra 10 puntos
        });
        this.dataSource.data = response;
        //console.log(this.dataSource.data)
      },
      error: error => {
        console.error('Error obteniendo la lista de usuarios:', error);
        this.snackBar.open('Error obteniendo la lista de usuarios', 'Cerrar', {
          duration: 3000,
        });
      }
    });
  }
  private getListRoles() {
    this.apiService.getListRoles().subscribe({
      next: response => {
        // Puedes realizar aquí cualquier transformación adicional en los roles si es necesario
        this.roles = response; // Guarda los roles obtenidos en una variable local o úsala directamente
       // console.log(this.roles); // Opcional: para depuración, puedes ver los roles en la consola
      },
      error: error => {
        console.error('Error obteniendo la lista de roles:', error);
        this.snackBar.open('Error obteniendo la lista de roles', 'Cerrar', {
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

  openEditUserModal(element: Usuario): void {
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
  getRolesString(roles: Role[] | undefined): string {
    if (!roles || roles.length === 0) {
      return 'Sin roles';
    }
    return roles.map(role => role.role).join(', ');
  }


}
