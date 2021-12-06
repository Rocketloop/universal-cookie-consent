import { ModuleWithProviders, NgModule } from '@angular/core';
import { UniversalCookieConsentComponent } from './components/universal-cookie-consent/universal-cookie-consent.component';
import { UNIVERSAL_COOKIE_CONSENT_OPTIONS, UniversalCookieConsentOptions } from './models/universal-cookie-consent-options.model';
import { UniversalCookieConsentService } from './services/universal-cookie-consent.service';
import { UniversalCookieConsentContainerComponent } from './components/universal-cookie-consent-container/universal-cookie-consent-container.component';
import { CommonModule } from '@angular/common';
import { UiSwitchComponent } from './components/ui-switch/ui-switch.component';
import { ReactiveFormsModule } from '@angular/forms';

export const DEFAULT_MODULE_PROVIDERS = [
    UniversalCookieConsentService
];

export const UNIVERSAL_COOKIE_CONSENT_OPTION_DEFAULTS: Partial<UniversalCookieConsentOptions> = {
    acceptText: 'Accept',
    customizeText: 'Customize',
    backText: 'Back',
    saveText: 'Save',
    customizeHeadingText: 'Cookie Settings'
};

@NgModule({
    declarations: [UniversalCookieConsentComponent, UniversalCookieConsentContainerComponent, UiSwitchComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule
    ],
    exports: [UniversalCookieConsentComponent, UniversalCookieConsentContainerComponent],
    providers: DEFAULT_MODULE_PROVIDERS
})
export class UniversalCookieConsentModule {

    static forRoot(options: UniversalCookieConsentOptions = null): ModuleWithProviders<UniversalCookieConsentModule> {
        return {
            ngModule: UniversalCookieConsentModule,
            providers: [
                ...DEFAULT_MODULE_PROVIDERS,
                {
                    provide: UNIVERSAL_COOKIE_CONSENT_OPTIONS,
                    useValue: {
                        ...UNIVERSAL_COOKIE_CONSENT_OPTION_DEFAULTS,
                        ...(options || {})
                    }
                }
            ]
        };
    }

    constructor() {

    }
}
