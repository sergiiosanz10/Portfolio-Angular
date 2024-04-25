import { Component, Renderer2, ElementRef, ViewChild, HostListener, OnDestroy } from '@angular/core';

@Component({
  selector: 'custom-cursor',
  template: `
    <div id="container">
      <div #cursor id="cursor"></div>
      <div #stalker id="stalker"></div>
      <ng-content></ng-content>
    </div>
  `,
  styleUrl: './cursor.component.scss',
})
export class CustomCursorComponent implements OnDestroy {
  @ViewChild('cursor') cursor?: ElementRef;
  @ViewChild('stalker') stalker?: ElementRef;
  isHovered = false;
  listenerFn?: () => void;

  constructor(private renderer: Renderer2) {}

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    const x = event.clientX;
    const y = event.clientY;
    if (this.cursor && this.stalker) {
      this.renderer.setStyle(this.cursor.nativeElement, 'transform', `translate(${x}px, ${y}px) ${this.isHovered ? 'scale(1.5)' : ''}`);
      this.renderer.setStyle(this.stalker.nativeElement, 'transform', `translate(${x}px, ${y}px)`);
    }
  }

  setIsHovered(value: boolean) {
    this.isHovered = value;
  }

  ngOnDestroy() {
    if (this.listenerFn) {
      this.listenerFn();
    }
  }
}
