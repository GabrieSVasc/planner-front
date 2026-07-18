import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LembreteCreate } from './lembrete-create';

describe('LembreteCreate', () => {
  let component: LembreteCreate;
  let fixture: ComponentFixture<LembreteCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LembreteCreate],
    }).compileComponents();

    fixture = TestBed.createComponent(LembreteCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
