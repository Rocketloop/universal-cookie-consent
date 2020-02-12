import { Component, ElementRef, forwardRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export const UI_SWITCH_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => UiSwitchComponent),
    multi: true,
};

@Component({
  selector: 'ui-switch',
  templateUrl: './ui-switch.component.html',
  styleUrls: ['./ui-switch.component.scss'],
    providers: [UI_SWITCH_VALUE_ACCESSOR]
})
export class UiSwitchComponent implements ControlValueAccessor {

    @ViewChild('checkbox', {read: ElementRef, static: true}) checkboxElementRef: ElementRef;

    /**
     * @description
     * The registered callback function called when a change event occurs on the input element.
     */
    onChange = (_: any) => {};

    /**
     * @description
     * The registered callback function called when a blur event occurs on the input element.
     */
    onTouched = () => {};

    constructor(private renderer: Renderer2) {}

    /**
     * Sets the "checked" property on the input element.
     *
     * @param value The checked value
     */
    writeValue(value: any): void {
        this.renderer.setProperty(this.checkboxElementRef.nativeElement, 'checked', value);
    }

    /**
     * @description
     * Registers a function called when the control value changes.
     *
     * @param fn The callback function
     */
    registerOnChange(fn: (_: any) => {}): void { this.onChange = fn; }

    /**
     * @description
     * Registers a function called when the control is touched.
     *
     * @param fn The callback function
     */
    registerOnTouched(fn: () => {}): void { this.onTouched = fn; }

    /**
     * Sets the "disabled" property on the input element.
     *
     * @param isDisabled The disabled value
     */
    setDisabledState(isDisabled: boolean): void {
        this.renderer.setProperty(this.checkboxElementRef.nativeElement, 'disabled', isDisabled);
    }
}
