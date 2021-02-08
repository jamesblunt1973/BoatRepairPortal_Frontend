import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { AlertDialogComponent } from './components/alert-dialog/alert-dialog.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { MaterialModule } from './material.module';

@NgModule({
    declarations: [
        ConfirmDialogComponent,
        AlertDialogComponent
    ],
    imports: [
        CommonModule,
        FlexLayoutModule,
        MaterialModule
    ],
    exports: [
        CommonModule,
        FormsModule,
        MaterialModule,
        FlexLayoutModule,
        ConfirmDialogComponent,
        AlertDialogComponent
    ],
    entryComponents: [
        ConfirmDialogComponent,
        AlertDialogComponent
    ]
})
export class SharedModule { }
