import { TestBed, ComponentFixture } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { CustomCursorComponent } from '../custom-cursor/cursor.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

class CustomCursorStub {
  setIsHovered(isHovered: boolean) { }
}

describe("CustomCursorComponent", () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let customCursorComponent: CustomCursorComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      providers: [
        { provide: CustomCursorComponent, useClass: CustomCursorStub }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    customCursorComponent = TestBed.inject(CustomCursorComponent);
    spyOn(customCursorComponent, 'setIsHovered');
    fixture.detectChanges();
  });

  it('should call setIsHovered with true when onMouseEnter is called', () => {
    component.onMouseEnter();
    expect(customCursorComponent.setIsHovered).toHaveBeenCalledWith(true);
  });

  it('should call setIsHovered with false when onMouseLeave is called', () => {
    component.onMouseLeave();
    expect(customCursorComponent.setIsHovered).toHaveBeenCalledWith(false);
  });
});
