import { Component } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Usuario} from "../../../../interfaces/global.interfaces";
import {AlertDialogComponent} from "../../alert-dialog/alert-dialog.component";
import {UsuariosService} from "../../../../services/usuarios.service";
import {MatError} from "@angular/material/form-field";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-crear',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatError,
    CommonModule
  ],
  templateUrl: './crear.component.html',
  styles: ``
})
export class CrearComponent {
  cursoForm!: FormGroup;

  constructor(private snackBar: MatSnackBar,private dialog: MatDialog, private fb: FormBuilder,public dialogRef: MatDialogRef<CrearComponent>,private _usuario: UsuariosService) { }
  ngOnInit(): void {
    this.cursoForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.maxLength(50), Validators.email]],
      password: ['', [
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
      console.log(this.cursoForm.value);
      this. _usuario.agregarUsuario(modelo).subscribe({
        next: (data) => {
          console.log(data);
          console.log("Creado");
          this.dialogRef.close(data); // Cerrar el modal y pasar los datos creados
        }
      });
      this.snackBar.open('Usuario creado correctamente', 'Cerrar', {
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
