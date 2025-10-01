import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPost } from '../interfaces/post.interface';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  // Define a URL base da sua API para não repetir
  private apiUrl = 'http://localhost:8080';

  // Injeta o HttpClient no construtor para poder fazer requisições HTTP
  constructor(private http: HttpClient) {}

  /**
   * Envia uma nova postagem para o backend.
   * @param post O objeto da postagem a ser criado.
   * @returns Um Observable que emite a resposta da API.
   */
  addPost(post: IPost): Observable<IPost> {
    // Faz uma requisição POST para http://localhost:8080/
    // O objeto 'post' é enviado no corpo da requisição
    return this.http.post<IPost>(this.apiUrl, post);
  }

  /**
   * Busca todas as postagens do backend.
   * @returns Um Observable que emite um array de postagens.
   */
  getAll(): Observable<IPost[]> {
    // Faz uma requisição GET para http://localhost:8080/
    return this.http.get<IPost[]>(this.apiUrl);
  }
}