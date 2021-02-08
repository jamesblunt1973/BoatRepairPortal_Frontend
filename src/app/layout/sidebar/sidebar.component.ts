import { Component, OnInit } from '@angular/core';

import { IMneuItem } from './menuItem.model';
import { UiService } from '../../core/ui.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  menuItems: IMneuItem[] = [];

  constructor(private uiService: UiService) { }

  ngOnInit() {

    this.menuItems = [{
      icon: 'mdi-view-dashboard',
      title: 'Dashboard',
      url: '/home'
    }, {
      icon: 'mdi-format-list-checks',
      title: 'Job Ads',
      url: '/job-ads'
    }, {
      icon: 'mdi-file-edit',
      title: 'Proposals',
      url: '/companies/proposals'
    }, {
      icon: 'mdi-file-eye',
      title: 'Reviews',
      url: '/reviews'
    }];
  }

  collapseSidebar() {
    this.uiService.changeSidebarStatus();
  }

}
