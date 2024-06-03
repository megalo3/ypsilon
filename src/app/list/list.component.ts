import { NgClass, NgFor } from '@angular/common';
import { Component, Input, OnInit, Signal } from '@angular/core';
import { SlowTypeService, Speed } from '../slow-type.service';

@Component({
    selector: 'app-list',
    standalone: true,
    imports: [NgClass, NgFor],
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
    @Input() list: string[] = [];
    chain: Signal<string>[] = [];

    constructor(private slowType: SlowTypeService) {}

    ngOnInit(): void {
        const chainValues = this.list.map((item) => ({
            value: item,
            time: Speed.Fast,
        }));
        this.chain = this.slowType.slowTypeChain(chainValues);
    }
}
