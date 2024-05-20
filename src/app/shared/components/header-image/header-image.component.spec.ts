import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HeaderImageComponent } from "./header-image.component";

describe("HeaderImageComponent", () => {
  let component: HeaderImageComponent;
  let fixture: ComponentFixture<HeaderImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [],
      declarations: [HeaderImageComponent],
      providers: [],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });


    it('Should create', () => {
      expect(component).toBeTruthy();
    });
})
