import { Injectable } from "@angular/core";
import { Post } from "./post.model";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private posts: Post[] = [];
  private postUpdated = new Subject<Post[]>();
  private readonly apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  getPosts() {
    this.httpClient.get<{ posts: Post[] }>(`${this.apiUrl}/posts`)
      .subscribe((postData) => {
        this.posts = postData.posts;
        this.postUpdated.next([...this.posts]);
      });
  }

  addPost(title: string, content: string) {
    const post: Post = {
      title: title, content: content
    };
    this.httpClient.post<Post>(`${this.apiUrl}/posts`, post).subscribe((response) => {
      this.posts.push(post);
      this.postUpdated.next([...this.posts]);
    })
  }

  getPostUpdateListener() {
    return this.postUpdated.asObservable();
  }

  deletePost(postId: string) {
    this.httpClient.delete(`${this.apiUrl}/posts/${postId}`).subscribe(() => {
      this.posts = this.posts.filter(post => post._id !== postId);
      this.postUpdated.next([...this.posts]);
    });
  }
}
