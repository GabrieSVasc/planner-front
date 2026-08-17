import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormMeta } from './form-meta';

describe('FormMeta', () => {
  let component: FormMeta;
  let fixture: ComponentFixture<FormMeta>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormMeta],
    }).compileComponents();

    fixture = TestBed.createComponent(FormMeta);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
