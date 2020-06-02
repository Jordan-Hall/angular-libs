import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DatagridModule } from '@angular-libs/datagrid';
import { ResizeModule } from '@angular-libs/resize';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import * as fromDatagrid from './+state/datagrid.reducer';
import { DatagridEffects } from './+state/datagrid.effects';
import { DatagridFacade } from './+state/datagrid.facade';
import { NxModule } from '@nrwl/angular';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    DatagridModule,
    ResizeModule,
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
    EffectsModule.forRoot([]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
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
    EffectsModule.forRoot([DatagridEffects]),
    StoreModule.forFeature(
      fromDatagrid.DATAGRID_FEATURE_KEY,
      fromDatagrid.reducer
    ),
  ],
  providers: [DatagridFacade],
  bootstrap: [AppComponent],
})
export class AppModule {}
