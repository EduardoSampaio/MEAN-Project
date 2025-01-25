import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  standalone: false,
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css'
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: Array<Post> = [];
  private postsSub!: Subscription;

  constructor(private postService: PostsService) {}
  ngOnInit(): void {
    this.postService.getPosts();

    this.postsSub = this.postService.getPostUpdateListener().subscribe((posts: Post[]) => {
      this.posts = posts;
    });
  }

  onDeletePost(postId?: string) {
    console.log(postId);
    this.postService.deletePost(postId!);
  }

  ngOnDestroy(): void {
    this.postsSub.unsubscribe();
  }

}
