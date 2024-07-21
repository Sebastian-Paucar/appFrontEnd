import {Component, Inject} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {UsuariosService} from "../../../../services/usuarios.service";
import {Usuario} from "../../../../interfaces/global.interfaces";
import {AlertDialogComponent} from "../../alert-dialog/alert-dialog.component";
import {MatError} from "@angular/material/form-field";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-editar',
  standalone: true,
  imports: [
    MatError,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './editar.component.html',
  styles: ``
})
export class EditarComponent {

  cursoForm!: FormGroup;

  constructor(private snackBar: MatSnackBar,private dialog: MatDialog, private fb: FormBuilder,public dialogRef: MatDialogRef<EditarComponent>,@Inject(MAT_DIALOG_DATA) public data:Usuario,private _usuario: UsuariosService) { }
  ngOnInit(): void {
    this.cursoForm = this.fb.group({
      nombre: [this.data.nombre, [Validators.required, Validators.maxLength(50)]],
      email: [this.data.email, [Validators.required, Validators.maxLength(50), Validators.email]],
      password: [this.data.password, [
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(8), // Longitud mínima de 8 caracteres
        this.passwordComplexityValidator() // Validador personalizado
      ]],
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
    const modelo: Usuario ={
      id:0,
      email:this.cursoForm.value.email,
      nombre:this.cursoForm.value.nombre,
      password:this.cursoForm.value.password,
    }
    if (this.cursoForm.valid) {
      this. _usuario.actualizarUsuario(this.data.id,modelo).subscribe({
        next: (data) => {

          this.dialogRef.close(data); // Cerrar el modal y pasar los datos creados
        }
      });
      this.snackBar.open('Usuario actualizado correctamente', 'Cerrar', {
        duration: 3000,
      });
    }else {
      const dialogRef = this.dialog.open(AlertDialogComponent, {

        data: { message: 'Formulario no válido' }
      });


    }
  }

  onClose(): void {
    this.dialogRef.close();
  }

}
