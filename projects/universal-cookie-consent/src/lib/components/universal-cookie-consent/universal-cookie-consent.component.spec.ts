import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UniversalCookieConsentComponent } from './universal-cookie-consent.component';

describe('UniversalCookieConsentComponent', () => {
    let component: UniversalCookieConsentComponent;
    let fixture: ComponentFixture<UniversalCookieConsentComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
                   declarations: [UniversalCookieConsentComponent]
               })
               .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UniversalCookieConsentComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
