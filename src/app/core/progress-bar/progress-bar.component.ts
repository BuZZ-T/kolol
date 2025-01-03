import type { ElementRef } from '@angular/core';
import { Component, HostBinding, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'kolol-progress-bar',
  styleUrls: [ './progress-bar.component.scss' ],
  templateUrl: './progress-bar.component.html',
})
export class ProgressBarComponent {

  public _current: number | undefined;
  
  @ViewChild('fill', { static: true })
  public fill!: ElementRef<HTMLSpanElement>;

  @HostBinding('attr.title')
  public title = '';

  @Input({ required: true })
  public set current(value: number | undefined) {
    setTimeout(() => {
      this._current = value || 0;
      const max = this.max || 0;
      
      this.fill.nativeElement.style.width = `${this._current / max * 100}%`;
      this.title = `${this._current} / ${max}`;
    });
  }

  @Input({ required: true })
  public max: number | undefined;

  @Input()
  public showText = false;
}
