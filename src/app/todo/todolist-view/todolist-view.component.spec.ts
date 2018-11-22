import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodolistViewComponent } from './todolist-view.component';

describe('TodolistViewComponent', () => {
  let component: TodolistViewComponent;
  let fixture: ComponentFixture<TodolistViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodolistViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodolistViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
