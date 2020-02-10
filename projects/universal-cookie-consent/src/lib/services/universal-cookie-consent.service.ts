import { Injectable, Optional, Inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UniversalCookieConsentViewState } from '../models/univseral-cookie-consent-view-state.model';
import { UniversalCookieConsentOptions, UNIVERSAL_COOKIE_CONSENT_OPTIONS } from '../models/univseral-cookie-consent-options.model';

@Injectable()
export class UniversalCookieConsentService {

    viewState$: BehaviorSubject<UniversalCookieConsentViewState> = new BehaviorSubject(UniversalCookieConsentViewState.CLOSED);

    currentOptions$: BehaviorSubject<UniversalCookieConsentOptions> = new BehaviorSubject(null);

    constructor(@Optional() @Inject(UNIVERSAL_COOKIE_CONSENT_OPTIONS) private defaultOptions: UniversalCookieConsentOptions) { }

    /**
     * Get the current view state
     */
    getViewState(): Observable<UniversalCookieConsentViewState> {
        return this.viewState$.asObservable();
    }

    /**
     * Show the cookie consent prompt
     * @param options The cookie consent options passed to the cookie consent prompt
     */
    show(options?: UniversalCookieConsentOptions);
    show(showAdvanced: boolean, options?: UniversalCookieConsentOptions);
    show(optionsOrShowAdvanced?: UniversalCookieConsentOptions | boolean, options?: UniversalCookieConsentOptions) {
        let showAdvanced = false;
        if (optionsOrShowAdvanced && typeof optionsOrShowAdvanced === 'boolean') {
            showAdvanced = optionsOrShowAdvanced;
        } else {
            options = optionsOrShowAdvanced as UniversalCookieConsentOptions;
        }
        if (!options) {
            if (!this.defaultOptions) {
                throw new Error('Universal Cookie Consent options'
                    + 'must be set either using default options or passed to the show method');
            }
            options = this.defaultOptions;
        }
        this.currentOptions$.next(options);
        this.viewState$.next(showAdvanced ? UniversalCookieConsentViewState.ADVANCED : UniversalCookieConsentViewState.SIMPLE);
    }
}
