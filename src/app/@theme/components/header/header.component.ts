import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';
import { NbAuthSimpleToken, NbAuthService } from '@nebular/auth';

import { Router } from '@angular/router';



import { UserData } from '../../../@core/data/users';
import { LayoutService } from '../../../@core/utils';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
    selector: 'ngx-header',
    styleUrls: ['./header.component.scss'],
    templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

    private destroy$: Subject<void> = new Subject<void>();
    userPictureOnly: boolean = false;
    user: any;

    userMenu = [{ title: 'Log out' }];
    tag = 'my-context-menu';

    constructor(
        private router: Router,
        private sidebarService: NbSidebarService,
        private menuService: NbMenuService,
        private themeService: NbThemeService,
        private userService: UserData,
        private layoutService: LayoutService,
        private breakpointService: NbMediaBreakpointsService,
        private authService: NbAuthService,
    ) {
        this.authService.getToken()
            .subscribe((token: NbAuthSimpleToken) => {
                if (token.isValid()) {
                    this.user = token.getPayload();
                } else {
                    this.router.navigate(['/auth/login']);
                }
            });
    }

    ngOnInit() {
        this.userService.getUsers()
            .pipe(takeUntil(this.destroy$))
            .subscribe((users: any) => this.user = users.nick);

        const { xl } = this.breakpointService.getBreakpointsMap();
        this.themeService.onMediaQueryChange()
            .pipe(
                map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
                takeUntil(this.destroy$),
            )
            .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);

        this.menuService.onItemClick()
            .subscribe((event) => {
                this.onContecxtItemSelection(event.item.title);
            });
    }

    onContecxtItemSelection(title) {
        if (title === 'Log out') {
            localStorage.removeItem('auth_app_token');
            this.router.navigateByUrl('/auth/login');
        }

    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

    toggleSidebar(): boolean {
        this.sidebarService.toggle(true, 'menu-sidebar');
        this.layoutService.changeLayoutSize();

        return false;
    }

    navigateHome() {
        this.menuService.navigateHome();
        return false;
    }
}
