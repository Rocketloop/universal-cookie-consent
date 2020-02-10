import { Component, OnInit } from '@angular/core';
import { UniversalCookieConsentService } from 'universal-cookie-consent';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    constructor(private cookieConsentService: UniversalCookieConsentService) {

    }

    ngOnInit() {
        this.cookieConsentService.show();
    }

}
