import { Component, OnInit } from '@angular/core';
import { MenuItemComponent } from '../menu-item/menu-item.component';
import { TitleComponent } from '../title/title.component';
import { ActivatedRoute, Route, RouterLink, RouterOutlet } from '@angular/router';
import { IPageData } from './page';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { ToggleItemComponent } from '../toggle-item/toggle-item.component';

@Component({
    selector: 'app-page',
    standalone: true,
    imports: [MenuItemComponent, TitleComponent, RouterLink, NgFor, RouterOutlet, NgIf, ToggleItemComponent, NgClass],
    templateUrl: './page.component.html',
    styleUrl: './page.component.scss',
})
export class PageComponent implements OnInit {
    data: IPageData = {};
    children: Route[] = [];
    showBack = false;

    constructor(public route: ActivatedRoute) {}

    ngOnInit(): void {
        this.children = this.route.snapshot.routeConfig?.children || [];
        this.showBack = this.route.snapshot.routeConfig?.path !== '';
        this.route.data.subscribe((data) => (this.data = data || {}));
    }
}
