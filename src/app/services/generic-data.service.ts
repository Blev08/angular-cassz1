import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { RestfulService } from './restful.service';
import { AppConfigService } from "./app-config.service";
import { AppConfigKeys } from "./app-config-keys";

@Injectable()
export class GenericDataService {

  constructor(
    private _RestfulService : RestfulService,
    private _AppConfigService: AppConfigService
  ) { }

  getSampleData(): Observable<any> {
    return this._RestfulService.getDataRequest(this._AppConfigService.get(AppConfigKeys.SAMPLE_DATA_PATH))
      .pipe(map((responseData) => {
        try{
          return responseData;
        }catch (error){
          console.error("JSON parse Error: " + JSON.stringify(error));
          return throwError(error);  
        }
      }),
      catchError((error)=>{
        console.error("Failure Response is : " + JSON.stringify(error));
        return throwError(error);
      }));
  }
}