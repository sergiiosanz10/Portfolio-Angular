import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CustomCursorComponent } from "./cursor.component";

describe("CustomCursorComponent", () => {
  let component: CustomCursorComponent;
  let fixture: ComponentFixture<CustomCursorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [CustomCursorComponent],
      providers: [],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomCursorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('Should create ', () => {
    expect(component).toBeTruthy();
  });

})
