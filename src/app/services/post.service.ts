import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPost } from '../interfaces/post.interface';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private apiUrl = 'http://localhost:8080/api/postagens';

  constructor(private http: HttpClient) {}

  addPost(post: IPost): Observable<IPost> {
    return this.http.post<IPost>(this.apiUrl, post);
  }

  getAll(): Observable<IPost[]> {
    return this.http.get<IPost[]>(this.apiUrl);
  }
}