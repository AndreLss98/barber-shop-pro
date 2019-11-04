import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagamentosComponent } from './pagamentos.component';

describe('PagamentosComponent', () => {
  let component: PagamentosComponent;
  let fixture: ComponentFixture<PagamentosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagamentosComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagamentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
