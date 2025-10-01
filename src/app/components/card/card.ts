import { Component, Input, OnInit } from '@angular/core';
import { MatCard, MatCardModule } from '@angular/material/card';
import { IPost } from '../../interfaces/post.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  imports: [MatCardModule, MatCard, CommonModule],
  templateUrl: './card.html',
  styleUrl: './card.scss',
})
export class Card {
  @Input() post!: IPost;
  public isNaoPublicado(dataPost: string | Date): boolean {
    // Se dataPost não for uma string (já for um Date), não fazemos nada.
    // Se for uma string, garantimos que ela termine com 'Z' para ser tratada como UTC.
    const dataStringUTC =
      typeof dataPost === 'string' && !dataPost.endsWith('Z') ? dataPost + 'Z' : dataPost;

    // Agora, a comparação é robusta contra problemas de fuso horário.
    // Ambos os objetos Date representarão um ponto exato no tempo universal.
    return new Date(dataStringUTC) > new Date();
  }
}
