import { Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';
import { UniversalCookieConsentContainerComponent } from 'projects/universal-cookie-consent/src/public-api';
import { UniversalCookieConsentModule } from 'universal-cookie-consent';

@NgModule({
    imports: [
        BrowserModule,
        UniversalCookieConsentModule.forRoot()
    ],
    providers: [],
})
export class AppModule {

    constructor(private injector: Injector) { }

    ngDoBootstrap() {
        const element = createCustomElement(UniversalCookieConsentContainerComponent, { injector: this.injector })
        customElements.define("ucc-container", element);
    }
}
