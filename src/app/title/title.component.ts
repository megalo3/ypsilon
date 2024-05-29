import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavigationService } from '../navigation.service';

@Component({
    selector: 'app-title',
    templateUrl: './title.component.html',
    standalone: true,
    imports: [NgIf]
})
export class TitleComponent implements OnInit {
    title = '';

    constructor(private route: ActivatedRoute, public navigation: NavigationService) {}

    ngOnInit(): void {
        this.route.title.subscribe(title => this.title = title || '');
    }
}
