import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AuthService } from '../../core/auth.service';
import { AutoUnsubscribe } from '../../shared/auto-unsubscribe';
import { ILoginData } from '../../shared/models/login.model';

@AutoUnsubscribe
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  model: ILoginData = {
    password: '',
    email: ''
  };

  save = false;
  loading = false;
  subscriptions: Subscription[] = [];

  constructor(private authService: AuthService) { }
  login() {
    this.loading = true;
    let sub = this.authService.login(this.model, this.save).pipe(
      finalize(() => {
        this.loading = false;
      })
    ).subscribe();
    this.subscriptions.push(sub);
  }
}
