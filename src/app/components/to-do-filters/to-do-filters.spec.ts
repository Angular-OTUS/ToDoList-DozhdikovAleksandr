import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDoFilters } from './to-do-filters';

describe('ToDoFilters', () => {
  let component: ToDoFilters;
  let fixture: ComponentFixture<ToDoFilters>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToDoFilters]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToDoFilters);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
