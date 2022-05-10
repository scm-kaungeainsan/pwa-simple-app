import { Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { calculateTable, categoryList } from '../../const/receipt-data';
const ELEMENT_DATA = [
  { number: '2012120200010', customerName: 'Rose', date: '18/3/2022', totalPrice: 1200, payment: 'card', selected: true },
  { number: '201212020009', customerName: 'Ivy', date: '17/3/2022', totalPrice: 100, payment: 'cash' },
  { number: '201212020008', customerName: 'Calvin', date: '16/3/2022', totalPrice: 1600, payment: 'card' },
  { number: '201212020007', customerName: 'Henary', date: '15/3/2022', totalPrice: 123, payment: 'card' },
  { number: '201212020006', customerName: 'Key', date: '15/3/2022', totalPrice: 456, payment: 'card' },
  { number: '201212020005', customerName: 'Jame', date: '14/3/2022', totalPrice: 678, payment: 'card' },
  { number: '201212020004', customerName: 'Jhon', date: '13/3/2022', totalPrice: 89, payment: 'cash' },
  { number: '201212020003', customerName: 'Taylor Swift', date: '12/3/2022', totalPrice: 78, payment: 'card' },
  { number: '201212020002', customerName: 'Herry', date: '11/3/2022', totalPrice: 567, payment: 'card' },
  { number: '201212020001', customerName: 'Justin', date: '10/3/2022', totalPrice: 345, payment: 'card' },
];

@Component({
  selector: 'app-receipt-list',
  templateUrl: './receipt-list.component.html',
  styleUrls: ['./receipt-list.component.scss']
})
export class ReceiptListComponent implements OnInit {
  displayedColumns: string[] = ['number', 'customerName', 'date', 'totalPrice', 'payment'];
  dataSource: any = [];
  filterSource: any = [];
  selected = 0;
  sortedData: typeof ELEMENT_DATA | undefined;
  filterSearch: any;
  renderer: any;
  constructor() { }

  ngOnInit(): void {
    this.dataSource = this.filterSource = ELEMENT_DATA;
  }

  sortData(sort: Sort) {
    const data = this.dataSource.slice();
    if (!sort.active || sort.direction === '') {
      this.dataSource = data;
      return;
    }

    this.dataSource = data.sort((a: any, b: any) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'number':
          return compare(a.number, b.number, isAsc);
        case 'customerName':
          return compare(a.customerName, b.customerName, isAsc);
        case 'date':
          return compare(a.date, b.date, isAsc);
        case 'totalPrice':
          return compare(a.totalPrice, b.totalPrice, isAsc);
        case 'payment':
          return compare(a.payment, b.payment, isAsc);
        default:
          return 0;
      }
    });
  }

  applyFilter(event: any, status: any) {
    const filterValue = event.target.value
    let filterValueLower = filterValue.toLowerCase();
    if (filterValue === '') {
      this.dataSource = this.filterSource;
    }
    else {
      this.dataSource = this.filterSource.filter((employee: any) => {
        console.log('Enter')
        console.log(filterValueLower)
        console.log(employee.payment.toLowerCase().includes(filterValueLower))
        switch (status) {
          case 'number':
            return employee.number.toLowerCase().includes(filterValueLower);
          case 'customerName':
            return employee.customerName.toLowerCase().includes(filterValueLower);
          case 'date':
            return employee.date.toLowerCase().includes(filterValueLower);
          case 'totalPrice':
            return employee.totalPrice.toString().toLowerCase().includes(filterValueLower);
          case 'payment':
          return employee.payment.toLowerCase().includes(filterValueLower);
          default:
            this.dataSource = this.dataSource;
        }
      });
    }
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

