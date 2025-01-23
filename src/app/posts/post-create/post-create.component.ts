import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-post-create',
  standalone: false,
  templateUrl: './post-create.component.html',
  styleUrl: './post-create.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostCreateComponent {
  enteredValue = '';
  newPost = 'NO CONTENT';
  onAddPost() {
    this.newPost = this.enteredValue;
  }
}
