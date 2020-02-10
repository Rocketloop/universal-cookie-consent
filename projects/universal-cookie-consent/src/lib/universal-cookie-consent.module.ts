import { NgModule, InjectionToken } from '@angular/core';
import { UniversalCookieConsentComponent } from './components/univseral-cookie-consent/universal-cookie-consent.component';
import { UniversalCookieConsentOptions, UNIVERSAL_COOKIE_CONSENT_OPTIONS } from './models/univseral-cookie-consent-options.model';
import { ModuleWithProviders } from '@angular/core';
import { UniversalCookieConsentService } from './services/universal-cookie-consent.service';

export const DEFAULT_MODULE_PROVIDERS = [
    UniversalCookieConsentService
];

@NgModule({
    declarations: [UniversalCookieConsentComponent],
    imports: [
    ],
    exports: [UniversalCookieConsentComponent],
    providers: DEFAULT_MODULE_PROVIDERS
})
export class UniversalCookieConsentModule {

    static forRoot(options: UniversalCookieConsentOptions): ModuleWithProviders {
        return {
            ngModule: UniversalCookieConsentModule,
            providers: [
                ...DEFAULT_MODULE_PROVIDERS,
                {
                    provide: UNIVERSAL_COOKIE_CONSENT_OPTIONS,
                    useValue: options
                }
            ]
        };
    }

    constructor() {
        console.log('Cookie Consent initialized');
    }
}
