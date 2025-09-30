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

  ngOnInit(): void {
    this.posts = this._postService.getAll();
  }

  incluirNovoTexto(): void {
    const dialogRef = this.dialog.open(NovoPostDialog, {
      width: '600px', // Defina uma largura para o dialog
      disableClose: true, // Impede que o usuário feche clicando fora
    });

    // Escuta o evento de fechamento do dialog
    dialogRef.afterClosed().subscribe((result: IPost | undefined) => {
      // Se o usuário salvou (result não é undefined), adicione o novo post
      if (result) {
        this._postService.addPost(result); // Supondo que seu serviço tenha um método addPost
        this.posts = this._postService.getAll(); // Atualiza a lista para refletir a adição
        console.log('Novo post salvo:', result);
      }
    });
  }
}
