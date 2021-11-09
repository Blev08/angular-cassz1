import { Component, ViewChild, OnInit, HostBinding, OnDestroy } from "@angular/core";
import { OverlayContainer } from "@angular/cdk/overlay";
import { GenericAppObservable, ThemeChangeObservable } from "./services/observables.service";
import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";
import { Title } from "@angular/platform-browser";
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit, OnDestroy{
  public theme: string = "dark-theme";
  public title = "Angular Project";
  @HostBinding("class") componentCssClass;
  private ngUnsubscribe = new Subject();

  constructor(
    public overlayContainer: OverlayContainer,
    public _GenericAppObservable: GenericAppObservable,
    public _ThemeChangeObservable: ThemeChangeObservable,
    public titleService: Title,
    private matIconRegistry: MatIconRegistry, 
    private domSanitizer: DomSanitizer
  ) {
     matIconRegistry.addSvgIcon(
      'angular',
      domSanitizer.bypassSecurityTrustResourceUrl('https://0t2.github.io/angular-material-notes/svg/angular.svg'))
      .addSvgIconInNamespace(
      'custom-svg',
      'angular',
      domSanitizer.bypassSecurityTrustResourceUrl('https://0t2.github.io/angular-material-notes/svg/angular_solidBlack.svg'))
      .addSvgIconSetInNamespace('core',
      domSanitizer.bypassSecurityTrustResourceUrl('https://0t2.github.io/angular-material-notes/svg/core-icon-set.svg'))
      .registerFontClassAlias('fontawesome', 'fa');
   }

  ngOnInit(){
    this.onThemeChange();
    this.titleService.setTitle(this.title);
    this._GenericAppObservable.GenericAppObservable$.pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      data => {

      });

     this._ThemeChangeObservable.ThemeChangeObservable$.pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      theme => {
        if(theme !== 0){
          this.theme = theme;
          this.onThemeChange();
        }
      });
  }

  ngOnDestroy(){
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onThemeChange(){
    this.overlayContainer.getContainerElement().classList.remove("light-theme");
    this.overlayContainer.getContainerElement().classList.remove("dark-theme");
    this.overlayContainer.getContainerElement().classList.add(this.theme);
  }
}
