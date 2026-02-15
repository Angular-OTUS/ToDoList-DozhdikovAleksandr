import {Directive, ElementRef, inject, input, Renderer2} from '@angular/core';


@Directive( {
  selector: '[appTooltip]',
  host: {
    '(mouseenter)': 'show()',
    '(mouseleave)': 'hide()',
    '(focus)': 'show()',
    '(blur)': 'hide()',
  },
})
export class TooltipDirective {
  private readonly el = inject(ElementRef);
  private readonly renderer = inject(Renderer2);
  private tooltipElement: HTMLElement | null = null;

  readonly appTooltip = input<string>('')
  show(): void {

    /**
     * В примере, который был на лекции есть эта проверка.
     * А для чего проверяем this.tooltipElement ?
     * Вроде в консоли всегда null.
     */
    console.log(this.tooltipElement);

    if (!this.appTooltip() || this.tooltipElement) return;

    this.tooltipElement = this.renderer.createElement('div');
    this.renderer.addClass(this.tooltipElement, 'app-tooltip');

    const textNode = this.renderer.createText(this.appTooltip());
    this.renderer.appendChild(this.tooltipElement, textNode);
    this.renderer.appendChild(document.body, this.tooltipElement);

    this.setPosition();
  }

  hide(): void {
    if (this.tooltipElement) {
      this.renderer.removeChild(document.body, this.tooltipElement);
      this.tooltipElement = null;
    }
  }

  private setPosition() {

    /**
     * В примере, который был на лекции есть эта проверка.
     * А для чего она ?
     */

    if (!this.tooltipElement) return;

    const hostPos = this.el.nativeElement.getBoundingClientRect();
    const tooltipPos = this.tooltipElement.getBoundingClientRect();

    const top = hostPos.top - tooltipPos.height - 10;
    const left = hostPos.left + (hostPos.width - tooltipPos.width) / 2;

    this.renderer.setStyle(this.tooltipElement, 'top', `${top + window.scrollY}px`);
    this.renderer.setStyle(this.tooltipElement, 'left', `${left + window.scrollX}px`);
  }
}
