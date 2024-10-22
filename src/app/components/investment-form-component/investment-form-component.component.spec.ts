import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentFormComponentComponent } from './investment-form-component.component';

describe('InvestmentFormComponentComponent', () => {
  let component: InvestmentFormComponentComponent;
  let fixture: ComponentFixture<InvestmentFormComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvestmentFormComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvestmentFormComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
