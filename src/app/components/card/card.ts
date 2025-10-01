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
    // new Date(dataPost) garante que estamos comparando objetos Date,
    // mesmo que a data venha como string da API.
    return new Date(dataPost) > new Date();
  }
}
