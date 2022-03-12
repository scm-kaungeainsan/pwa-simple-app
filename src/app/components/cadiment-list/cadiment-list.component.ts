import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-cadiment-list',
  templateUrl: './cadiment-list.component.html',
  styleUrls: ['./cadiment-list.component.scss']
})
export class CadimentListComponent implements OnInit {
  @Input() condiment: any;
  constructor() { }

  ngOnInit(): void {
  }

}
