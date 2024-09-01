import type { ElementRef, OnInit } from '@angular/core';
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'kolol-use-multi',
  styleUrls: [ './use-multi.component.scss' ],
  templateUrl: './use-multi.component.html',
})
export class UseMultiComponent implements OnInit {

  private _submitText = 'Use';

  @ViewChild('multiInput', { static: true })
  public input!: ElementRef<HTMLInputElement>;

  public ngOnInit(): void {
    this.input.nativeElement.focus();
  }

  @Output()
  public use = new EventEmitter<number>();

  @Input()
  public set submitText(text: string) {
    this._submitText = text.charAt(0).toUpperCase() + text.slice(1);
  }

  public get submitText(): string {
    return this._submitText;
  }

  @Input()
  public maxValue = 1;

  public value = '';
}
