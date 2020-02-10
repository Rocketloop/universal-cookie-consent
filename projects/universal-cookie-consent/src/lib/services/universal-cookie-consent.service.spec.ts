import { TestBed } from '@angular/core/testing';

import { UniversalCookieConsentService } from './universal-cookie-consent.service';

describe('UniversalCookieConsentService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: UniversalCookieConsentService = TestBed.get(UniversalCookieConsentService);
        expect(service).toBeTruthy();
    });
});
