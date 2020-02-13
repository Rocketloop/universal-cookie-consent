# Universal Cookie Consent

A customizable and themeable Angular library and web component (WIP) for getting cookie consent from users.

* ✅ Make your Angular app or website GDPR compliant with ease 
* ♾ Use as either an Angular 9 library or a standard web component for universal usage
* ✏ Customize the available cookie types, including mandatory and optional cookie types
* 🖌 Themeable to integrate into every project easily 

## Installation

Universal Cookie Consent for Angular can be installed using npm:

```sh
npm install --save universal-cookie-consent
```

## Usage

Universal Cookie Consent provides a `UniversalCookieConsentModule` that can be easily imported into your project using
the `forRoot` method of the module. The default settings can set by passing them as a param to the `forRoot` method when
importing the `UniversalCookieConsentModule`:

```ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { UniversalCookieConsentModule }  from 'universal-cookie-consent';

@NgModule({
    imports: [
        BrowserModule,
        UniversalCookieConsentModule.forRoot({
            autoShow: true,
            consentTypes: [
                {
                    id: 'base',
                    title: 'Base Functionality',
                    description: 'These cookies are required for the functionality of this website and can\'t be disabled.',
                    mandatory: true
                },
                {
                    id: 'analytics',
                    title: 'Analytics',
                    description: 'We use these cookies to improve our website.',
                    color: 'orange'
                }
            ],
            disableBodyScroll: true
        })
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
```

## Use as Web Component

Support for Universal Cookie Consent is currently a work in progress and will be available in a future release.

## Credits

Universal Cookie Consent is sponsored by [@Rocketloop][1]. 

### Authors

* [Florian Reifschneider (@flore2003)][2]

## License
MIT

[1]: https://rocketloop.de/en
[2]: https://github.com/flore2003