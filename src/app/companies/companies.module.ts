import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ProposalInfoComponent } from './components/proposal-info/proposal-info.component';
import { ProposalsComponent } from './components/proposals/proposals.component';
import { ProposalsService } from './services/proposals.service';

const routes: Routes = [
  {
    path: 'proposals', component: ProposalsComponent
  },
  {
    path: '', pathMatch: 'full', redirectTo: 'proposals'
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ProposalsComponent, ProposalInfoComponent],
  providers: [ProposalsService]
})
export class CompaniesModule { }
