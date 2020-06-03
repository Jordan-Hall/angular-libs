import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DatagridModule } from '@angular-libs/datagrid';
import { ResizeModule } from '@angular-libs/resize';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { NxModule } from '@nrwl/angular';
import { HttpClientModule } from '@angular/common/http';
import * as fromApiData from './+state/api-data.reducer';
import { ApiDataEffects } from './+state/api-data.effects';
import { ApiDataFacade } from './+state/api-data.facade';
import { CommonModule } from '@angular/common';
import { DatagridEffects } from './shared/+state/datagrid/datagrid.effects';
import * as fromDatagrid from './shared/+state/datagrid/datagrid.reducer';
import { DatagridFacade } from './shared/+state/datagrid/datagrid.facade';
import { DragDropModule } from "@angular/cdk/drag-drop";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    DatagridModule,
    CommonModule,
    ResizeModule,
    HttpClientModule,
    DragDropModule,
    NxModule.forRoot(),
    StoreModule.forRoot(
      {},
      {
        metaReducers: !environment.production ? [] : [],
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateImmutability: true,
        },
      }
    ),
    EffectsModule.forRoot([ApiDataEffects, DatagridEffects]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreModule.forFeature(
      fromApiData.APIDATA_FEATURE_KEY,
      fromApiData.reducer
    ),
    StoreModule.forFeature(
      fromDatagrid.DATAGRID_FEATURE_KEY,
      fromDatagrid.reducer
    ),
  ],
  providers: [ApiDataFacade, DatagridFacade],
  bootstrap: [AppComponent],
})
export class AppModule {}
