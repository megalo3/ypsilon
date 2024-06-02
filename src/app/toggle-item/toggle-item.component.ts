import { Component, Input } from '@angular/core';
import { IToggleItem } from './toggle-item';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-toggle-item',
    standalone: true,
    imports: [NgClass],
    templateUrl: './toggle-item.component.html',
})
export class ToggleItemComponent {
    @Input() item?: IToggleItem;
    @Input() selected = false;
}
