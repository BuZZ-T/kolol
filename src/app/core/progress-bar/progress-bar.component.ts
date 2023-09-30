import { Component, ElementRef, HostBinding, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'kolol-progress-bar',
  styleUrls: [ './progress-bar.component.scss' ],
  templateUrl: './progress-bar.component.html',
})
export class ProgressBarComponent {

  @ViewChild('fill', { static: true })
  public fill!: ElementRef<HTMLSpanElement>;

  @HostBinding('attr.title')
  public title = '';

  @Input({ required: true })
  public set current(value: number | undefined) {
    setTimeout(() => {
      const current = value || 0;
      const max = this.max || 0;
      
      this.fill.nativeElement.style.width = `${current / max * 100}%`;
      this.title = `${current} / ${max}`;
    });
  }

  @Input({ required: true })
  public max: number | undefined;
}
