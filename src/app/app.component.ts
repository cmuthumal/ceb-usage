import { Component } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { CoreService } from './modules/core/services/core.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  sidenavOpened = true;
  links: any = [];
  hideSidenavUrlList = ['/login'];

  constructor(
    private router: Router,
    private coreService: CoreService
  ) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        if (this.hideSidenavUrlList.includes(event.url)) {
          this.signOut();
        } else {
          if (sessionStorage.getItem('token') == null && this.router.url !== '/jobs') {
            this.signOut();
          } else if (sessionStorage.getItem('token') == 'registration') {
            this.sidenavOpened = false;
          }
        }
      }
    })
  }

  ngOnInit(): void {
    this.coreService.signInObserver.subscribe(data => {
      if (data) {
        this.setLinks();
      } else {
        // this.signOut();
      }
    });

    if (sessionStorage.getItem('token') == null) {
      this.signOut();
    } else {
      this.setLinks();
    }

    this.setLinks();
  }

  setLinks() {
    this.links = this.getLinks();
    this.sidenavOpened = true;
  }

  getLinks() {
    return [
      { link: 'dashboard', text: 'Dashboard', icon: 'dashboard' },
      { link: 'stats', text: 'Statistics', icon: 'bar_chart' },
      { link: 'settings', text: 'Settings', icon: 'settings' }
    ]
  }

  signOut() {
    this.sidenavOpened = false;
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}
