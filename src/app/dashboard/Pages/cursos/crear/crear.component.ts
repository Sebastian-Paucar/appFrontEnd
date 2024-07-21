import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {CursoService} from "../../../../services/curso.service";
import {Curso} from "../../../../interfaces/global.interfaces";
import {AlertDialogComponent} from "../../alert-dialog/alert-dialog.component";

@Component({
  selector: 'app-crear',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './crear.component.html',
  styles: ``
})
export class CrearComponent {
  cursoForm!: FormGroup;

  constructor(private snackBar: MatSnackBar,private dialog: MatDialog, private fb: FormBuilder,public dialogRef: MatDialogRef<CrearComponent>,private _curso: CursoService) { }
  ngOnInit(): void {
    this.cursoForm = this.fb.group({
      curso_nombre: ['', [Validators.required, Validators.maxLength(50)]],
    });
  }
  onSubmit() {
    const modelo: Curso ={
      id:0,
      nombre:this.cursoForm.value.curso_nombre,
      cursoUsuarios: []
    }
    if (this.cursoForm.valid) {
      console.log(this.cursoForm.value);
      this. _curso.agregarCurso(modelo).subscribe({
        next: (data) => {
          console.log(data);
          console.log("Creado");
          this.dialogRef.close(data); // Cerrar el modal y pasar los datos creados
        }
      });
      this.snackBar.open('Autor creado correctamente', 'Cerrar', {
        duration: 3000,
      });
    }else {
      const dialogRef = this.dialog.open(AlertDialogComponent, {

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
