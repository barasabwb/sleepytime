import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appTypewriter]'
})
export class TypewriterDirective implements OnInit {
  @Input('appTypewriter') phrases: string[] = [];
  speed = 100;
  eraseSpeed = 50;
  delayBetweenPhrases = 2000;

  private el: HTMLElement;
  private phraseIndex = 0;
  private charIndex = 0;
  private isDeleting = false;

  constructor(private elementRef: ElementRef) {
    this.el = this.elementRef.nativeElement;
  }

  ngOnInit() {
    this.type();
  }

  type() {
    const current = this.phrases[this.phraseIndex];
    const displayText = this.isDeleting
      ? current.substring(0, this.charIndex--)
      : current.substring(0, this.charIndex++);

    this.el.innerText = displayText;

    let delay = this.isDeleting ? this.eraseSpeed : this.speed;

    if (!this.isDeleting && this.charIndex === current.length) {
      delay = this.delayBetweenPhrases;
      this.isDeleting = true;
    } else if (this.isDeleting && this.charIndex === 0) {
      this.isDeleting = false;
      this.phraseIndex = (this.phraseIndex + 1) % this.phrases.length;
      delay = 500;
    }

    setTimeout(() => this.type(), delay);
  }
}
