import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { UniversalCookieConsentModule } from 'universal-cookie-consent';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        UniversalCookieConsentModule.forRoot({
            consentTypes: [
                {
                    id: 'base',
                    title: 'Base Functionality'
                }
            ]
        })
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
