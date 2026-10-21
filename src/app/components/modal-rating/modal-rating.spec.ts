import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRatingComponent } from './modal-rating';

describe('ModalRating', () => {
  let component: ModalRatingComponent;
  let fixture: ComponentFixture<ModalRatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalRatingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalRatingComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
