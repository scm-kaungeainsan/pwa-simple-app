import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  @Input() productList: any;
  myDate = new Date();
  @Output() emitProduct: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  chooseProduct(id: any) {
    this.emitProduct.emit(id);
  }
}
