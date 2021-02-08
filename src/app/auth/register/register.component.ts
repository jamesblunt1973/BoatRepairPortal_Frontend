import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AuthService } from '../../core/auth.service';
import { AutoUnsubscribe } from '../../shared/auto-unsubscribe';
import { IRegisterData } from '../../shared/models/register.model';

@AutoUnsubscribe
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  model: IRegisterData = {
    email: '',
    name: '',
    password: ''
  };
  save = false;
  loading = false;
  subscriptions: Subscription[] = [];

  constructor(private authService: AuthService) { }
  register() {
    this.loading = true;
    let sub = this.authService.register(this.model, this.save).pipe(
      finalize(() => {
        this.loading = false;
      })
    ).subscribe();
    this.subscriptions.push(sub);
  }
}
