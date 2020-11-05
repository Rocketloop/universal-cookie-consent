import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { UniversalCookieConsentViewState } from '../../models/universal-cookie-consent-view-state.model';
import { UniversalCookieConsentService } from '../../services/universal-cookie-consent.service';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { UniversalCookieConsentOptions } from '../../models/universal-cookie-consent-options.model';
import { map, shareReplay, take } from 'rxjs/operators';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'universal-cookie-consent',
    templateUrl: 'universal-cookie-consent.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: [
        'universal-cookie-consent.component.scss'
    ]
})
export class UniversalCookieConsentComponent implements OnInit, OnDestroy {

    readonly ViewState = UniversalCookieConsentViewState;

    /**
     * The current view state
     */
    viewState$: Observable<UniversalCookieConsentViewState>;

    /**
     * The current options
     */
    options$: Observable<UniversalCookieConsentOptions>;

    /**
     * Whether to show or hide the modal
     */
    showModal$: Observable<boolean>;

    /**
     * The currently granted consents
     */
    grantedConsents$: Observable<string[]>;

    /**
     * Form group for the customize view
     */
    customizeFormGroup: FormGroup;

    /**
     * Component subscription
     */
    subscription: Subscription;

    constructor(protected service: UniversalCookieConsentService, protected fb: FormBuilder) {
        this.viewState$ = this.service.getViewState().pipe(shareReplay(1));
        this.options$ = this.service.getOptions().pipe(shareReplay(1));
        this.showModal$ = this.service.getViewState().pipe(
            map(viewState => {
                return viewState === UniversalCookieConsentViewState.SIMPLE
                    || viewState === UniversalCookieConsentViewState.ADVANCED;
            }),
            shareReplay(1)
        );
        this.grantedConsents$ = this.service.getGrantedConsents();
    }

    ngOnInit() {
        this.subscription = combineLatest(this.grantedConsents$, this.options$).subscribe(([grantedConsents, options]) => {
            this.updateCustomizeForm(grantedConsents, options);
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    /**
     * Called when the user clicks the accept button, grants all consents and closes the modal
     */
    async onAcceptClicked() {
        const options = await this.options$.pipe(take(1)).toPromise();
        const consentTypes = options.consentTypes;
        if (consentTypes) {
            this.service.setGrantedConsents(consentTypes.map(type => type.id));
            this.service.setViewState(UniversalCookieConsentViewState.CLOSED);
        }
    }

    /**
     * Called when the user clicks the customize button, switches the view state
     */
    onCustomizeClicked() {
        this.service.setViewState(UniversalCookieConsentViewState.ADVANCED);
    }

    /**
     * Called when the user clicks the back button, switches the view state
     */
    onBackClicked() {
        this.service.setViewState(UniversalCookieConsentViewState.SIMPLE);
    }

    /**
     * Called when the user clicks the save button, updates the granted consents and closed the modal
     */
    async onSaveCustomizedClicked() {
        const options = await this.options$.pipe(take(1)).toPromise();
        const availableConsentTypes = options.consentTypes;
        const currentValue = this.customizeFormGroup.value;
        const grantedConsentTypes = Object.keys(currentValue).filter(consentType => currentValue[consentType]);
        const mandatoryConsentTypes = availableConsentTypes.filter(consentType => consentType.mandatory).map(consentType => consentType.id);
        this.service.setGrantedConsents([...mandatoryConsentTypes, ...grantedConsentTypes]);
        this.service.setViewState(UniversalCookieConsentViewState.CLOSED);
    }

    /**
     * Update the form with the given options
     * @param grantedConsents
     * @param options
     */
    protected updateCustomizeForm(grantedConsents: string[], options: UniversalCookieConsentOptions) {
        const controls = options.consentTypes ? options.consentTypes.reduce((types, type) => {
            return {
                ...types,
                [type.id]: [
                    {
                        value: Boolean(type.mandatory) || (grantedConsents || []).includes(type.id),
                        disabled: Boolean(type.mandatory)
                    }
                ]
            };
        }, {}) : {};
        this.customizeFormGroup = this.fb.group(controls);
    }

}
