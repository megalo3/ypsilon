import { Injectable, signal } from '@angular/core';
import { coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subject, filter, map } from 'rxjs';

export type Direction = 'Up' | 'Down';

@Injectable({
    providedIn: 'root',
})
export class NavigationService {
    admin = false;
    destructTimeRemaining = signal<string>('');
    selfDestruct?: number;
    selectedIndex = 1;
    navigate = new Subject<Direction>();
    select = new Subject<void>();
    #timer: any;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) {
        this.#subscribeToTitleChanges();
        this.admin = coerceBooleanProperty(
            localStorage.getItem('ypsilon-admin')
        );

        const destructTime = coerceNumberProperty(
            localStorage.getItem('ypsilon-destruct')
        );
        if (destructTime) {
            this.selfDestruct = destructTime;
            this.#startCountdown();
        }
    }

    #subscribeToTitleChanges() {
        this.router.events
            .pipe(
                filter((event) => event instanceof NavigationEnd),
                map(() => this.activatedRoute)
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
        localStorage.setItem('ypsilon-admin', this.admin.toString());
    }

    toggleSelfDestruct() {
        if (!this.selfDestruct) {
            this.selfDestruct = new Date().setTime(new Date().getTime() + 9 * 60 * 1000);
            this.destructTimeRemaining.set('15:00');
            this.#startCountdown();
            localStorage.setItem(
                'ypsilon-destruct',
                this.selfDestruct.toString()
            );
        } else {
            this.selfDestruct = undefined;
            this.destructTimeRemaining.set('');
            localStorage.removeItem('ypsilon-destruct');
        }
    }

    #getTimeRemaining(): string {
        if (!this.selfDestruct) {
            return '';
        }
        const secondsRemaining = this.selfDestruct - Date.now();
        const minutes = Math.floor(secondsRemaining / 60000);
        const seconds = Math.round((secondsRemaining % 60000)/1000);
        if (minutes < 0 || seconds < 0) {
            this.#stopCountdown();
            return '00:00';
        }
        const minPrefix = minutes < 10 ? '0' : '';
        const secPrefix = seconds < 10 ? '0' : '';
        return `${minPrefix}${minutes}:${secPrefix}${seconds}`;
    }

    #startCountdown(): void {
        this.#timer = setInterval(() => {
            this.destructTimeRemaining.set(this.#getTimeRemaining());
        }, 1000);
    }

    #stopCountdown(): void {
        clearInterval(this.#timer);
    }
}
