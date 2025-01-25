import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-create',
  standalone: false,
  templateUrl: './post-create.component.html',
  styleUrl: './post-create.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostCreateComponent {

  constructor(private postService: PostsService) {}

  newPost = 'NO CONTENT';
  onAddPost(postForm: NgForm) {
    if (postForm.invalid) {
      return;
    }

    this.postService.addPost(postForm.value.title, postForm.value.content);
    postForm.reset();
  }
}
