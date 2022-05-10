import { CdkDragStart } from '@angular/cdk/drag-drop';
import { Component, Inject, OnInit } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-table-layout-dialog',
  templateUrl: './table-layout-dialog.component.html',
  styleUrls: ['./table-layout-dialog.component.scss']
})
export class TableLayoutDialogComponent implements OnInit {
  data: any;
  collect = {
    'name': '',
    'color': '',
    'type': '',
    'position': {
      'x': 0,
      'y': 0
    }
  };
  // name = '';
  // color= '';
  // type= '';
  colorList = ['green', 'red', 'yellow'];
  constructor(@Inject(MAT_DIALOG_DATA) dialogData: any,
  public dialogRef: MatDialogRef<TableLayoutDialogComponent>) { 
    this.data = dialogData.boxData;
  }

  ngOnInit(): void {
    this.collect.name = this.data.name;
    this.collect.color = this.data.color;
    this.collect.type = this.data.type;
  }

  onCancelClick(): void {
    this.dialogRef.close({
    });
  }

  delete(): void {
    this.dialogRef.close({
      delete : true
    });
  }

  saveBox() {
    this.dialogRef.close({
     data: this.collect
    });
  }
}
