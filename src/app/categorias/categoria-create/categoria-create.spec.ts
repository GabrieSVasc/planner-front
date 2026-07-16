import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaCreate } from './categoria-create';

describe('CategoriaCreate', () => {
  let component: CategoriaCreate;
  let fixture: ComponentFixture<CategoriaCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriaCreate],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoriaCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
