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
            autoShow: true,
            logoUrl: 'assets/logo.png',
            consentTypes: [
                {
                    id: 'base',
                    title: 'Base Functionality',
                    description: 'These cookies are required for the functionality of this website and can\'t be disabled.',
                    mandatory: true
                },
                {
                    id: 'analytics',
                    title: 'Analytics',
                    description: 'We use these cookies to improve our website.',
                    color: 'orange'
                }
            ],
            disableBodyScroll: true,
            introText: 'We use cookies in order to improve our website continuously. By confirming the button "Accept" you agree to the use of cookies. By clicking the "Customize" button, you can select which cookies you wish to accept. For further information, please refer to our privacy policy.',
            customizeIntroText: 'Use the following settings to personalize which cookies you want to allow.',
            cookieSettings: {
                expires: 365
            }
        })
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
