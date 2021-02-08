import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/auth.guard';
import { SharedModule } from '../shared/shared.module';
import { ContainerComponent } from './container/container.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';

const routes: Routes = [
  {
    path: '', component: ContainerComponent,
    children: [
      {
        path: 'companies',
        loadChildren: () => import('../companies/companies.module').then(mod => mod.CompaniesModule),
        canLoad: [AuthGuard]
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '/companies/proposals'
      }
    ]
  }
];

@NgModule({
  declarations: [
    ContainerComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class LayoutModule { }
