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
    this._postService.getAll().subscribe((d) => {
      this.posts = d;
      console.log(`Posts carregados:`, this.posts);
    });
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
      // Verifica se o formulário foi salvo
      if (result) {
        // **CORREÇÃO 1: Inscreva-se no método addPost para enviar a requisição**
        this._postService.addPost(result).subscribe({
          next: (postSalvo) => {
            console.log('Post salvo com sucesso no backend:', postSalvo);

            // **CORREÇÃO 2: Atualize a lista APÓS o sucesso da criação**
            // Opção A: Re-buscar tudo do servidor (mais seguro)
            this.carregarPosts();

            // Opção B: Adicionar na lista local (mais rápido, "atualização otimista")
            // this.posts.push(postSalvo); // Se o backend retornar o post criado com ID
          },
          error: (err) => {
            console.error('Erro ao salvar o post:', err);
            // Aqui você pode mostrar uma notificação de erro para o usuário
          },
        });
      }
    });
  }
}
