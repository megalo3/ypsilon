import { Component, OnDestroy, OnInit, Signal } from '@angular/core';
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
import { IToggleItem } from '../toggle-item/toggle-item';
import { SlowTypeService, Speed } from '../slow-type.service';

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
    introChain: Signal<string>[] = [];

    get hasChildren(): boolean {
        return this.route.children.length !== 0;
    }

    get selectedIndex(): number {
        return this.nav.selectedIndex;
    }

    get hasBackButton(): boolean {
        return this.route.snapshot.url.length > 0;
    }

    get items(): (Route | IToggleItem)[] {
        return [...this.children, ...(this.data?.toggleItems || [])];
    }

    get destruct(): Signal<string> {
        return this.nav.destructTimeRemaining;
    }

    #subscriptions = new Subscription();

    constructor(
        private route: ActivatedRoute,
        private nav: NavigationService,
        private router: Router,
        private slowType: SlowTypeService
    ) {}

    ngOnInit(): void {
        this.children = this.route.snapshot.routeConfig?.children || [];
        this.showBack = this.route.snapshot.routeConfig?.path !== '';
        this.route.data.subscribe((data) => (this.data = data || {}));
        this.#subscriptions.add(
            this.nav.navigate.subscribe((direction) => {
                if (!this.hasChildren) {
                    const length =
                        this.items.length + (this.hasBackButton ? 1 : 0);
                    this.nav.loopNav(direction, length);
                }
            })
        );
        this.#subscriptions.add(
            this.nav.select.subscribe(() => {
                if (!this.hasChildren) {
                    // If there is no child, it is a back button
                    const child = this.items[this.selectedIndex - 1];
                    this.selectItem(child);
                }
            })
        );

        if (this.data.intro) {
            const chainValues = this.data.intro.map((item) => ({
                value: item,
                time: Speed.Normal,
            }));
            this.introChain = this.slowType.slowTypeChain(chainValues);
    }
    }

    ngOnDestroy(): void {
        this.nav.reset();
        this.#subscriptions.unsubscribe();
    }

    selectItem(item: Route | IToggleItem | undefined): void {
        // Back Button
        if (!item) {
            this.router.navigate(['..'], { relativeTo: this.route });
            return;
        }

        // Route
        if ((item as Route).path) {
            this.router.navigate([(item as Route).path], {
                relativeTo: this.route,
            });
            return;
        }

        // Toggle Item
        if ((item as IToggleItem).toggleValues) {
            this.toggle(item as IToggleItem);
        }
    }

    toggle(item: IToggleItem) {
        if (item.name === 'Activate Self Destruct') {
            this.nav.toggleSelfDestruct();
            item.status = 'ACTIVE';
            return;
        }

        const status = item.toggleValues.filter((value) => value !== item.status) || [];
        if (item && status.length > 0) {
            item.status = status[0];
        }
    }
}
