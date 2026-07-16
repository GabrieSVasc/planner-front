import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMetas } from './list-metas';

describe('ListMetas', () => {
  let component: ListMetas;
  let fixture: ComponentFixture<ListMetas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListMetas],
    }).compileComponents();

    fixture = TestBed.createComponent(ListMetas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
