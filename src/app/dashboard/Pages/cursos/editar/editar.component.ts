import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog, MatDialogRef,MAT_DIALOG_DATA} from "@angular/material/dialog";
import {CursoService} from "../../../../services/curso.service";
import {Curso} from "../../../../interfaces/global.interfaces";
import {AlertDialogComponent} from "../../alert-dialog/alert-dialog.component";

@Component({
  selector: 'app-editar',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './editar.component.html',
  styles: ``
})
export class EditarComponent {
  cursoForm!: FormGroup;
  constructor(private snackBar: MatSnackBar,private dialog: MatDialog, private fb: FormBuilder,public dialogRef: MatDialogRef<EditarComponent>,@Inject(MAT_DIALOG_DATA) public data: Curso,private _curso: CursoService) { }
  ngOnInit(): void {
    this.cursoForm = this.fb.group({
      curso_nombre: [this.data.nombre, [Validators.required, Validators.maxLength(50)]],
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
      this. _curso.actualizarCurso(this.data.id,modelo).subscribe({
        next: (data) => {
          console.log(data);
          console.log("Editado");
          this.dialogRef.close(data); // Cerrar el modal y pasar los datos creados
        }
      });
      this.snackBar.open('Autor creado correctamente', 'Cerrar', {
        duration: 3000,
      });
    }else {
      const dialogRef = this.dialog.open(AlertDialogComponent, {

        data: { message: 'Formulario no valido' }
      });

    }
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
