import { ModuleWithProviders, NgModule, Component, Type, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UniversalCookieConsentService } from './services/universal-cookie-consent.service';
import { Observable, of, never } from 'rxjs';
import { UniversalCookieConsentViewState } from './models/universal-cookie-consent-view-state.model';
import { UniversalCookieConsentOptions } from './models/universal-cookie-consent-options.model';


@Component({
    selector: 'universal-cookie-consent',
    template: ''
})
export class UniversalCookieConsentDummyComponent {

    constructor() {}

}

@Injectable()
export class UniversalCookieConsentDummyService {

    getGrantedConsents(): Observable<string[]> {
        return of([]);
    }

    setGrantedConsents(): void {
        return;
    }
    getViewState(): Observable<UniversalCookieConsentViewState> {
        return of(UniversalCookieConsentViewState.CLOSED);
    }
    getOptions(): Observable<UniversalCookieConsentOptions> {
        return never();
    }
    setViewState(): void {
        return;
    }
    setOptions(): void {
        return;
    }

    show(): void {
        return;
    }

}

@NgModule({
    declarations: [UniversalCookieConsentDummyComponent],
    imports: [
        CommonModule
    ],
    exports: [UniversalCookieConsentDummyComponent],
})
export class UniversalCookieConsentDummyModule {

    static forRoot(): ModuleWithProviders<UniversalCookieConsentDummyModule> {
        return {
            ngModule: UniversalCookieConsentDummyModule,
            providers: [
                {
                    provide: UniversalCookieConsentService,
                    useValue: new UniversalCookieConsentDummyService()
                }
            ]
        };
    }

    constructor() {

    }
}
