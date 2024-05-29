import { Component, OnInit, Signal, signal } from '@angular/core';
import { TitleComponent } from '../title/title.component';
import { RouterLink } from '@angular/router';
import { SlowTypeService } from '../slow-type.service';

@Component({
    selector: 'app-diagnostics',
    standalone: true,
    imports: [TitleComponent, RouterLink],
    templateUrl: './diagnostics.component.html',
})
export class DiagnosticsComponent implements OnInit {
    text: Signal<string> = signal('One');

    constructor(private slowType: SlowTypeService) {}

    ngOnInit(): void {
        const input = 'Checking life support....... Done.';
        this.text = this.slowType.slowType(input, 50);
    }
}
