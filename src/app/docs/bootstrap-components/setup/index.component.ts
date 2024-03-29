import { Component, Input } from '@angular/core';
import { DocsBase } from '@shared/classes';

@Component({
  selector: 'app-bs4-components-setup',
  template: `
    <app-docs-container [markers]="markers">
      <marker>Setup of Bootstrap 4.x Form Components</marker>

      <div class="pt-3">
        <ol>
          <li>
            Run the following npm command:
            <code>npm i @webblocksapp/ng-bs4-form-components</code>
          </li>

          <marker class="mt-3"><b>Dependencies</b></marker>
          <p>
            Once installed <b>Bootstrap 4.x Form Components</b> into your
            project, the following dependencies will be added automatically:
          </p>

          <ul class="mb-5">
            <li *ngFor="let package of Object.keys(dependencies)">
              <code>"{{ package }}": "{{ dependencies[package] }}"</code>
            </li>
          </ul>

          <li>
            Configure <code>jQuery</code> globally on
            <code>tsconfig.app.json</code> file:
          </li>

          <pre><code class="mt-3 mb-3" [highlight]='tsconfigAppCode'></code></pre>

          <li>
            Also configure <code>jQuery</code> globally on
            <code>tsconfig.json</code> file:
          </li>

          <pre><code class="mt-3 mb-3" [highlight]='tsconfigCode'></code></pre>

          <li>Register inside <code>angular.json</code>:</li>

          <pre><code class="mt-3 mb-3" [highlight]='angularJsonCode'></code></pre>

          <li>
            Register the <code>NgDataGroupsModule</code> and
            <code>NgBs4FormComponentsModule</code> on your
            <code>app.module.ts</code> as follows:
          </li>

          <pre><code class="mt-3 mb-3" [highlight]='module'></code></pre>
        </ol>

        <marker class="mt-4">About jQuery</marker>

        <p>
          Bootstrap 4.5 uses jQuery, however it's not necessary to invoke jQuery
          methods to work with them.
        </p>
        <p>
          Each component has been angularized wrapping jQuery inside it's
          methods.
        </p>
      </div>
    </app-docs-container>
  `,
})
export class IndexComponent extends DocsBase {
  public dependencies = {
    '@fortawesome/fontawesome-free': '^5.1.0-9',
    '@ttskch/select2-bootstrap4-theme': '^1.5.2',
    '@types/jquery': '^3.5.3',
    '@webblocksapp/ng-data-groups': '*',
    bootstrap: '^4.5.2',
    'bootstrap-datepicker': '^1.9.0',
    'bootstrap-select': '^1.13.18',
    jquery: '^3.5.1',
    moment: '^2.29.1',
    'popper.js': '^1.14.3',
    select2: '^4.0.13',
  };

  public tsconfigAppCode = `  ...
    "compilerOptions": {
      ...
      "outDir": "./out-tsc/app",
      "types": ["jquery"]
      ...
    },
  ...`;

  public tsconfigCode = `  ...
    "compilerOptions": {
      ...
      "types": ["node", "jquery"],
      ...
    },
  ...`;

  public angularJsonCode = `  ...
    "styles": [
      ...
      "node_modules/bootstrap/dist/css/bootstrap.min.css",
      "node_modules/@fortawesome/fontawesome-free/css/all.css",
      "node_modules/bootstrap-select/dist/css/bootstrap-select.min.css",
      "node_modules/bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css",
      "node_modules/select2/dist/css/select2.min.css",
      "node_modules/@ttskch/select2-bootstrap4-theme/dist/select2-bootstrap4.min.css"
      ...
    ],
    "scripts": [
      ...
      "node_modules/jquery/dist/jquery.min.js",
      "node_modules/popper.js/dist/umd/popper.js",
      "node_modules/bootstrap/dist/js/bootstrap.min.js",
      "node_modules/bootstrap-select/dist/js/bootstrap-select.min.js",
      "node_modules/bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js",
      "node_modules/select2/dist/js/select2.min.js"
      ...
    ]
  ...
  `;

  public module = `
    import { BrowserModule } from '@angular/platform-browser';
    import { NgModule } from '@angular/core';
    import { AppComponent } from './app.component';
    ...
    import { NgDataGroupsModule } from '@webblocksapp/ng-data-groups';
    import { NgBs4FormComponentsModule } from '@webblocksapp/ng-bs4-form-components';

    @NgModule({
      declarations: [AppComponent],
      imports: [
        ...
        NgDataGroupsModule,
        NgBs4FormComponentsModule
        ...
      ],
      bootstrap: [AppComponent],
    })
    export class AppModule {}
  `;
}
