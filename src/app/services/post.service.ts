import { Injectable } from '@angular/core';
import { mockPosts } from '../mocks/post.mock';
import { IPost } from '../interfaces/post.interface';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  addPost(result: IPost) {
    throw new Error('Method not implemented.');
  }

  getAll() {
    return mockPosts;
  }
}
