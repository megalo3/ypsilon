import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { IToggleItem } from './toggle-item';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-toggle-item',
    imports: [NgClass],
    changeDetection: ChangeDetectionStrategy.Eager,
    templateUrl: './toggle-item.component.html'
})
export class ToggleItemComponent {
    @Input() item?: IToggleItem;
    @Input() selected = false;
}
