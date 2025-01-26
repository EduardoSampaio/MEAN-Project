import { Injectable } from "@angular/core";
import { Post } from "./post.model";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private posts: Post[] = [];
  private postUpdated = new Subject<Post[]>();
  private readonly apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient,
    private router: Router
  ) { }

  getPosts() {
    this.httpClient.get<{ posts: Post[] }>(`${this.apiUrl}/posts`)
      .pipe(map((postData) => {
        return {
          posts: postData.posts.map((post: any) => {
            return {
              title: post.title,
              content: post.content,
              id: post._id
            };
          })
        };
      }))
      .subscribe(transformedPosts => {
        this.posts = transformedPosts.posts;
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
      this.posts = this.posts.filter(post => post.id !== postId);
      this.postUpdated.next([...this.posts]);
    });
  }

  getPost(postId: string) {
    return this.httpClient.get<{ _id: string; title: string; content: string }>(
      `${this.apiUrl}/posts/${postId}`
    );
  }

  updatePost(id: string, title: string, content: string) {
    const post: Post = { id: id, title: title, content: content };
    this.httpClient.put(`${this.apiUrl}/posts/${id}`, post).subscribe(response => {
      const updatedPosts = [...this.posts];
      const oldPostIndex = updatedPosts.findIndex(p => p.id === post.id);
      updatedPosts[oldPostIndex] = post;
      this.posts = updatedPosts;
      this.postUpdated.next([...this.posts]);
      this.router.navigate(["/"]);
    });
  }
}
