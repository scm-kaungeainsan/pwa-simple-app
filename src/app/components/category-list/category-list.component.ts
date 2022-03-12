import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {
  @Input() categoryList: any;
  @Output() emitCategory: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  chooseCategory(id: any) {
    this.emitCategory.emit(id);
  }

}
