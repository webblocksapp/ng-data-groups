import {
  Component,
  OnInit,
  ContentChildren,
  QueryList,
  Input,
  Output,
  EventEmitter,
  AfterContentInit,
  HostBinding,
  OnDestroy,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { DataGroupComponent } from './components/data-group.component';
import { BaseModel } from '../common/classes/base-model';
import { ValidationResult } from './types';
import { isEmpty } from 'lodash';
import { BaseModelArray } from '../common/classes/base-model-array';
import { Subscription } from 'rxjs';
import { DataInputBase } from '../common/classes/data-input-base';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'data-groups',
  template: `
    <form #form (ngSubmit)="submitData()">
      <ng-content></ng-content>
    </form>
  `,
  styles: [
    `
      form {
        position: relative;
      }

      .d-table-row-group {
        display: table-row-group;
      }
    `,
  ],
})
export class DataGroupsComponent
  implements OnInit, AfterContentInit, OnDestroy
{
  @HostBinding('class')
  @Input()
  class = 'd-block';

  @Input() model: any;
  @Input() groups: string[];
  @Input() enctype: string;
  @Input() multiple: boolean = false;
  @Input() highlightOnValid: boolean = false;
  @Input() autocomplete: boolean = false;

  @Output() submitEvent: EventEmitter<Promise<ValidationResult>> =
    new EventEmitter();

  @ContentChildren(DataGroupComponent, { descendants: true })
  dataGroupComponents: QueryList<DataGroupComponent>;

  @ViewChild('form', { read: NgForm }) form: NgForm;

  private _model: Array<BaseModel>;
  private changes$: Subscription;
  private dataInputComponents: Array<DataInputBase>;

  ngOnInit(): void {
    this.initBaseModel();
    this.subscribeToModelChanges();
  }

  ngAfterContentInit(): void {
    setTimeout(() => {
      this.inputModels();
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      if (this._model !== undefined) {
        if (propName === 'highlightOnValid') {
          this.inputModels();
        }
      }
    }
  }

  private initBaseModel(): void {
    if (this.model instanceof BaseModelArray) {
      this._model = this.model.get();
    }

    if (this.model instanceof BaseModel) {
      this._model = [this.model];
    }
  }

  private subscribeToModelChanges(): void {
    const subject = this.model.getChange();
    this.changes$ = subject.subscribe(() => {
      setTimeout(() => {
        this.initBaseModel();
        this.inputModels();
      });
    });
  }

  private unsubscribeToModelChanges(): void {
    this.changes$.unsubscribe();
  }

  private inputModels(): void {
    this._model.forEach((model, index) => {
      const dataGroupComponent = this.dataGroupComponents.toArray()[index];
      dataGroupComponent.loadDataInputComponents();
      this.dataInputComponents = dataGroupComponent.getDataInputComponents();

      this.dataInputComponents.forEach((dataInputComponent) => {
        dataInputComponent.form = this.form;
        dataInputComponent.model = model;
        dataInputComponent.highlightOnValid = this.highlightOnValid;
        dataInputComponent.refresh();
      });
    });
  }

  public submitData(): void {
    const groups = this.groups !== undefined ? { groups: this.groups } : {};
    this.submitEvent.emit(
      new Promise((resolve) => {
        this.model
          .validate(groups)
          .then((validationResult: ValidationResult) => {
            const { isValid, validatedData } = validationResult;

            if (isValid) {
              if (this.enctype === 'multipart/form-data') {
                if (!Array.isArray(validationResult)) {
                  validationResult.validatedData =
                    this.generateFormData(validatedData);
                } else {
                  validationResult.validatedData.map((item) =>
                    this.generateFormData(item),
                  );
                }
              }

              resolve(validationResult);
            } else {
              resolve(validationResult);
            }
          });
      }),
    );
  }

  private generateFormData(validatedData): any {
    const formData = new FormData();

    if (!isEmpty(validatedData)) {
      const keys = Object.keys(validatedData);

      keys.forEach((key) => {
        formData.append(key, validatedData[key]);
      });
    }

    return formData;
  }

  private unsubscribeAll() {
    this.unsubscribeToModelChanges();
  }

  ngOnDestroy(): void {
    this.unsubscribeAll();
  }
}
