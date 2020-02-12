import { Component, OnInit } from '@angular/core';
import { UniversalCookieConsentService } from 'universal-cookie-consent';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    consents$: Observable<string[]>;

    constructor(private cookieConsentService: UniversalCookieConsentService) {
        this.consents$ = this.cookieConsentService.getGrantedConsents();
    }

    ngOnInit() {

    }

    onButtonClick() {
        this.cookieConsentService.show(true);
    }

}
