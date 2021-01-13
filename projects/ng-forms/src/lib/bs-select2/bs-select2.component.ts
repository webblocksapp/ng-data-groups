import {
  Component,
  HostBinding,
  AfterViewInit,
  ViewChild,
  ElementRef,
  Input,
  Output,
  ViewEncapsulation,
  EventEmitter,
  DoCheck,
} from '@angular/core';
import { DataInputBase } from '../common/classes/data-input-base';
import { SelectOption, SelectOptionGroup } from '../common/types';
import { isNull } from '../common/utils';

@Component({
  selector: 'bs-select2',
  template: `
    <label class="form-label" *ngIf="label" attr.for="{{ id }}-bs">{{
      label
    }}</label>
    <div
      class="input-group {{ inputSize }}"
      [ngClass]="{
        'is-invalid': error,
        'is-valid': touched && highlightOnValid && !error
      }"
    >
      <div *ngIf="startSlot" class="input-group-prepend">
        <span class="input-group-text">{{ startSlot }}</span>
      </div>
      <div *ngIf="startSlotHtml" class="input-group-prepend">
        <span class="input-group-text" [innerHTML]="startSlotHtml"></span>
      </div>

      <select
        #select2ElementRef
        style="width: 100%"
        [attr.name]="name"
        [value]="value"
        class="form-control select2"
        [ngClass]="{
          'is-invalid': error,
          'is-valid': touched && highlightOnValid && !error
        }"
        id="{{ id }}-bs"
      >
        <option *ngIf="placeholder && !multiple"></option>
        <ng-container *ngFor="let option of options">
          <option
            *ngIf="option.group === undefined"
            [attr.disabled]="option.disabled"
            [attr.selected]="option.selected"
            [value]="option.value"
          >
            {{ option.viewValue }}
          </option>

          <optgroup *ngIf="option.group !== undefined" [label]="option.group">
            <option
              *ngFor="let option of option.groupValues"
              [attr.disabled]="option.disabled"
              [attr.selected]="option.selected"
              [value]="option.value"
            >
              {{ option.viewValue }}
            </option>
          </optgroup>
        </ng-container>
      </select>

      <div *ngIf="endSlot" class="input-group-append">
        <span class="input-group-text">{{ endSlot }}</span>
      </div>
      <div *ngIf="endSlotHtml" class="input-group-append">
        <span class="input-group-text">{{ endSlotHtml }}</span>
      </div>
    </div>
    <small *ngIf="help" class="form-text text-muted">
      {{ help }}
    </small>
    <div *ngIf="error" class="invalid-feedback">{{ error }}</div>
  `,
  styleUrls: ['./bs-select2.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class BsSelect2Component
  extends DataInputBase
  implements AfterViewInit, DoCheck {
  @HostBinding('class') class = 'ng-select2 form-group';
  @ViewChild('select2ElementRef', { read: ElementRef })
  select2ElementRef: ElementRef;

  @Input() theme: string;
  @Input() options: Array<SelectOption> | Array<SelectOptionGroup>;
  @Input() configs: { [key: string]: any } = {};
  @Input() noResults: string;
  @Input() allowClear: boolean = true;
  @Input() closeOnSelect: boolean = true;
  @Input() data: Array<any>;
  @Input() debug: boolean = false;
  @Input() dir: string = 'ltr';
  @Input() dropdownAutoWidth: boolean = false;
  @Input() dropdownCssClass: string;
  @Input() language: string = 'en';
  @Input() maximumInputLength: number = 0;
  @Input() maximumSelectionLength: number = 0;
  @Input() minimumInputLength: number = 0;
  @Input() minimumResultsForSearch: number = 0;
  @Input() multiple: boolean = false;
  @Input() placeholder: string;
  @Input() selectionCssClass: string;
  @Input() selectOnClose: boolean = false;
  @Input() tags: boolean = false;
  @Input() width: string = 'resolve';
  @Input() scrollAfterSelect: boolean = false;

  @Output() selectEvent: EventEmitter<any> = new EventEmitter();
  @Output() clearEvent: EventEmitter<any> = new EventEmitter();
  @Output() closeEvent: EventEmitter<any> = new EventEmitter();

  private select2: any;
  private validate = false;
  private select2Configs: any = {};
  private watchedProperties = [
    'theme',
    'options',
    'configs',
    'configs',
    'noResults',
    'allowClear',
    'closeOnSelect',
    'data',
    'debug',
    'dir',
    'dropdownAutoWidth',
    'dropdownCssClass',
    'language',
    'maximumInputLength',
    'maximumSelectionLength',
    'minimumInputLength',
    'minimumResultsForSearch',
    'multiple',
    'placeholder',
    'selectionCssClass',
    'selectOnClose',
    'tags',
    'width',
    'scrollAfterSelect',
  ];

  ngAfterViewInit(): void {
    this.initJQueryEl();
    this.initSelect2();
  }

  ngDoCheck(): void {
    this.watchModel();
  }

  bindWatchModelEvents(): void {
    this.initSelectedOptions();
  }

  detectPropertiesChanges(propName: string): void {
    if (propName === 'disabled') this.enableOrDisableSelect2();
    if (this.watchedProperties.indexOf(propName) > -1) this.refreshSelect2();
  }

  initJQueryEl(): void {
    this.select2 = $(this.select2ElementRef.nativeElement);
  }

  initSelect2(): void {
    this.buildSelect2Configs();
    this.select2.select2(this.select2Configs);
    this.bindEventsToSelect2();
    this.enableOrDisableSelect2();
    this.disableSelect2WhenOptionsAreEmpty();
  }

  bindEventsToSelect2(): void {
    this.select2.on('change', (event) => {
      const value = this.select2.select2('val');
      this.fillModel(value);

      if (this.validate === true) {
        this.validateField();
      } else {
        this.validate = true;
      }

      this.change(event);
    });

    this.select2.on('select2:select', (event) => {
      this.selectEvent.emit(event.params.data);
    });

    this.select2.on('select2:clear', (event) => {
      this.fillModel(null);
      this.validateField();
      this.clearEvent.emit(event.params.data);
    });

    this.select2.on('select2:close', (event) => {
      /**
       * Equivalent to a validate on focusout
       */
      setTimeout(() => {
        if (isNull(this.model.getValue(this.name))) {
          this.validateField();
          this.closeEvent.emit(event.params.data);
        }
      });
    });
  }

  bindEventsAfterValidateField(): void {
    this.addOrRemoveValidationClasses();
  }

  buildSelect2Configs(): void {
    const defaultConfigs = {
      theme: this.theme,
      allowClear: this.allowClear,
      closeOnSelect: this.closeOnSelect,
      data: this.data,
      debug: this.debug,
      dir: this.dir,
      dropdownAutoWidth: this.dropdownAutoWidth,
      dropdownCssClass: this.dropdownCssClass,
      language: this.language,
      maximumInputLength: this.maximumInputLength,
      maximumSelectionLength: this.maximumSelectionLength,
      minimumInputLength: this.minimumInputLength,
      minimumResultsForSearch: this.minimumResultsForSearch,
      multiple: this.multiple,
      placeholder: this.placeholder,
      selectionCssClass: this.selectionCssClass,
      selectOnClose: this.selectOnClose,
      tags: this.tags,
      width: this.width,
      scrollAfterSelect: this.scrollAfterSelect,
    };

    this.select2Configs = Object.assign(defaultConfigs, this.configs);
    this.setSelect2ConfigsOverrides();
  }

  setSelect2ConfigsOverrides(): void {
    /**
     * Overrides
     *
     * - allowClear is not used in multiple select
     */
    if (this.multiple) {
      this.select2Configs = Object.assign(this.select2Configs, {
        allowClear: false,
      });
    }

    this.select2Configs = Object.assign(this.select2Configs, this.configs);
  }

  addOrRemoveValidationClasses(): void {
    setTimeout(() => {
      /**
       * For a custom bootstrap theme, make the border-color property important inside this
       * style line of css classes on your bootstrap custom main theme stylesheet,
       * to show the invalid border color on select2 component
       *
       * .was-validated .custom-select:invalid, .custom-select.is-invalid {
       *   border-color: #your-color !important;
       * }
       */

      const select2Selection = $(this.select2.data('select2').$container).find(
        '.select2-selection',
      );

      if (this.error) {
        select2Selection.addClass('custom-select');
        select2Selection.addClass('is-invalid');
      } else {
        select2Selection.removeClass('custom-select');
        select2Selection.removeClass('is-invalid');

        if (this.highlightOnValid && this.touched) {
          select2Selection.addClass('form-control');
          select2Selection.addClass('is-valid');
        }

        if (!this.highlightOnValid || !this.touched) {
          select2Selection.removeClass('form-control');
          select2Selection.removeClass('is-valid');
        }
      }
    });
  }

  initSelectedOptions(): void {
    const selectedOptions = this.model.getValue(this.name);
    this.validate = false;
    this.select2.val(selectedOptions).trigger('change');
  }

  disableSelect2WhenOptionsAreEmpty(): void {
    if (this.select2 !== undefined && isNull(this.options)) {
      this.select2.select2('enable', false);
    }
  }

  enableOrDisableSelect2(): void {
    setTimeout(() => {
      if (this.select2 !== undefined) {
        if (this.disabled === undefined) this.disabled = false;
        this.select2.select2('enable', [!this.disabled]);
      }
    });
  }

  refreshSelect2(): void {
    if (this.select2 !== undefined) {
      setTimeout(() => {
        this.disableSelect2WhenOptionsAreEmpty();
        this.addOrRemoveValidationClasses();
        this.buildSelect2Configs();
        this.select2.select2(this.select2Configs);
      });
    }
  }

  refresh(): void {
    this.addOrRemoveValidationClasses();
    this.initSelectedOptions();
  }
}
