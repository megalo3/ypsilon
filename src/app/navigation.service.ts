import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class NavigationService {
    admin = false;
    constructor() {}

    navigate(direction: 'Up' | 'Down') {
        console.log(direction);
    }

    select() {
        console.log('selecting nav option');
    }

    toggleAdmin() {
        this.admin = !this.admin;
    }
}
