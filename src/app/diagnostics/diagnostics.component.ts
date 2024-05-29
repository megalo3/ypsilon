import { Component } from '@angular/core';
import { TitleComponent } from '../title/title.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-diagnostics',
  standalone: true,
  imports: [TitleComponent, RouterLink],
  templateUrl: './diagnostics.component.html',
})
export class DiagnosticsComponent {

}
