import { Component, inject, OnInit } from '@angular/core';
import { Card } from '../../components/card/card';
import { PostService } from '../../services/post.service';
import { IPost } from '../../interfaces/post.interface';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { NovoPostDialog } from '../../components/novo-post-dialog/novo-post-dialog';

@Component({
  selector: 'app-home',
  imports: [Card, MatButtonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  posts: IPost[] = [];

  // Injeção de dependência moderna e mais limpa
  private readonly _postService = inject(PostService);
  private readonly dialog = inject(MatDialog);

  carregarPosts(): void {
    this._postService.getAll().subscribe((d) => (this.posts = d));
  }

  ngOnInit(): void {
    this.carregarPosts(); // Chama o novo método aqui
  }

  incluirNovoTexto(): void {
    const dialogRef = this.dialog.open(NovoPostDialog, {
      width: '600px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result: IPost | undefined) => {
      if (result) {
        this._postService.addPost(result).subscribe({
          next: () => this.carregarPosts(),
          error: (err) => {
            console.error('Erro ao salvar o post:', err);
          },
        });
      }
    });
  }
}
