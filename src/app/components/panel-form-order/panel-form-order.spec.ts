import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelFormOrderComponent } from './panel-form-order';

describe('PanelFormOrder', () => {
  let component: PanelFormOrderComponent;
  let fixture: ComponentFixture<PanelFormOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelFormOrderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PanelFormOrderComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
