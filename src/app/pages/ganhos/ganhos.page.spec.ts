import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GanhosPage } from './ganhos.page';

describe('GanhosPage', () => {
  let component: GanhosPage;
  let fixture: ComponentFixture<GanhosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GanhosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GanhosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
