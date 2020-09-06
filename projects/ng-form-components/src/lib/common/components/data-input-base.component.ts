import {
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnChanges,
  SimpleChanges,
  HostBinding,
} from '@angular/core';

import {
  DataInputBaseInterface,
  FormEventsInterface,
  KeyboardEventsInterface,
  MouseEventsInterface,
} from '../interfaces';
import * as uuid from 'uuid';
import { BaseModel } from '@webblocksapp/class-validator';
import { InputType, InputSize } from '../types';
import { capitalize } from '../utils/capitalize';

export class DataInputBaseComponent
  implements
    OnInit,
    OnChanges,
    DataInputBaseInterface,
    FormEventsInterface,
    KeyboardEventsInterface,
    MouseEventsInterface {
  @Input()
  @HostBinding('id')
  id: string;

  @Input() label: string;
  @Input() name: string;
  @Input() type: InputType = 'text';
  @Input() size: InputSize = 'default';
  @Input() placeholder: string;
  @Input() help: string;
  @Input() startSlot: string;
  @Input() startSlotHtml: string;
  @Input() endSlot: string;
  @Input() endSlotHtml: string;
  @Input() model: BaseModel;
  @Input() isReactiveForm = true;

  @Output() focusoutEvent: EventEmitter<any> = new EventEmitter();
  @Output() blurEvent: EventEmitter<any> = new EventEmitter();
  @Output() changeEvent: EventEmitter<any> = new EventEmitter();
  @Output() inputEvent: EventEmitter<any> = new EventEmitter();

  @Output() keydownEvent: EventEmitter<any> = new EventEmitter();
  @Output() keypressEvent: EventEmitter<any> = new EventEmitter();
  @Output() keyupEvent: EventEmitter<any> = new EventEmitter();

  @Output() clickEvent: EventEmitter<any> = new EventEmitter();
  @Output() dblclickEvent: EventEmitter<any> = new EventEmitter();
  @Output() mousedownEvent: EventEmitter<any> = new EventEmitter();
  @Output() mousemoveEvent: EventEmitter<any> = new EventEmitter();
  @Output() mouseoutEvent: EventEmitter<any> = new EventEmitter();
  @Output() mouseoverEvent: EventEmitter<any> = new EventEmitter();
  @Output() mouseupEvent: EventEmitter<any> = new EventEmitter();
  @Output() mousewheelEvent: EventEmitter<any> = new EventEmitter();
  @Output() wheelEvent: EventEmitter<any> = new EventEmitter();

  public inputSize: string;
  public error: string;
  public value: any;

  ngOnInit() {
    this.alwaysSetConfigsOnInit();
    this.setConfigsOnInit();
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      this.alwaysDetectPropertiesChanges(propName);
      this.detectPropertiesChanges(propName);
    }
  }

  // ----------------------------------------------------------------
  // ------- Component configs on init and changes detection  -------
  // ------------------ for computed attributes ---------------------
  // ----------------------------------------------------------------

  alwaysSetConfigsOnInit(): void {
    this.setComponentUniqueId();
  }

  setConfigsOnInit(): void {}

  alwaysDetectPropertiesChanges(propName: string): void {
    if (propName === 'size') this.getInputSize();
  }

  detectPropertiesChanges(propName: string): void {}

  setComponentUniqueId(): void {
    if (this.id === undefined) this.id = uuid.v4();
  }

  getInputSize(): void {
    switch (this.size) {
      case 'default':
        this.inputSize = '';
        break;
      case 'large':
        this.inputSize = 'input-group-lg';
        break;
      case 'small':
        this.inputSize = 'input-group-sm';
        break;
      default:
        this.inputSize = '';
        break;
    }
  }

  // --------------------------------------
  // ------- Component forms events -------
  // --------------------------------------

  focusout(event: any): void {
    event = this.bindFocusoutEvents(event);
    this.focusoutEvent.emit(event);
  }

  bindFocusoutEvents(event: any): any {
    return event;
  }

  blur(event: any): void {
    event = this.bindBlurEvents(event);
    this.blurEvent.emit(event);
  }

  bindBlurEvents(event: any): any {
    return event;
  }

  change(event: any): void {
    event = this.bindChangeEvents(event);
    this.changeEvent.emit(event);
  }

  bindChangeEvents(event: any): any {
    return event;
  }

  input(event: any): void {
    event = this.bindInputEvents(event);
    this.inputEvent.emit(event);
  }

  bindInputEvents(event: any): any {
    return event;
  }

  // --------------------------------------
  // ----- Component keyboard events ------
  // --------------------------------------

  keyup(event: any): void {
    event = this.bindKeyupEvents(event);
    this.keyupEvent.emit(event);
  }

  bindKeyupEvents(event: any): any {
    return event;
  }

  keydown(event: any): void {
    event = this.bindKeydownEvents(event);
    this.keydownEvent.emit(event);
  }

  bindKeydownEvents(event: any): any {
    return event;
  }

  keypress(event: any): void {
    event = this.bindKeypressEvents(event);
    this.keypressEvent.emit(event);
  }

  bindKeypressEvents(event: any): any {
    return event;
  }

  // --------------------------------------
  // ----- Component mouse events ------
  // --------------------------------------

  click(event: any): void {
    event = this.bindClickEvents(event);
    this.clickEvent.emit(event);
  }

  bindClickEvents(event: any): any {
    return event;
  }

  dblclick(event: any): void {
    event = this.bindDblclickEvents(event);
    this.dblclickEvent.emit(event);
  }

  bindDblclickEvents(event: any): any {
    return event;
  }

  mousedown(event: any): void {
    event = this.bindMousedownEvents(event);
    this.mousedownEvent.emit(event);
  }

  bindMousedownEvents(event: any): any {
    return event;
  }

  mousemove(event: any): void {
    event = this.bindMousemoveEvents(event);
    this.mousemoveEvent.emit(event);
  }

  bindMousemoveEvents(event: any): any {
    return event;
  }

  mouseout(event: any): void {
    event = this.bindMouseoutEvents(event);
    this.mouseoutEvent.emit(event);
  }

  bindMouseoutEvents(event: any): any {
    return event;
  }

  mouseover(event: any): void {
    event = this.bindMouseoverEvents(event);
    this.mouseoverEvent.emit(event);
  }

  bindMouseoverEvents(event: any): any {
    return event;
  }

  mouseup(event: any): void {
    event = this.bindMouseupEvents(event);
    this.mouseupEvent.emit(event);
  }

  bindMouseupEvents(event: any): any {
    return event;
  }

  mousewheel(event: any): void {
    event = this.bindMousewheelEvents(event);
    this.mousewheelEvent.emit(event);
  }

  bindMousewheelEvents(event: any): any {
    return event;
  }

  wheel(event: any): void {
    event = this.bindWheelEvents(event);
    this.wheelEvent.emit(event);
  }

  bindWheelEvents(event: any): any {
    return event;
  }

  // --------------------------------------
  // ----- Component data methods ---------
  // --------------------------------------

  fillModel(event: any): void {
    if (this.model !== undefined) {
      const value = event.target.value;

      if (!(this.model instanceof BaseModel)) {
        console.error(
          'Model is not instance of BaseModel from @webblocksapp/class-validator',
        );
        return;
      }

      if (this.name === undefined) {
        console.error('Your input component must contain a name attribute');
        return;
      }

      this.model.setValue(this.name, value);
      this.value = this.model.getValue(this.name);
    }
  }

  validateFieldOnFocusOut(): void {
    if (this.model !== undefined) {
      if (this.isReactiveForm === false) return;
      if (this.isReactiveForm === true) {
        if (this.name === undefined) {
          console.error('Input name attribute is not defined');
          return;
        }

        this.validateField();
      }
    }
  }

  validateField(): void {
    this.model
      .validateField(this.name)
      .then(() => {
        this.error = '';
      })
      .catch((error) => {
        this.setError(error);
      });
  }

  setError(error: any): void {
    const { constraints } = error[0];
    this.error = (Object.values(constraints)[0] as string) || '';
    this.error = capitalize(this.error);
  }
}