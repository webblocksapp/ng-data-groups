import { Component } from '@angular/core';
import { DocsBase } from '@shared/classes';

@Component({
  selector: 'app-overview',
  template: `
    <p>
      Data groups are the encapsulation of a data model. To work with NG Forms
      is mandatory to encapsulate an NG Form component into a datagroup because
      it binds the model data into each one.
    </p>

    <app-code-example title="Data groups Overview">
      <app-running-code>running code works!</app-running-code>
      <app-html>html works!</app-html>
      <app-css>css works!</app-css>
    </app-code-example>
  `,
})
export class OverviewComponent extends DocsBase {}