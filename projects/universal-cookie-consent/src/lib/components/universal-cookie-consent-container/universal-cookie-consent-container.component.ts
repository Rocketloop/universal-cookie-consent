import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { UniversalCookieConsentService } from '../../services/universal-cookie-consent.service';
import { Subscription } from 'rxjs';
import { UniversalCookieConsentViewState } from '../../models/universal-cookie-consent-view-state.model';
import { UniversalCookieConsentType } from '../../models/universal-cookie-consent-type.model';

@Component({
    selector: 'universal-cookie-consent-container',
    templateUrl: './universal-cookie-consent-container.component.html'
})
export class UniversalCookieConsentContainerComponent implements OnInit, OnChanges, OnDestroy {

    @Input() viewState: UniversalCookieConsentViewState = UniversalCookieConsentViewState.CLOSED;

    @Input() consentTypes: UniversalCookieConsentType[] = [];

    @Input() logoUrl: string;

    @Input() introText: string;

    @Input() customizeText: string;

    @Input() acceptText: string;

    @Input() customizeHeadingText: string;

    @Input() customizeIntroText: string;

    @Input() backText: string;

    @Input() saveText: string;

    @Input() disableBodyScroll = false;

    @Output() update = new EventEmitter();

    subscription: Subscription;

    constructor(protected service: UniversalCookieConsentService) {
        console.log('UniversalCookieConsentContainerComponent.constructor');
    }

    ngOnInit() {
        this.subscription = this.service.getGrantedConsents().subscribe(this.update);
        console.log('UniversalCookieConsentContainerComponent.ngOnInit');
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    ngOnChanges(changes: SimpleChanges): void {
        console.log('UniversalCookieConsentContainerComponent.ngOnChanges', changes);
        this.updateOptions();
        this.updateViewState();
    }

    protected updateOptions() {
        this.service.setOptions({
            consentTypes: this.consentTypes,
            logoUrl: this.logoUrl,
            introText: this.introText,
            customizeText: this.customizeText,
            acceptText: this.acceptText,
            customizeHeadingText: this.customizeHeadingText,
            customizeIntroText: this.customizeIntroText,
            backText: this.backText,
            saveText: this.saveText,
            disableBodyScroll: this.disableBodyScroll
        });
    }

    protected updateViewState() {
        this.service.setViewState(this.viewState);
    }

}
