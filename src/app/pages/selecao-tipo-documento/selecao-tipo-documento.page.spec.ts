import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelecaoTipoDocumentoPage } from './selecao-tipo-documento.page';

describe('SelecaoTipoDocumentoPage', () => {
  let component: SelecaoTipoDocumentoPage;
  let fixture: ComponentFixture<SelecaoTipoDocumentoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelecaoTipoDocumentoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelecaoTipoDocumentoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
