import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { IgxHierarchicalGridModule, IgxGridModule } from 'igniteui-angular';
import 'hammerjs';
import { GenericProjectComponent } from './components/generic-project/generic-project.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { RestfulService } from './services/restful.service';
import { AppConfigService } from './services/app-config.service';
import {
  GenericAppObservable,
  ThemeChangeObservable,
  SendGridCommandObservable,
} from './services/observables.service';
import {
  MatToolbarModule,
  MatIconModule,
  MatMenuModule,
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatSnackBarModule,
} from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { GenericDataService } from './services/generic-data.service';
import { GenericFormComponent } from './components/generic-form/generic-form.component';
import { GenericModalComponent } from './components/modals/generic-modal.component';
import { MatDialogModule } from '@angular/material/dialog';

export function initConfig(config: AppConfigService) {
  return () => config.load();
}

@NgModule({
  declarations: [
    AppComponent,
    GenericProjectComponent,
    ToolbarComponent,
    GenericFormComponent,
    GenericModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    IgxHierarchicalGridModule,
    IgxGridModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,

    //Angular Material
    MatSnackBarModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDialogModule
  ],
  bootstrap: [AppComponent],
  providers: [
    RestfulService,
    AppConfigService,
    GenericAppObservable,
    GenericDataService,
    {
      provide: APP_INITIALIZER,
      useFactory: initConfig,
      deps: [AppConfigService],
      multi: true,
    },
    ThemeChangeObservable,
    SendGridCommandObservable,
  ],
  entryComponents: [
    GenericModalComponent
  ]
})
export class AppModule {}
