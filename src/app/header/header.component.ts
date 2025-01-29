import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  userIsAuthenticated = false;
  //private authListenerSubs: Subscription;

  constructor(/*private authService: AuthService*/) {}

  ngOnInit() {
    // this.userIsAuthenticated = this.authService.getIsAuth();
    // this.authListenerSubs = this.authService
    //   .getAuthStatusListener()
    //   .subscribe(isAuthenticated => {
    //     this.userIsAuthenticated = isAuthenticated;
    //   });
  }

  onLogout() {
    //this.authService.logout();
  }

  ngOnDestroy() {
    //this.authListenerSubs.unsubscribe();
  }
}
