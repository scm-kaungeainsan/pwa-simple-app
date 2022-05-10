import { Component, OnInit } from '@angular/core';
import {calculateTable, receiptDetail} from '../../const/receipt-data';
@Component({
  selector: 'app-receipt-detail',
  templateUrl: './receipt-detail.component.html',
  styleUrls: ['./receipt-detail.component.scss']
})
export class ReceiptDetailComponent implements OnInit {
  orderNumber = 774;
  calculateTable = calculateTable;
  receiptDetail = receiptDetail;
  constructor() { }

  ngOnInit(): void {
  }

}
