import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostsService } from '../posts.service';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../post.model';

@Component({
  selector: 'app-post-create',
  standalone: false,
  templateUrl: './post-create.component.html',
  styleUrl: './post-create.component.css'
})
export class PostCreateComponent implements OnInit {

  private mode = 'create';
  private postId: string | null = null;
  isLoading = false;
  public post: Post = {
    id: '',
    title: '',
    content: ''
  };

  constructor(private postService: PostsService,
    private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.isLoading = true;
        this.postService.getPost(this.postId!).subscribe((postData) => {
          this.isLoading = false;
          this.post = {
            id: postData._id,
            title: postData.title,
            content: postData.content
          }
        });
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    })
  }

  onSavePost(postForm: NgForm) {
    if (postForm.invalid) {
      return;
    }
    if (this.mode === 'create') {
      this.postService.addPost(postForm.value.title, postForm.value.content);
    } else {
      this.postService.updatePost(this.postId!, postForm.value.title, postForm.value.content);
    }
    postForm.resetForm();
  }
}
