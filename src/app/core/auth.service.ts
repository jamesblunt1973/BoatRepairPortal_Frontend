import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { IAuthResult } from '../shared/models/auth-result.model';
import { ILoginData } from '../shared/models/login.model';
import { IRegisterData } from '../shared/models/register.model';
import { IUser } from '../shared/models/user.model';
import { UiService } from './ui.service';



@Injectable()
export class AuthService {

  private apiUrl = environment.apiUrl + 'auth/';

  private redirectUrl: string = '/';
  private user$ = new BehaviorSubject<IUser>(null);
  private user: IUser = null;

  constructor(private router: Router, private http: HttpClient, private uiService: UiService) { }

  set RedirectUrl(value: string) {
    this.redirectUrl = value;
  }

  get RedirectUrl() {
    return this.redirectUrl;
  }

  set User(value: IUser) {
    this.user = value;
  }

  get User() {
    return this.user;
  }

  setUser(user: IUser) {
    this.user = user;
    this.user$.next(user);
  }

  userStatus(): Observable<IUser> {
    return this.user$.asObservable();
  }

  register(data: IRegisterData, save: boolean): Observable<boolean> {
    return this.http.post<IAuthResult>(this.apiUrl + 'signup', data).pipe(
      map(res => {
        const user = this.decodeUser(res.token);
        if (save) {
          localStorage.setItem('token', res.token);
        }
        this.setUser(user);
        this.uiService.showSuccessSnack('Registration was successful');
        this.router.navigate([this.RedirectUrl || '/']);
        this.RedirectUrl = '/';
        return true;
      }),
      catchError(err => {
        let msg = '';
        if (err.status === 400 || err.status === 409) {
          msg = err.error.message;
        }
        else {
          msg = 'Error in registration';
          console.log(err);
        }
        this.uiService.showErrorSnack(msg);
        return of(false)
      })
    );
  }

  login(data: ILoginData, save: boolean): Observable<boolean> {
    return this.http.post<IAuthResult>(this.apiUrl + 'signin', data).pipe(
      map(res => {
        const user = this.decodeUser(res.token);
        if (save) {
          localStorage.setItem('token', res.token);
        }
        this.setUser(user);
        this.greetingUser();
        this.router.navigate([this.RedirectUrl || '/']);
        this.RedirectUrl = '/';
        return true;
      }),
      catchError(err => {
        let msg = '';
        if (err.status === 401)
          msg = err.error.message;
        else {
          msg = 'Error while logging in';
          console.log(err);
        }
        this.uiService.showErrorSnack(msg);
        return of(false);
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.setUser(null);
    this.redirectUrl = '/';
    this.router.navigate(['/auth']);
  }

  checkUser(): boolean | Observable<boolean> {
    if (this.user)
      return true;
    var token = localStorage.getItem('token');
    if (!token || !this.isTokenValid(token)) {
      this.router.navigate(['auth/login']);
      return false;
    }
    return this.http.get<IAuthResult>(this.apiUrl + 'check-user').pipe(
      map(res => {
        const user = this.decodeUser(res.token);
        localStorage.setItem('token', res.token);
        this.setUser(user);
        this.greetingUser();
        return true;
      }),
      catchError(err => {
        localStorage.removeItem('token');
        let msg = '';
        switch (err.status) {
          case 400:
            msg = err.error.disableMessage;
            break;
          case 401:
            msg = "Session is expired";
            break;
          case 404:
            msg = "Invalid user";
            break;
          default:
            msg = "Error while validating user";
            console.log(err);
            break;
        }
        this.uiService.showErrorSnack(msg);
        this.router.navigate(['auth/login']);
        return of(false);
      })
    );
  }

  private greetingUser() {
    let msg = 'Welcome, ' + this.user.name;
    this.uiService.showSuccessSnack(msg);
  }

  private decodeUser(token: string): IUser {
    const obj = JSON.parse(atob(token.split('.')[1]));
    const { email, name, id } = obj;
    return {
      email,
      id,
      name,
      token
    }
  }

  private isTokenValid(token: string): boolean {
    const tokenParts = token.split('.');
    if (tokenParts.length != 3) {
      return false;
    }
    const obj = JSON.parse(atob(tokenParts[1]));
    const now = Math.floor(new Date().getTime() / 1000);
    if (now >= obj.exp) {
      return false;
    }
    return true;
  }
}