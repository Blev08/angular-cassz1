import { Component, OnInit } from '@angular/core';
import { AppConfigService } from '../../services/app-config.service';
import { AppConfigKeys } from '../../services/app-config-keys.ts';
import { ThemeChangeObservable, SendGridCommandObservable } from "../../services/observables.service";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  constructor(
    private _AppConfigService: AppConfigService,
    private _ThemeChangeObservable: ThemeChangeObservable,
    private _SendGridCommandObservable: SendGridCommandObservable
  ) { }

  public appDisplayName = "";
  
  ngOnInit() {
    this.appDisplayName = this._AppConfigService.get(AppConfigKeys.APP_DISPLAY_NAME);
  }

  accountButtonClicked(){

  }

  switchTheme(theme){
    this._ThemeChangeObservable.changeTheme(theme);
  }

  sendGridOption(command){
      this._SendGridCommandObservable.send(command);
  }
}