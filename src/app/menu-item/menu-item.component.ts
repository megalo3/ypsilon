import { NgClass, NgIf } from '@angular/common';
import { Component, Input, Type } from '@angular/core';
import { Resolve, ResolveFn, RouterLink } from '@angular/router';
import { IPageData } from '../page/page';

@Component({
    selector: 'app-menu-item',
    templateUrl: './menu-item.component.html',
    standalone: true,
    imports: [RouterLink, NgIf, NgClass],
})
export class MenuItemComponent {
    @Input() name: string | Type<Resolve<string>> | ResolveFn<string> = '';
    @Input() path: string | undefined = '';
    @Input() data: IPageData = {};
    @Input() selected = false;
}
