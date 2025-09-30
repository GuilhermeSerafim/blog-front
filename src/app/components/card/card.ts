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
}
