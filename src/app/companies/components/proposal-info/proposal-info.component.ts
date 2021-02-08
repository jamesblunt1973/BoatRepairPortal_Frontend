import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Proposal } from '../../models/proposal.model';

@Component({
    selector: 'app-alert-dialog',
    templateUrl: './proposal-info.component.html',
    styleUrls: ['./proposal-info.component.scss']
})
export class ProposalInfoComponent implements OnInit {

    constructor(public dialogRef: MatDialogRef<ProposalInfoComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Proposal) { }

    ngOnInit() {
    }

}
