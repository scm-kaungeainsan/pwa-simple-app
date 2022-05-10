import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {calculator} from '../../const/receipt-data'

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {
  @Output() emitInput: EventEmitter<any> = new EventEmitter();
  calculatorRow = calculator;

  constructor() { }

  ngOnInit(): void {
  }

  addingInput(value: any) {
  this.emitInput.emit(value);
  }

}
