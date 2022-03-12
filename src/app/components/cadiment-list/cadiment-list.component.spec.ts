import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadimentListComponent } from './cadiment-list.component';

describe('CadimentListComponent', () => {
  let component: CadimentListComponent;
  let fixture: ComponentFixture<CadimentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadimentListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadimentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
