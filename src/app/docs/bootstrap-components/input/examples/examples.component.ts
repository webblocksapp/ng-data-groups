import { Component } from '@angular/core';
import { DocsBase } from '@shared/classes';

@Component({
  selector: 'app-examples',
  template: `
    <h5 marker>Email input with icons</h5>
    <example-1></example-1>

    <h5 marker>Password input with character validations</h5>
    <example-2></example-2>

    <h5 marker>Inputs with different sizes</h5>
    <example-3></example-3>

    <h5 marker>Common events</h5>
    <example-4></example-4>
  `,
})
export class ExamplesComponent extends DocsBase {}
