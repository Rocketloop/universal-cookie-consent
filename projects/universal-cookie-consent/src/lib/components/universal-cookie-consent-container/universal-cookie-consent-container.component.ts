import { Component, OnInit, Inject, Input, OnChanges, SimpleChanges, EventEmitter, Output, OnDestroy } from '@angular/core';
import { UniversalCookieConsentService } from '../../services/universal-cookie-consent.service';
import { Observable, Subscription } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

import { UniversalCookieConsentOptions } from '../../models/universal-cookie-consent-options.model';
import { UniversalCookieConsentViewState } from '../../models/universal-cookie-consent-view-state.model';
import { UniversalCookieConsentType } from '../../models/universal-cookie-consent-type.model';

@Component({
    selector: 'universal-cookie-consent-container',
    templateUrl: './universal-cookie-consent-container.component.html'
})
export class UniversalCookieConsentContainerComponent implements OnInit, OnChanges, OnDestroy {

    @Input() viewState: UniversalCookieConsentViewState = UniversalCookieConsentViewState.CLOSED;

    @Input() consentTypes: UniversalCookieConsentType[];

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

    }

    ngOnInit() {
        this.subscription = this.service.getGrantedConsents().subscribe(this.update);
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    ngOnChanges(changes: SimpleChanges): void {
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
