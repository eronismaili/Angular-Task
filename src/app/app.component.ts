import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [
    RouterOutlet
  ],
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string | undefined;
  constructor(private translate: TranslateService) {
    const language = localStorage.getItem('language') || 'en';
    this.translate.use(language);
  }

  switchLanguage(language: string): void {
    this.translate.use(language);
    localStorage.setItem('language', language);
  }

}
