import { Component, OnDestroy, OnInit, Signal, signal } from '@angular/core';
import { TitleComponent } from '../title/title.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SlowTypeService, Speed } from '../slow-type.service';
import { NgFor, NgIf } from '@angular/common';
import { Subscription } from 'rxjs';
import { NavigationService } from '../navigation.service';

@Component({
    selector: 'app-diagnostics',
    standalone: true,
    imports: [TitleComponent, RouterLink, NgFor, NgIf],
    templateUrl: './diagnostics.component.html',
})
export class DiagnosticsComponent implements OnInit, OnDestroy {
    chain: Signal<string>[] = [];
    #subscriptions = new Subscription();

    constructor(
        private slowType: SlowTypeService,
        private nav: NavigationService,
        private router: Router,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.chain = this.slowType.slowTypeChain([
            { value: 'Checking life support', time: Speed.Normal },
            { value: '.......', time: Speed.Slow },
            { value: 'Done.', time: Speed.Normal },
            { value: ' ', time: Speed.Pause },
            { value: 'Checking main systems', time: Speed.Normal },
            { value: '.......', time: Speed.Slow },
            { value: 'Done.', time: Speed.Normal },
            { value: ' ', time: Speed.Pause },
            {
                value: 'WARNING: Airflow 82.4%. Check crew quarters vents for blockage.',
                time: Speed.Normal,
            },
            { value: ' ', time: Speed.Pause },
            {
                value: 'WARNING: Shower #5 non-functional as of 1 day(s).',
                time: Speed.Normal,
            },
            { value: ' ', time: Speed.Pause },
            {
                value: 'NOTICE: Air filters replaced 455 day(s) ago.',
                time: Speed.Normal,
            },
            { value: ' ', time: Speed.Pause },
            {
                value: 'NOTICE: Mineshaft lift maintained 455 day(s) ago.',
                time: Speed.Normal,
            },
            { value: ' ', time: Speed.Pause },
            { value: '===========', time: Speed.Fast },
            { value: 'SUMMARY:', time: Speed.Normal },
            {
                value: 'All systems operating within acceptable parameters.',
                time: Speed.Normal,
            },
        ]);

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
