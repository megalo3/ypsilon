import { NgClass } from '@angular/common';
import { Component, Input, Type, ChangeDetectionStrategy } from '@angular/core';
import { Resolve, ResolveFn } from '@angular/router';
import { IPageData } from '../page/page';

@Component({
    selector: 'app-menu-item',
    templateUrl: './menu-item.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [NgClass]
})
export class MenuItemComponent {
    @Input() name: string | Type<Resolve<string>> | ResolveFn<string> = '';
    @Input() path: string | undefined = '';
    @Input() data: IPageData = {};
    @Input() selected = false;
}
