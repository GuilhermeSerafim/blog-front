import { Component, inject, OnInit } from '@angular/core';
import { Card } from '../../components/card/card';
import { PostService } from '../../services/post.service';
import { IPost } from '../../interfaces/post.interface';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { NovoPostDialog } from '../../components/novo-post-dialog/novo-post-dialog';
import { CommonModule } from '@angular/common'; // Importante para o template

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Card, MatButtonModule, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  posts: IPost[] = [];

  private readonly _postService = inject(PostService);
  private readonly dialog = inject(MatDialog);

  ngOnInit(): void {
    this.carregarPosts();
  }

  carregarPosts(): void {
    this._postService.getAll().subscribe({
      next: (d) => (this.posts = d),
      error: (e) => console.error('Erro ao carregar posts', e)
    });
  }

  incluirNovoTexto(): void {
    const dialogRef = this.dialog.open(NovoPostDialog, {
      width: '600px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result: IPost) => {
      if (result) {
        this._postService.addPost(result).subscribe(() => this.carregarPosts());
      }
    });
  }

  excluirTexto(post: IPost): void {
    if (!post.id) return;

    if (confirm(`Deseja excluir a publicação ID ${post.id}?`)) {
      this._postService.deletePost(post.id).subscribe({
        next: () => {
          alert('Excluído com sucesso!');
          this.carregarPosts();
        },
        error: () => alert('Erro ao excluir.')
      });
    }
  }

  alterarTexto(post: IPost): void {
    const dialogRef = this.dialog.open(NovoPostDialog, {
      width: '600px',
      disableClose: true,
      data: post
    });

    dialogRef.afterClosed().subscribe((result: IPost) => {
      if (result && post.id) {
        this._postService.updatePost(post.id, result).subscribe({
          next: () => {
             alert('Alterado com sucesso!');
             this.carregarPosts();
          },
          error: () => alert('Erro ao alterar.')
        });
      }
    });
  }
}