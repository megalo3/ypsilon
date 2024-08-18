import { Component, HostListener } from '@angular/core';
import { NavigationService } from './navigation.service';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet],
    templateUrl: './app.component.html',
})
export class AppComponent {
    title = 'ypsilon';
    keyHistory: string[] = [];

    @HostListener('window:keydown.ArrowUp', ['$event']) onArrowUp() {
        this.nav.navigate.next('Up');
    }
    @HostListener('window:keydown.ArrowDown', ['$event']) onArrowDown() {
        this.nav.navigate.next('Down');
    }
    @HostListener('window:keydown.Enter', ['$event']) onEnter() {
        this.nav.select.next();
    }
    @HostListener('window:keydown', ['$event']) onKeyDown(e: { key: string }) {
        if (e.key.length === 1 && /[a-zA-Z]/.test(e.key)) {
            this.keyHistory.push(e.key);
            if (this.keyHistory.length > 5) {
                this.keyHistory.shift();
            }
            const history = this.keyHistory.join('');
            if (/admin/.test(history)) {
                this.nav.toggleAdmin();
                this.keyHistory = [];
            }
            if (/undo/.test(history)) {
                this.nav.toggleSelfDestruct(true);
                this.keyHistory = [];
            }
        }
    }

    constructor(public nav: NavigationService) {}
}
