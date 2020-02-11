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
            logoUrl: 'assets/logo.png',
            consentTypes: [
                {
                    id: 'base',
                    title: 'Base Functionality',
                    description: 'These cookies are required for the functionality of this website'
                }
            ],
            disableBodyScroll: true
        })
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
