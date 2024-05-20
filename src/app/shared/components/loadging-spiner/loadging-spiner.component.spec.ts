import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { LoadgingSpinerComponent } from "./loadging-spiner.component";

describe("LoadgingSpinerComponent", () => {
  let component: LoadgingSpinerComponent;
  let fixture: ComponentFixture<LoadgingSpinerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [],
      declarations: [LoadgingSpinerComponent],
      providers: [],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadgingSpinerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

    it('Should create', () => {
      expect(component).toBeTruthy();
    });
})
