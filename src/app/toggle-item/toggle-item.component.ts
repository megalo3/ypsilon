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

    toggle() {
        const status = this.item?.toggleValues.filter(value => value !== this.item?.status) || [];
        if (this.item && status.length > 0) {
            this.item.status = status[0];
        }
    }
}
