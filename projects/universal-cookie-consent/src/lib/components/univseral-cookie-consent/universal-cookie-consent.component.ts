import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'universal-cookie-consent',
    templateUrl: 'universal-cookie-consent.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styles: []
})
export class UniversalCookieConsentComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }

}
