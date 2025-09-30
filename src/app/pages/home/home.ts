import { Component, OnInit } from '@angular/core';
import { Card } from '../../components/card/card';
import { PostService } from '../../services/post.service';
import { IPost } from '../../interfaces/post.interface';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-home',
  imports: [Card, MatButtonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  posts: IPost[] = [];
  constructor(private readonly _postService: PostService) {}
  ngOnInit(): void {
    this.posts = this._postService.getAll();
  }
  incluirNovoTexto() {
    throw new Error('Method not implemented.');
  }
}
