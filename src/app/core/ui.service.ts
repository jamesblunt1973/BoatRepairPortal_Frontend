import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class UiService {

    private sidebarStatus$ = new BehaviorSubject<string>('open');

    constructor(private snackBar: MatSnackBar) { }

    sidebarStatus(): Observable<string> {
        return this.sidebarStatus$.asObservable();
    }

    changeSidebarStatus() {
        var currentState = this.sidebarStatus$.getValue();
        var nextState = currentState === '' ? 'open' : '';
        this.sidebarStatus$.next(nextState);
    }

    showSuccessSnack(msg: string) {
        this.showSnackBar(msg, 'success');
    }

    showErrorSnack(msg: string) {
        this.showSnackBar(msg, 'error');
    }

    showWarningSnack(msg: string) {
        this.showSnackBar(msg, 'warn');
    }

    private showSnackBar(msg: string, className: string) {
        this.snackBar.open(msg, null, {
            duration: 4000,
            horizontalPosition: 'left',
            verticalPosition: 'bottom',
            panelClass: className
        });
    }
}