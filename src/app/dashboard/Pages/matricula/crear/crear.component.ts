import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material/dialog";
import { CursoService } from "../../../../services/curso.service";
import { Curso, CursoRequest, Usuario } from "../../../../interfaces/global.interfaces";
import { AlertDialogComponent } from "../../alert-dialog/alert-dialog.component";
import {UsuariosService} from "../../../../services/usuarios.service";
import {CommonModule} from "@angular/common";
import {concat, concatMap, from, Observable, switchMap, toArray} from "rxjs";

@Component({
  selector: 'app-crearmatricula',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './crear.component.html',
  styles: [``]
})
export class CrearComponent implements OnInit {
  cursoForm!: FormGroup;
  modeloUsuario!:Observable<Usuario>;
  usuariosDisponibles: Usuario[] = []; // Para almacenar los usuarios disponibles

  constructor(
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CrearComponent>,
    private _curso: CursoService,
    private _user: UsuariosService,
    @Inject(MAT_DIALOG_DATA) public data: Curso
  ) { }

  ngOnInit(): void {
    this.cursoForm = this.fb.group({
      usuarios: [[], Validators.required]
    });

    this.loadUsuariosDisponibles();
  }

  loadUsuariosDisponibles(): void {
    // Llama a tu servicio para obtener todos los usuarios
    this._user.getListUsuarios().subscribe({
      next: (usuarios) => {
        // Filtra los usuarios para obtener solo los que no están en ningún curso
        this._curso.getListCursos().subscribe({
          next: (cursos) => {
            const usuariosMatriculados = cursos.flatMap(curso => curso.cursoUsuarios.map(cursoUsuario => cursoUsuario.usuarioId));
            this.usuariosDisponibles = usuarios.filter(usuario => !usuariosMatriculados.includes(usuario.id));
          },
          error: (error) => {
            console.error('Error obteniendo la lista de cursos:', error);
            this.snackBar.open('Error obteniendo la lista de cursos', 'Cerrar', {
              duration: 3000,
            });
          }
        });
      },
      error: (error) => {
        console.error('Error obteniendo usuarios:', error);
        this.snackBar.open('Error obteniendo usuarios', 'Cerrar', {
          duration: 3000,
        });
      }
    });
  }

  onSubmit() {
    const modelo: CursoRequest = {
      idcurso: this.data.id,
      usuarios: this.cursoForm.value.usuarios
    };

    if (this.cursoForm.valid) {
      console.log(this.cursoForm.value);

      // Crear un array de observables para manejar todas las solicitudes
      const requests = modelo.usuarios.map(usuarioId =>
        this._user.getUsuario(usuarioId).pipe(
          switchMap(usuario =>
            this._curso.agregarMatricula(usuario, modelo.idcurso)
          )
        )
      );

      concat(...requests).subscribe({
        next: (data) => {
          console.log("Todos los usuarios han sido matriculados.");
          this.dialogRef.close(data);
        },
        error: (err) => {
          console.error("Error al agregar matrículas", err);
        }
      });


      this.snackBar.open('Autor creado correctamente', 'Cerrar', {
        duration: 3000,
      });
    } else {
      this.dialog.open(AlertDialogComponent, {
        data: { message: 'Este es un mensaje de alerta' }
      });
      console.log('Formulario no válido');
      console.log("NO Creado");
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
