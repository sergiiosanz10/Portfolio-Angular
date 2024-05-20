import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { SkillsIconsComponent } from "./skills-icons.component";

describe("SkillsIconsComponent", () => {
  let component: SkillsIconsComponent;
  let fixture: ComponentFixture<SkillsIconsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [],
      declarations: [SkillsIconsComponent],
      providers: [],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillsIconsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });


  it('Should create', () => {
    expect(component).toBeTruthy();
  });

})
