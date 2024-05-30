import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TitleComponent } from '../title/title.component';

@Component({
    selector: 'app-map',
    standalone: true,
    imports: [RouterLink, TitleComponent],
    templateUrl: './map.component.html',
    styleUrl: './map.component.scss',
})
export class MapComponent {}
