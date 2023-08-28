import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BecomeownerpopupComponent } from './becomeownerpopup.component';

describe('BecomeownerpopupComponent', () => {
  let component: BecomeownerpopupComponent;
  let fixture: ComponentFixture<BecomeownerpopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BecomeownerpopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BecomeownerpopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
