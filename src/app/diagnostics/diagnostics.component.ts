import { Component, OnInit, Signal, signal } from '@angular/core';
import { TitleComponent } from '../title/title.component';
import { RouterLink } from '@angular/router';
import { SlowTypeService } from '../slow-type.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
    selector: 'app-diagnostics',
    standalone: true,
    imports: [TitleComponent, RouterLink, NgFor, NgIf],
    templateUrl: './diagnostics.component.html',
})
export class DiagnosticsComponent implements OnInit {
    chain: Signal<string>[] = [];

    constructor(private slowType: SlowTypeService) {}

    ngOnInit(): void {
        const speed = 30;
        const fast = 10;
        const slow =  250;
        const pause = 500;
        this.chain = this.slowType.slowTypeChain([
            { value: 'Checking life support', time: speed },
            { value: '.......', time: slow },
            { value: 'Done.', time: speed },
            { value: ' ', time: pause },
            { value: 'Checking main systems', time: speed },
            { value: '.......', time: slow },
            { value: 'Done.', time: speed },
            { value: ' ', time: pause },
            { value: 'WARNING: Airflow 82.4%. Check crew quarters vents for blockage.', time: speed, },
            { value: ' ', time: pause },
            { value: 'WARNING: Shower #5 non-functional as of 1 day(s).', time: speed, },
            { value: ' ', time: pause },
            { value: 'NOTICE: Air filters replaced 455 day(s) ago.', time: speed, },
            { value: ' ', time: pause },
            { value: 'NOTICE: Mineshaft lift maintained 455 day(s) ago.', time: speed, },
            { value: ' ', time: pause },
            { value: '===========', time: fast, },
            { value: 'SUMMARY:', time: speed, },
            { value: 'All systems operating within acceptable parameters.', time: speed, },
        ]);
    }
}
