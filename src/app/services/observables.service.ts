import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';

@Injectable()
export class GenericAppObservable{
  private _GenericAppObservable$ = new BehaviorSubject<any>(0);
  GenericAppObservable$ = this._GenericAppObservable$.asObservable();

  send(data:any){
    this._GenericAppObservable$.next(data);
  }
}

@Injectable()
export class ThemeChangeObservable{
  private _ThemeChangeObservable$ = new BehaviorSubject<any>(0);
  ThemeChangeObservable$ = this._ThemeChangeObservable$.asObservable();

  changeTheme(theme:string){
    this._ThemeChangeObservable$.next(theme);
  }
}

@Injectable()
export class SendGridCommandObservable{
  private _SendGridCommandObservable$ = new BehaviorSubject<any>(0);
  SendGridCommandObservable$ = this._SendGridCommandObservable$.asObservable();

  send(data:any){
    this._SendGridCommandObservable$.next(data);
  }
}