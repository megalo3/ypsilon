import { Injectable, signal } from '@angular/core';
import { Subject } from 'rxjs';

export type Direction = 'Up' | 'Down';

@Injectable({
    providedIn: 'root',
})
export class NavigationService {
    admin = false;
    selectedIndex = 0;
    navigate = new Subject<Direction>();
    constructor() {}

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
        this.selectedIndex = 0;
    }

    select() {
        console.log('selecting nav option');
    }

    toggleAdmin() {
        this.admin = !this.admin;
    }
}
