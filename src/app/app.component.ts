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

    constructor(public nav: NavigationService) {}

    @HostListener('window:keydown.ArrowUp', ['$event']) onArrowUp() {
        this.nav.navigate('Up');
    }
    @HostListener('window:keydown.ArrowDown', ['$event']) onArrowDown() {
        this.nav.navigate('Down');
    }
    @HostListener('window:keydown.Enter', ['$event']) onEnter() {
        this.nav.select();
    }
    @HostListener('window:keydown', ['$event']) onKeyDown(e: { key: string }) {
        if (e.key.length === 1 && /[a-zA-Z]/.test(e.key)) {
            this.keyHistory.push(e.key);
            if (this.keyHistory.length > 5) {
                this.keyHistory.shift();
            }
            if (this.keyHistory.join('') === 'admin') {
                this.nav.toggleAdmin();
            }
        }
    }
}
