import { Injectable } from "@angular/core";
import { Post } from "./post.model";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { map, max } from "rxjs/operators";
import { Router } from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private posts: Post[] = [];
  private postUpdated = new Subject<{ posts: Post[], postCount: number }>();
  private readonly apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient,
    private router: Router
  ) { }

  getPosts(pageSize: number, page: number) {
    const queryParams = `?pagesize=${pageSize}&page=${page}`;
    this.httpClient.get<{ posts: Post[], maxPosts: number }>(`${this.apiUrl}/posts${queryParams}`)
      .pipe(map((postData) => {
        return {
          posts: postData.posts.map((post: any) => {
            return {
              title: post.title,
              content: post.content,
              id: post._id,
              imagePath: post.imagePath
            };
          }),
          maxPosts: postData.maxPosts
        };
      }))
      .subscribe(transformedPosts => {
        this.posts = transformedPosts.posts;
        this.postUpdated.next(
          {
            posts: [...this.posts],
            postCount: transformedPosts.maxPosts
          }
        );
      });
  }

  addPost(title: string, content: string, image: File) {
    const postData = new FormData();
    postData.append('title', title);
    postData.append('content', content);
    postData.append('image', image, title);

    this.httpClient.post<Post>(`${this.apiUrl}/posts`, postData).subscribe((response) => {
      this.router.navigate(['/']);
    })
  }

  getPostUpdateListener() {
    return this.postUpdated.asObservable();
  }

  deletePost(postId: string) {
    return this.httpClient.delete(`${this.apiUrl}/posts/${postId}`);
  }

  getPost(postId: string) {
    return this.httpClient.get<{ _id: string; title: string; content: string, imagePath: string }>(
      `${this.apiUrl}/posts/${postId}`
    );
  }

  updatePost(id: string, title: string, content: string, image: File | string) {
    let postData: Post | FormData;
    if (typeof image === 'object') {
      postData = new FormData();
      postData.append('id', id);
      postData.append('title', title);
      postData.append('content', content);
      postData.append('image', image, title);
    }
    else {
      postData = {
        id: id,
        title: title,
        content: content,
        imagePath: image
      };
    }
    this.httpClient.put(`${this.apiUrl}/posts/${id}`, postData).subscribe((response: any) => {
      this.router.navigate(["/"]);
    });

  }
}

