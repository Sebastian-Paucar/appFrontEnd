import { Component, Inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material/dialog";
import { UsuariosService } from "../../../../services/usuarios.service";
import { Role, Usuario } from "../../../../interfaces/global.interfaces";
import { AlertDialogComponent } from "../../alert-dialog/alert-dialog.component";
import { MatError, MatFormField } from "@angular/material/form-field";
import { CommonModule } from "@angular/common";
import { MatSelectModule } from '@angular/material/select';
import { MatOption, MatSelect } from "@angular/material/select";

@Component({
  selector: 'app-editar',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatError,
    MatFormField,
    MatSelect,
    MatOption,
    CommonModule,
    MatSelectModule
  ],
  templateUrl: './editar.component.html',
  styles: ``
})
export class EditarComponent {
  cursoForm!: FormGroup;
  rolesList: Role[] = [];

  constructor(
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Usuario,
    private _usuario: UsuariosService
  ) {}

  ngOnInit(): void {
    this.cursoForm = this.fb.group({
      nombre: [this.data.nombre, [Validators.required, Validators.maxLength(50)]],
      email: [this.data.email, [Validators.required, Validators.maxLength(50), Validators.email]],
      password: ['', [
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(8),
        this.passwordComplexityValidator()
      ]],
      roles: [this.data.roles || [], Validators.required]  // Agregamos el control para los roles
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
      id: this.data.id,
      email: this.cursoForm.value.email,
      nombre: this.cursoForm.value.nombre,
      password: this.cursoForm.value.password,
      roles: this.cursoForm.value.roles  // Enviar los roles seleccionados
    };

    if (this.cursoForm.valid) {
      this._usuario.actualizarUsuario(this.data.id, modelo).subscribe({
        next: (data) => {
          this.dialogRef.close(data); // Cerrar el modal y pasar los datos actualizados
        },
        error: (err) => {
          console.error('Error actualizando usuario:', err);
          this.snackBar.open('Error actualizando usuario', 'Cerrar', {
            duration: 3000,
          });
        }
      });
      this.snackBar.open('Usuario actualizado correctamente', 'Cerrar', {
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
