import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableLayoutDialogComponent } from './table-layout-dialog.component';

describe('TableLayoutDialogComponent', () => {
  let component: TableLayoutDialogComponent;
  let fixture: ComponentFixture<TableLayoutDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableLayoutDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableLayoutDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
