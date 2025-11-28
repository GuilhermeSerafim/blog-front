import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog'; // Importar MAT_DIALOG_DATA
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { IPost } from '../../interfaces/post.interface';

@Component({
  selector: 'app-novo-post-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './novo-post-dialog.html',
  styleUrls: ['./novo-post-dialog.scss'],
})
export class NovoPostDialog {
  form: FormGroup;

  private readonly fb = inject(FormBuilder);
  public dialogRef = inject(MatDialogRef<NovoPostDialog>);
  
  public data = inject<IPost>(MAT_DIALOG_DATA); 

  constructor() {
    this.form = this.fb.group({
      titulo: ['', Validators.required],
      autor: ['', Validators.required],
      dataPublicacao: [new Date(), Validators.required],
      texto: ['', [Validators.required, Validators.minLength(10)]],
    });

    if (this.data) {
      this.form.patchValue({
        titulo: this.data.titulo,
        autor: this.data.autor,
        dataPublicacao: new Date(this.data.dataPublicacao + 'T00:00:00'),
        texto: this.data.texto
      });
    }
  }

  salvar(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  fechar(): void {
    this.dialogRef.close();
  }
}