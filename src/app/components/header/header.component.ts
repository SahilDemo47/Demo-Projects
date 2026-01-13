import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone:false
})
export class HeaderComponent implements OnInit {

  pageTitle = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.setPageTitle();
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.setPageTitle();
      });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  private setPageTitle() {
    const title = this.getTitleFromRouteTree(this.router.routerState.snapshot.root);
    this.pageTitle = title ?? '';
  }

  private getTitleFromRouteTree(route: any): string | null {
    let current = route;
    while (current.firstChild) {
      current = current.firstChild;
    }
    return current.data?.['title'] ?? null;
  }
}
