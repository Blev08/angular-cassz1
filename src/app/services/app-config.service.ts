import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AppConfigKeys } from './app-config-keys';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService{
  
  private config: Object = null;
  private configFilename = environment.configJson;

  constructor(private _HttpClient: HttpClient) {}

  public load(){
    return new Promise((resolve, reject) => {
      this._HttpClient.get(this.configFilename).subscribe(configResp => {
        this.config = configResp;
        resolve(true);
      });
    })
  }

  public get(key: string){
    if(key){
      switch(key){
        case AppConfigKeys.APP_DISPLAY_NAME: {
          return this.config[key] != null ? this.config[key] : 'Generic Angular Project'
        }
        case AppConfigKeys.APP_VERSION: {
            return environment.appVersion;
        }
        default: {
          if(this.config[key] != null){
            return this.config[key];
          }
        }
      }
    }
  }

  public set(key:string, value: any){
    this.config[key] = name;
  }
}

