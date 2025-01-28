import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-post-list',
  standalone: false,
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css'
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: Array<Post> = [];
  private postsSub!: Subscription;
  isLoading = false;
  totalPosts = 0;
  postPerPage = 2;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];

  constructor(private postService: PostsService) {}
  ngOnInit(): void {
    this.isLoading = true;
    this.postService.getPosts(this.postPerPage, 1);

    this.postsSub = this.postService.getPostUpdateListener().subscribe(response => {
      this.posts = response.posts;
      this.totalPosts = response.postCount;
      this.isLoading = false;
    });
  }

  onDeletePost(postId?: string) {
    this.postService.deletePost(postId!).subscribe(() => {
      this.postService.getPosts(this.postPerPage, this.currentPage);
    });
  }

  ngOnDestroy(): void {
    this.postsSub.unsubscribe();
  }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.postPerPage = pageData.pageSize;

    this.postService.getPosts(this.postPerPage, this.currentPage);
    this.isLoading = false;
  }
}
