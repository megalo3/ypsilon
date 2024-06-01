import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuItemComponent } from '../menu-item/menu-item.component';
import { TitleComponent } from '../title/title.component';
import { ActivatedRoute, Route, RouterLink, RouterOutlet } from '@angular/router';
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
    ],
    templateUrl: './page.component.html',
    styleUrl: './page.component.scss',
})
export class PageComponent implements OnInit, OnDestroy {
    data: IPageData = {};
    children: Route[] = [];
    showBack = false;
    #subscriptions = new Subscription();

    get selectedIndex() {
        return this.nav.selectedIndex;
    }

    constructor(public route: ActivatedRoute, private nav: NavigationService) {}

    ngOnInit(): void {
        this.children = this.route.snapshot.routeConfig?.children || [];
        this.showBack = this.route.snapshot.routeConfig?.path !== '';
        this.route.data.subscribe((data) => (this.data = data || {}));
        this.#subscriptions.add(
            this.nav.navigate.subscribe(direction => this.nav.loopNav(direction, this.children.length))
        );
    }

    ngOnDestroy(): void {
        this.nav.reset();
        this.#subscriptions.unsubscribe();
    }
}
