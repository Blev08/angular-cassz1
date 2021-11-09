import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-generic-modal',
  templateUrl: './generic-modal.component.html',
  styleUrls: ['./generic-modal.component.css']
})
export class GenericModalComponent implements OnInit {

  constructor( 
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
  public ok: boolean = false;
  public testData: any = {};

  ngOnInit() {
    this.testData = this.data.testDate;
  }
}