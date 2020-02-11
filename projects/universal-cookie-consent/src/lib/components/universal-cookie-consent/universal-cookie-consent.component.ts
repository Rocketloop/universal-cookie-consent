import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UniversalCookieConsentViewState } from '../../models/universal-cookie-consent-view-state.model';
import { UniversalCookieConsentService } from '../../services/universal-cookie-consent.service';
import { Observable } from 'rxjs';
import { UniversalCookieConsentOptions } from '../../models/universal-cookie-consent-options.model';
import { map, shareReplay, take } from 'rxjs/operators';

@Component({
    selector: 'universal-cookie-consent',
    templateUrl: 'universal-cookie-consent.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: [
        'universal-cookie-consent.component.scss'
    ]
})
export class UniversalCookieConsentComponent implements OnInit {

    readonly ViewState = UniversalCookieConsentViewState;

    viewState$: Observable<UniversalCookieConsentViewState>;

    options$: Observable<UniversalCookieConsentOptions>;

    showModal$: Observable<boolean>;

    constructor(protected service: UniversalCookieConsentService) {
        this.viewState$ = this.service.getViewState().pipe(shareReplay(1));
        this.options$ = this.service.getOptions().pipe(shareReplay(1));
        this.showModal$ = this.service.getViewState().pipe(
            map(viewState => {
                return viewState === UniversalCookieConsentViewState.SIMPLE
                || viewState === UniversalCookieConsentViewState.ADVANCED;
            }),
            shareReplay(1)
        );
    }

    ngOnInit() {

    }

    async onAcceptClicked() {
        const options = await this.options$.pipe(take(1)).toPromise();
        const consentTypes = options.consentTypes;
        if (consentTypes) {
            this.service.setGrantedConsents(consentTypes.map(type => type.id));
            this.service.setViewState(UniversalCookieConsentViewState.CLOSED);
        }
    }

    onCustomizeClicked() {
        this.service.setViewState(UniversalCookieConsentViewState.ADVANCED);
    }

    onBackClicked() {
        this.service.setViewState(UniversalCookieConsentViewState.SIMPLE);
    }

    onSaveCustomizedClicked() {

    }

}
