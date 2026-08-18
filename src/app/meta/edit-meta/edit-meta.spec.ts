import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMeta } from './edit-meta';

describe('EditMeta', () => {
  let component: EditMeta;
  let fixture: ComponentFixture<EditMeta>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditMeta],
    }).compileComponents();

    fixture = TestBed.createComponent(EditMeta);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
