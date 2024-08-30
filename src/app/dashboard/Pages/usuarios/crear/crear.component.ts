import { Component } from '@angular/core';

import {AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Role, Usuario} from "../../../../interfaces/global.interfaces";
import {AlertDialogComponent} from "../../alert-dialog/alert-dialog.component";
import {UsuariosService} from "../../../../services/usuarios.service";
import {MatError, MatFormField} from "@angular/material/form-field";
import {CommonModule} from "@angular/common";
import {MatOption, MatSelect} from "@angular/material/select";
import { MatSelectModule } from '@angular/material/select';
@Component({
  selector: 'app-crear',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatError,
    CommonModule,
    MatFormField,
    MatSelect,
    MatOption,
    MatSelectModule
  ],
  templateUrl: './crear.component.html',
  styles: ``
})
export class CrearComponent {
  cursoForm!: FormGroup;
  rolesList: Role[] = [];

  constructor(
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CrearComponent>,
    private _usuario: UsuariosService
  ) {}

  ngOnInit(): void {
    this.cursoForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.maxLength(50), Validators.email]],
      password: ['', [
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(8),
        this.passwordComplexityValidator()
      ]],
      roles: [[], Validators.required]  // Control para los roles
    });

    this.getRoles();  // Cargar la lista de roles disponibles
  }

  private getRoles(): void {
    this._usuario.getListRoles().subscribe({
      next: (roles) => {
        this.rolesList = roles;
      },
      error: (err) => {
        console.error('Error obteniendo los roles:', err);
        this.snackBar.open('Error obteniendo los roles', 'Cerrar', {
          duration: 3000,
        });
      }
    });
  }

  passwordComplexityValidator() {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
      if (!value) {
        return null;
      }

      const hasUpperCase = /[A-Z]/.test(value);
      const hasLowerCase = /[a-z]/.test(value);
      const hasNumeric = /[0-9]/.test(value);
      const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(value);

      const passwordValid = hasUpperCase && hasLowerCase && hasNumeric && hasSpecial;

      return !passwordValid ? { passwordComplexity: true } : null;
    };
  }

  onSubmit() {
    const modelo: Usuario = {
      id: 0,
      email: this.cursoForm.value.email,
      nombre: this.cursoForm.value.nombre,
      password: this.cursoForm.value.password,
      roles: this.cursoForm.value.roles  // Enviar los roles seleccionados
    };

    if (this.cursoForm.valid) {
      console.log(this.cursoForm.value);
      this._usuario.agregarUsuario(modelo).subscribe({
        next: (data) => {
          console.log(data);
          console.log("Creado");
          this.dialogRef.close(data);
        },
        error: (err) => {
          console.error('Error creando usuario:', err);
          this.snackBar.open('Error creando usuario', 'Cerrar', {
            duration: 3000,
          });
        }
      });
      this.snackBar.open('Usuario creado correctamente', 'Cerrar', {
        duration: 3000,
      });
    } else {
      this.dialog.open(AlertDialogComponent, {
        data: { message: 'Formulario no válido' }
      });
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
