import { Inject, Injectable, Optional, Renderer2, RendererFactory2 } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { UniversalCookieConsentViewState } from '../models/universal-cookie-consent-view-state.model';
import { UNIVERSAL_COOKIE_CONSENT_OPTIONS, UniversalCookieConsentOptions } from '../models/universal-cookie-consent-options.model';
import { DOCUMENT } from '@angular/common';
import { clearCookie, readCookie, writeCookie } from '../helpers/cookie.helper';
import { skip } from 'rxjs/operators';

const UNIVERSAL_COOKIE_CONSENT_CONSENTS_KEY = 'consents';

/** @dynamic */
@Injectable()
export class UniversalCookieConsentService {

    viewState$: BehaviorSubject<UniversalCookieConsentViewState> = new BehaviorSubject(
        UniversalCookieConsentViewState.CLOSED);

    options$: BehaviorSubject<UniversalCookieConsentOptions> = new BehaviorSubject(null);

    grantedConsents$: BehaviorSubject<string[]> = new BehaviorSubject(null);

    protected originalBodyOverflow: string;

    private renderer: Renderer2;

    constructor(@Optional() @Inject(UNIVERSAL_COOKIE_CONSENT_OPTIONS) private defaultOptions: UniversalCookieConsentOptions,
                @Inject(DOCUMENT) private document: Document,
                rendererFactory: RendererFactory2) {
        this.renderer = rendererFactory.createRenderer(null, null);
        this.options$.next(defaultOptions);

        combineLatest(this.viewState$, this.options$).subscribe(([viewState, options]) => {
            this.updateBodyScroll(viewState, options);
        });

        const grantedConsents = readCookie<string[]>(UNIVERSAL_COOKIE_CONSENT_CONSENTS_KEY);
        this.grantedConsents$.next(grantedConsents);

        this.grantedConsents$.subscribe((consents) => this.onConsentsUpdated(consents));
    }

    getGrantedConsents(): Observable<string[]> {
        return this.grantedConsents$.asObservable();
    }

    setGrantedConsents(consents: string[]) {
        console.log(consents);
        this.grantedConsents$.next(consents);
    }

    /**
     * Get the current view state
     */
    getViewState(): Observable<UniversalCookieConsentViewState> {
        return this.viewState$.asObservable();
    }

    /**
     * Get the current options
     */
    getOptions(): Observable<UniversalCookieConsentOptions> {
        return this.options$.asObservable();
    }

    setViewState(viewState: UniversalCookieConsentViewState) {
        this.viewState$.next(viewState);
    }

    setOptions(options: UniversalCookieConsentOptions) {
        const defaultOptions = this.defaultOptions || {};
        this.options$.next({
            ...defaultOptions,
            ...options
        });
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
        if (options) {
            this.setOptions(options);
        }
        this.setViewState(
            showAdvanced ? UniversalCookieConsentViewState.ADVANCED : UniversalCookieConsentViewState.SIMPLE);
    }

    protected onConsentsUpdated(consents: string[]) {
        console.log('update', consents);
        if (consents) {
            writeCookie(UNIVERSAL_COOKIE_CONSENT_CONSENTS_KEY, consents);
        } else {
            clearCookie(UNIVERSAL_COOKIE_CONSENT_CONSENTS_KEY);
        }
    }

    /**
     * Update the body element's overflow property as needed
     */
    protected updateBodyScroll(viewState: UniversalCookieConsentViewState, options: UniversalCookieConsentOptions) {
        const body = this.document.body;
        if (options.disableBodyScroll &&
            (viewState === UniversalCookieConsentViewState.SIMPLE || viewState === UniversalCookieConsentViewState.ADVANCED)) {
            this.originalBodyOverflow = body.style.overflow;
            this.renderer.setStyle(this.document.body, 'overflow', 'hidden');
        } else {
            this.renderer.setStyle(this.document.body, 'overflow', this.originalBodyOverflow);
        }
    }
}
