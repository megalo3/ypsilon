import { Injectable } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subject, filter, map } from 'rxjs';

export type Direction = 'Up' | 'Down';

@Injectable({
    providedIn: 'root',
})
export class NavigationService {
    admin = false;
    selectedIndex = 1;
    navigate = new Subject<Direction>();
    select = new Subject<void>();

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) {
        this.#subscribeToTitleChanges();
        this.init();
    }

    init(): void {
        const savedAdmin = coerceBooleanProperty(
            localStorage.getItem('ypsilon-admin')
        );
        if (savedAdmin) {
            this.admin = savedAdmin;
        }
    }

    #subscribeToTitleChanges() {
        this.router.events
            .pipe(
                filter((event) => event instanceof NavigationEnd),
                map(() => this.activatedRoute),
            )
            .subscribe(() => {
                this.reset();
            });
    }

    loopNav(direction: 'Up' | 'Down', totalItems: number) {
        let value = this.selectedIndex;
        if (direction === 'Down') {
            value++;
        }
        if (direction === 'Up') {
            value--;
        }
        if (value > totalItems) {
            value -= totalItems;
        }
        if (value < 1) {
            value = totalItems;
        }
        this.selectedIndex = value;
    }

    reset() {
        this.selectedIndex = 1;
    }

    toggleAdmin() {
        this.admin = !this.admin;
        localStorage.setItem('ypsilon-admin', 'true');
    }
}
