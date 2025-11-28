import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatCard, MatCardModule } from '@angular/material/card';
import { IPost } from '../../interfaces/post.interface';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-card',
  imports: [MatCardModule, MatCard, CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './card.html',
  styleUrl: './card.scss',
})
export class Card {
  @Input() post!: IPost;
  @Output() acaoAlterar = new EventEmitter<IPost>();
  @Output() acaoExcluir = new EventEmitter<IPost>();
  
  public isNaoPublicado(dataPost: string): boolean {
    if (!dataPost) return false;

    const dataPublicacao = new Date(dataPost + 'T00:00:00');
    const hoje = new Date();

    hoje.setHours(0, 0, 0, 0);

    return dataPublicacao > hoje;
  }
}
