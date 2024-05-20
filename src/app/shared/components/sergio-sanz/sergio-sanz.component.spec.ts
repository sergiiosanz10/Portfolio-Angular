import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { SergioSanzComponent } from "./sergio-sanz.component";

describe("SergioSanzComponent", () => {
  let component: SergioSanzComponent;
  let fixture: ComponentFixture<SergioSanzComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [],
      declarations: [SergioSanzComponent],
      providers: [],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SergioSanzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


    it('Should create', () => {
      expect(component).toBeTruthy();
    });
})
