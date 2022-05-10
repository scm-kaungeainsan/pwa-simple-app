import { CdkDragEnd, CdkDragStart } from '@angular/cdk/drag-drop';
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { tableLayout } from '../../const/receipt-data';
import { TableLayoutDialogComponent } from '../../components/table-layout-dialog/table-layout-dialog.component'

@Component({
  selector: 'app-table-layout',
  templateUrl: './table-layout.component.html',
  styleUrls: ['./table-layout.component.scss']
})
export class TableLayoutComponent implements OnInit {
  dragPosition = { x: 0, y: 0 };
  tableName = 'table-1';
  tableLayout: any;
  name: any;
  animal: any;
  dragging: boolean = false;
  @ViewChild('hello', { static: false })
  divHello!: ElementRef;
  imageSrc: string | undefined;
  fileSource: any;
  constructor(private renderer: Renderer2, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.tableLayout = tableLayout;
  }

  public handleDragStart(event: CdkDragStart): void {
    this.dragging = true;
  }

  cdkDragMoved($event: CdkDragEnd) {
    // console.log($event.source.getFreeDragPosition());
  }

  resetAll() {
    this.tableLayout = [];
  }

  openDialog(table: any): void {
    if (this.dragging) {
      this.dragging = false;
      return
    }
    const dialogRef = this.dialog.open(TableLayoutDialogComponent, {
      width: '500px',
      data: { name: this.name, animal: this.animal, boxData: table, status: 'edit'},
    });

    dialogRef.afterClosed().subscribe(result => {
      table.show = !result.delete;
    });
  }

  addBox(table: any): void {
    if (this.dragging) {
      this.dragging = false;
      return
    }
    const dialogRef = this.dialog.open(TableLayoutDialogComponent, {
      width: '500px',
      data: { name: '', animal: '', boxData: '', status: 'add' },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      console.log(this.tableLayout)
      this.tableLayout.push(result.data);
      // this.tableLayout = {...this.tableLayout,...result.data};
      console.log(this.tableLayout)
    });
  }

  clickMe() {
    this.renderer.setStyle(this.divHello.nativeElement, 'background-image', 'url(../../../assets/images/cake.jpg\)');
  }

  public getBackgroundImg() {
    return "url(\"../../../assets/images/b.png\")";
  }

  onFileChange(event: any) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.onload = () => {
        this.imageSrc = reader.result as string;
        this.renderer.setStyle(this.divHello.nativeElement, 'background-image', "url(" + reader.result + ")");
      };
      reader.readAsDataURL(file);
    }
  }
}
