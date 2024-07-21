import { Component, Inject } from '@angular/core';
import { NgForOf } from "@angular/common";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { forkJoin, Observable } from "rxjs";
import { Curso, CursoRequest, Usuario, cursoUsuarios } from "../../../../interfaces/global.interfaces";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material/dialog";
import { CursoService } from "../../../../services/curso.service";
import { UsuariosService } from "../../../../services/usuarios.service";
import { AlertDialogComponent } from "../../alert-dialog/alert-dialog.component";

@Component({
  selector: 'app-eliminar',
  standalone: true,
  imports: [
    NgForOf,
    ReactiveFormsModule
  ],
  templateUrl: './eliminar.component.html',
  styles: ``
})
export class EliminarComponent {
  cursoForm!: FormGroup;
  usuariosMatriculados: Usuario[] = []; // Para almacenar los usuarios matriculados
  loadingUsuarios: boolean = false; // Indicador de carga para los usuarios
  submitting: boolean = false; // Indicador de carga para el envío del formulario

  constructor(
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EliminarComponent>,
    private _curso: CursoService,
    private _user: UsuariosService,
    @Inject(MAT_DIALOG_DATA) public data: Curso
  ) { }

  ngOnInit(): void {
    this.cursoForm = this.fb.group({
      usuarios: [[], Validators.required]
    });

    this.loadUsuariosMatriculados();
  }

  loadUsuariosMatriculados(): void {
    this.loadingUsuarios = true;
    this._curso.getListCursos().subscribe({
      next: (cursos) => {
        const cursoActual = cursos.find(curso => curso.id === this.data.id);
        if (cursoActual) {
          // Obtener usuarios matriculados a partir de cursoUsuarios
          forkJoin(
            cursoActual.cursoUsuarios.map(cursoUsuario =>
              this._user.getUsuario(cursoUsuario.usuarioId)
            )
          ).subscribe({
            next: (usuarios) => {
              this.usuariosMatriculados = usuarios;
              this.loadingUsuarios = false;
            },
            error: (error) => {
              console.error('Error obteniendo usuarios matriculados:', error);
              this.snackBar.open('Error obteniendo usuarios matriculados', 'Cerrar', {
                duration: 3000,
              });
              this.loadingUsuarios = false;
            }
          });
        } else {
          this.loadingUsuarios = false;
        }
      },
      error: (error) => {
        console.error('Error obteniendo la lista de cursos:', error);
        this.snackBar.open('Error obteniendo la lista de cursos', 'Cerrar', {
          duration: 3000,
        });
        this.loadingUsuarios = false;
      }
    });
  }

  onSubmit() {
    if (this.cursoForm.valid) {
      const modelo: CursoRequest = {
        idcurso: this.data.id,
        usuarios: this.cursoForm.value.usuarios
      };

      this.submitting = true;

      const requests = modelo.usuarios.map(usuarioId =>
        this._curso.eliminarMatricula(usuarioId, modelo.idcurso)
      );

      forkJoin(requests).subscribe({
        next: () => {
          console.log("Todos los usuarios han sido eliminados.");
          this.snackBar.open('Usuarios eliminados correctamente', 'Cerrar', {
            duration: 3000,
          });
          this.dialogRef.close(this.data);
          this.submitting = false;
        },
        error: (err) => {
          console.error("Error al eliminar matrículas", err);
          this.snackBar.open('Error al eliminar matrículas', 'Cerrar', {
            duration: 3000,
          });
          this.submitting = false;
        }
      });

    } else {
      this.dialog.open(AlertDialogComponent, {
        data: { message: 'Formulario no válido' }
      });
      console.log('Formulario no válido');
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
