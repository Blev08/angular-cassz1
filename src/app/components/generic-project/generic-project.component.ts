import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { IgxHierarchicalGridComponent } from "igniteui-angular";
import { AppConfigService } from "../../services/app-config.service";
import { AppConfigKeys } from "../../services/app-config-keys";
import { GenericDataService } from "../../services/generic-data.service";
import { MatSnackBar } from "@angular/material";
import { ThemeChangeObservable } from "../../services/observables.service";
import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";

@Component({
  selector: 'app-generic-project',
  templateUrl: './generic-project.component.html',
  styleUrls: ['./generic-project.component.scss']
})
export class GenericProjectComponent implements OnInit, OnDestroy {

  @ViewChild("gridView", { read: IgxHierarchicalGridComponent, static: true })
  public gridView: IgxHierarchicalGridComponent;
  public data = [];
  public objectsToBeUpdated = [];
  public theme: string = "dark-theme";
  private ngUnsubscribe = new Subject();

  constructor(
    private _AppConfigService: AppConfigService,
    private _GenericDataService: GenericDataService,
    private _MatSnackBar: MatSnackBar,
    private _ThemeChangeObservable: ThemeChangeObservable
  ) {}

  public objectStyles = {
    border: (rowData, columnKey, cellValue, rowIndex) => this.checkObjectRowStyling(rowData, columnKey)
  }

  public subobjectStyles = {
    border: (rowData, columnKey, cellValue, rowIndex) => this.checkSubobjectRowStyling(rowData, columnKey)
  }

  public stateStyles = {
    border: (rowData, columnKey, cellValue, rowIndex) => this.checkStateRowStyling(rowData, columnKey)
  }

  public changedObjectRows: Map<string, Set<string>> = new Map<string, Set<string>>();
  public changedSubobjectRows: Map<string, Set<string>> = new Map<string, Set<string>>();
  public changedStateRows: Map<string, Set<string>> = new Map<string, Set<string>>();

  ngOnInit() {
    this.data = [];
    this.gridView.isLoading = true;
    var self = this;
    this._GenericDataService.getSampleData().subscribe(
      resp => {
        this.data = resp;
        this.gridView.isLoading = false;
        /*this._MatSnackBar.open("Data Loaded Successfully!", null, {
          duration: 3000,
          verticalPosition: 'top',
          panelClass: ['green-snackbar']
        })*/
    }, err => {
      console.error("An Error Occurred Assigning Data to Grid.");
      this.gridView.isLoading = false;
       this._MatSnackBar.open("Error: Data Load Failed!", 'X', {
          verticalPosition: 'top',
          panelClass: ['red-snackbar']
        }).onAction().subscribe(()=> {
          this._MatSnackBar.dismiss();
        });
    });
    this.gridView.height = (window.innerHeight - 40).toString() + "px";

     this._ThemeChangeObservable.ThemeChangeObservable$.pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      theme => {
        if(theme !== 0){
          this.theme = theme;
          this.objectStyles = {...this.objectStyles};
          this.subobjectStyles = {...this.subobjectStyles};
          this.stateStyles = {...this.stateStyles};
        }
      });
  }

  ngOnDestroy(){
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  checkObjectRowStyling(rowData, columnKey){
    if(this.changedObjectRows.get(rowData._id) && this.changedObjectRows.get(rowData._id).has(columnKey)){
      if(this.theme === "dark-theme")
        return '2px dashed white';
      else
        return '2px dashed black';
    }
    return 'inherit';
  }

  checkSubobjectRowStyling(rowData, columnKey){
     if(this.changedSubobjectRows.get(rowData._id) && this.changedSubobjectRows.get(rowData._id).has(columnKey)){
       if(this.theme === "dark-mode")
        return '2px dashed white';
       else
        return '2px dashed black';
    }
    return 'inherit';
  }

  checkStateRowStyling(rowData, columnKey){
     if(this.changedStateRows.get(rowData._id) && this.changedStateRows.get(rowData._id).has(columnKey)){
      if(this.theme === "dark-mode")
        return '2px dashed white';
      else
        return '2px dashed black';
    }
    return 'inherit';
  }

  editDone(event, type) {
    if (event.newValue !== event.oldValue) {
      if (type === "object") {
        this.objectsToBeUpdated.push(event.rowID);
        if(this.changedObjectRows.has(event.rowID)){
          this.changedObjectRows.get(event.rowID).add(this.gridView.columns[event.cellID.columnID].field);
        }else{
          this.changedObjectRows.set(event.rowID, new Set([this.gridView.columns[event.cellID.columnID].field]));
        }
        this.objectStyles = {...this.objectStyles};
      } else {
        var row = event.owner.getRowByKey(event.rowID);
        this.objectsToBeUpdated.push(row._rowData.objectId);
        if (type === "subObject") {
          if(this.changedSubobjectRows.has(event.rowID)){
            this.changedSubobjectRows.get(event.rowID).add(event.owner.columns[event.cellID.columnID].field);
          }else{
            this.changedSubobjectRows.set(event.rowID, new Set([event.owner.columns[event.cellID.columnID].field]));
          }
          this.subobjectStyles = {...this.subobjectStyles};
        }else{
          if(this.changedStateRows.has(event.rowID)){
            this.changedStateRows.get(event.rowID).add(event.owner.columns[event.cellID.columnID].field);
          }else{
            this.changedStateRows.set(event.rowID, new Set([event.owner.columns[event.cellID.columnID].field]));
          }
          this.stateStyles = {...this.stateStyles};
        } 
      }
    }
  }

  clear(){
    this.changedObjectRows.clear();
    this.changedStateRows.clear();
    this.changedSubobjectRows.clear();

    this.objectStyles = {...this.objectStyles};
    this.subobjectStyles = {...this.subobjectStyles};
    this.stateStyles = {...this.stateStyles};
  }
}