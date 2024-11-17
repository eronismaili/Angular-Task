import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { routes } from './app/app.routes';
import {HttpClient, provideHttpClient} from "@angular/common/http";
import { provideStore } from '@ngrx/store';
import {HttpLoaderFactory} from "./app/translation-loader";
import { provideEffects } from '@ngrx/effects';


bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideStore(),
    TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient],
        },
    }).providers!,
    provideEffects()
]
}).catch(err => console.error(err));
