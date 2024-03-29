import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { IndexComponent } from './index.component';
import { IndexRoutingModule } from './index-routing.module';
import { OverviewComponent } from './overview/overview.component';
import { ApiComponent } from './api/api.component';
import { DemoOverview1Module } from './overview/demo-overview-1/demo-overview-1.module';
import { DemoOverview2Module } from './overview/demo-overview-2/demo-overview-2.module';
import { DemoOverview3Module } from './overview/demo-overview-3/demo-overview-3.module';
import { DemoOverview4Module } from './overview/demo-overview-4/demo-overview-4.module';

@NgModule({
  declarations: [IndexComponent, OverviewComponent, ApiComponent],
  imports: [
    CommonModule,
    SharedModule,
    IndexRoutingModule,
    DemoOverview1Module,
    DemoOverview2Module,
    DemoOverview3Module,
    DemoOverview4Module,
  ],
})
export class IndexModule {}
