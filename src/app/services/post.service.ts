import { Injectable } from '@angular/core';
import { mockPosts } from '../mocks/post.mock';

@Injectable({
  providedIn: 'root',
})
export class PostService {

    getAll() {
        return mockPosts;
    }
}
