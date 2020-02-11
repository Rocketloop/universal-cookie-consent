import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UniversalCookieConsentContainerComponent } from './universal-cookie-consent-container.component';

describe('UniversalCookieConsentContainerComponent', () => {
    let component: UniversalCookieConsentContainerComponent;
    let fixture: ComponentFixture<UniversalCookieConsentContainerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
                   declarations: [UniversalCookieConsentContainerComponent]
               })
               .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UniversalCookieConsentContainerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
