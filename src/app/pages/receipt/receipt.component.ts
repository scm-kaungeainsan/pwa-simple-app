import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import {calculateTable, categoryList} from '../../const/receipt-data';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.scss'],
  providers: [DatePipe]
})
export class ReceiptComponent implements OnInit {
  customerTable = [2, 3, 4, 5];
  tableToolTip = '';
  paxValue = 5;
  categoryID = 0;
  calculateTable = calculateTable;
  categoryList = categoryList;
  productList: any;
  condimentList: any;
  myDate = new Date();
  constructor(private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.productList = this.categoryList[0].product;
    this.condimentList = this.categoryList[0]?.condiment;
    this.tableToolTip += this.customerTable.map(element => (element));
    // this.myDate = new Date();
    // this.myDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  }

  chooseCategory(id:any) {
    console.log(id)
    this.categoryList.map(element => {
      if(element.id == id) {
        this.productList = element.product;
        this.productList['categoryID'] = id;
        this.condimentList = element?.condiment;
      }
    });
  }


  chooseProduct(id:any) {
    console.log(id)
    this.productList.map((element: { id: any; condiment: any; }) => {
      // console.log(element)
      // if(element.id == id) {
      //   this.condimentList = element?.condiment;
      // }
    });
  }

}
