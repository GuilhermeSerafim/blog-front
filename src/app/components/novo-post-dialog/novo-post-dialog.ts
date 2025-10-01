import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

// Imports do Angular Material
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';

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
  providers: [provideNativeDateAdapter()], // Necessário para o MatDatepicker
  templateUrl: './novo-post-dialog.html',
  styleUrls: ['./novo-post-dialog.scss'],
})
export class NovoPostDialog {
  form: FormGroup;

  // Injetando dependências de forma moderna
  private readonly fb = inject(FormBuilder);
  public dialogRef = inject(MatDialogRef<NovoPostDialog>);

  constructor() {
    this.form = this.fb.group({
      titulo: ['', Validators.required],
      autor: ['', Validators.required],
      dataAtual: [new Date(), Validators.required],
      postagem: ['', [Validators.required, Validators.minLength(10)]], // Exemplo de mais validadores
    });
  }

  salvar(): void {
    if (this.form.valid) {
      // Fecha o dialog e retorna os dados do formulário
      this.dialogRef.close(this.form.value);
    }
  }

  fechar(): void {
    // Fecha o dialog sem retornar dados
    this.dialogRef.close();
  }
}
