import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuItemComponent } from '../menu-item/menu-item.component';
import { TitleComponent } from '../title/title.component';
import {
    ActivatedRoute,
    Route,
    Router,
    RouterLink,
    RouterModule,
    RouterOutlet,
} from '@angular/router';
import { IPageData } from './page';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { ToggleItemComponent } from '../toggle-item/toggle-item.component';
import { ListComponent } from '../list/list.component';
import { NavigationService } from '../navigation.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-page',
    standalone: true,
    imports: [
        MenuItemComponent,
        TitleComponent,
        RouterLink,
        NgFor,
        RouterOutlet,
        NgIf,
        ToggleItemComponent,
        NgClass,
        ListComponent,
        RouterModule,
    ],
    templateUrl: './page.component.html',
    styleUrl: './page.component.scss',
})
export class PageComponent implements OnInit, OnDestroy {
    data: IPageData = {};
    children: Route[] = [];
    showBack = false;
    get hasChildren(): boolean {
        return this.route.children.length !== 0;
    }
    #subscriptions = new Subscription();

    get selectedIndex(): number {
        return this.nav.selectedIndex;
    }

    get hasBackButton(): boolean {
        return this.route.snapshot.url.length > 0;
    }

    constructor(
        public route: ActivatedRoute,
        private nav: NavigationService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.children = this.route.snapshot.routeConfig?.children || [];
        this.showBack = this.route.snapshot.routeConfig?.path !== '';
        this.route.data.subscribe((data) => (this.data = data || {}));
        this.#subscriptions.add(
            this.nav.navigate.subscribe((direction) => {
                if (!this.hasChildren) {
                    const length = this.children.length + (this.hasBackButton ? 1 : 0);
                    this.nav.loopNav(direction, length);
                }
            })
        );
        this.#subscriptions.add(
            this.nav.select.subscribe(() => {
                if (!this.hasChildren) {
                    // If there is no child, it is a back button
                    const child = this.children[this.selectedIndex - 1];
                    const path = !child ? '..' : this.children[this.selectedIndex - 1].path;
                    this.router.navigate([path], { relativeTo: this.route });
                }
            })
        );
    }

    ngOnDestroy(): void {
        this.nav.reset();
        this.#subscriptions.unsubscribe();
    }
}
