import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-generic-form',
  templateUrl: './generic-form.component.html',
  styleUrls: ['./generic-form.component.css']
})
export class GenericFormComponent implements OnInit {

  constructor(
    private _FormBuilder: FormBuilder
  ) { }
  public data: any = [];
  public columns: any = [];
  public reactiveForm: FormGroup;

  ngOnInit() {
    //Grid Setup Columns
    this.columns =[
      {field: "name", header: "Name"},
      {field: "description", header: "Description"},
      {field: "idea", header: "Idea"},
      {field: "numberField", header: "Number Field"}
    ];

    this.data = [
      {
      "_id": "1",
      "name": "test1",
      "description": "test1",
      "idea": "test1",
      "numberField": 10
      },
      {
      "_id": "2",
      "name": "test2",
      "description": "test2",
      "idea": "test2",
      "numberField": 16
      }
    ]
    this.setupReactiveForm();
  }

  setupReactiveForm(){
    this.reactiveForm = this._FormBuilder.group({
      _id: [{value: "", disabled:true}],
      name:[{value: "", disabled:true}],
      description:[{value: "", disabled:true}],
      idea:[{value: "", disabled:true}],
      numberField:[{value: "", disabled:true}]
    });

    this.reactiveForm.controls.numberField.setValidators([this.divisibleByEight.bind(this)]);
  }

  divisibleByEight(control: AbstractControl){
    if(!control.value || control.value % 8 !== 0){
      return {error: true};
    }
    return null;
  }

  isDateTimeValid(value){
    return new Date(value).toJSON() === value;
  }
}