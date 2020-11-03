import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NameAndEmailModalComponent } from './name-and-email-modal.component';

describe('NameAndEmailModalComponent', () => {
  let component: NameAndEmailModalComponent;
  let fixture: ComponentFixture<NameAndEmailModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NameAndEmailModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NameAndEmailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
