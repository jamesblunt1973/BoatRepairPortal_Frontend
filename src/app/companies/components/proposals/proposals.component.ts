import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';
import { AutoUnsubscribe } from '../../../shared/auto-unsubscribe';
import { ProposalStatus } from '../../models/proposal-status.enum';
import { Proposal } from '../../models/proposal.model';
import { ProposalsService } from '../../services/proposals.service';
import { ProposalInfoComponent } from '../proposal-info/proposal-info.component';

@AutoUnsubscribe
@Component({
  selector: 'app-proposals',
  templateUrl: './proposals.component.html',
  styleUrls: ['./proposals.component.scss']
})
export class ProposalsComponent implements OnInit {

  loading = false;
  proposals: Proposal[] = [];
  subscriptions: Subscription[] = [];

  constructor(private proposalService: ProposalsService, private dialog: MatDialog) { }

  ngOnInit() {
    this.loading = true;
    const sub = this.proposalService.getProposals().pipe(
      finalize(() => {
        this.loading = false;
      })
    ).subscribe(res => {
      this.proposals = res;
      this.getBoatPictures();
    }, error => {
      // handle errors
    });
    this.subscriptions.push(sub);
  }

  private getBoatPictures() {
    const sub = this.proposalService.getBoatPictures().subscribe(res => {
      this.proposals.map((_, i) => {
        _.job.boat.picture = res[i];
      });
    });
    this.subscriptions.push(sub);
  }

  updateProposal(proposal: Proposal, status: ProposalStatus) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: {
        title: '',
        message: (status === ProposalStatus.accepted ? 'Accept' : 'Reject') + ' proposal?',
        okText: 'YES',
        cancelText: 'NO'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        proposal.busy = true;
        const sub = this.proposalService.updateProposal(proposal.id, status).subscribe(() => {
          const index = this.proposals.findIndex(a => a.id === proposal.id);
          this.proposals.splice(index, 1);
        });
        this.subscriptions.push(sub);
      }
    });
  }

  showDesc(proposal: Proposal) {
    this.dialog.open(ProposalInfoComponent, {
      width: '400px',
      maxWidth: '100%',
      data: proposal
    });
  }

}
