import { Component, OnDestroy, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TitleComponent } from '../title/title.component';
import { Subscription } from 'rxjs';
import { NavigationService } from '../navigation.service';

@Component({
    selector: 'app-map',
    imports: [TitleComponent],
    templateUrl: './map.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './map.component.scss'
})
export class MapComponent implements OnInit, OnDestroy {
    #subscriptions = new Subscription();

    constructor(
        private nav: NavigationService,
        private router: Router,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.#subscriptions.add(
            this.nav.select.subscribe(() =>
                this.router.navigate(['..'], { relativeTo: this.route })
            )
        );
    }

    ngOnDestroy(): void {
        this.#subscriptions.unsubscribe();
    }
}
