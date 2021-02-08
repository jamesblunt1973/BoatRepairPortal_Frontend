import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { UiService } from '../../core/ui.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit, OnDestroy {

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(private uiService: UiService, private media: MediaMatcher, private changeDetectorRef: ChangeDetectorRef) {
    this.mobileQuery = this.media.matchMedia('(max-width: 1280px)');
    this._mobileQueryListener = () => {
      this.changeDetectorRef.detectChanges();
    };
    this.mobileQuery.addEventListener('change', this._mobileQueryListener);
  }

  sidebarStatus = false;

  ngOnInit() {
    this.uiService.sidebarStatus().subscribe(status => {
      this.sidebarStatus = status === 'open'
    });
  }

  onSidebarClosing() {
    this.uiService.changeSidebarStatus();
  }

  ngOnDestroy() {
    this.mobileQuery.removeEventListener('change', this._mobileQueryListener);
  }

}
