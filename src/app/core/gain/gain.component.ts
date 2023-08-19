import { Component, Input } from '@angular/core';
import { imageToAbsolute } from 'src/app/utils/image.utils';

@Component({
  selector: 'kolol-gain',
  styleUrls: [ './gain.component.scss' ],
  templateUrl: './gain.component.html',
})
export class GainComponent {

  public absoluteImage: string | undefined;
  
  @Input({ required: true })
  public name!: string;

  @Input()
  public pluralName = this.name;

  @Input({ required: true })
  public value!: number;

  @Input()
  public set image(img: string) {
    this.absoluteImage = imageToAbsolute(img);
  }

  @Input()
  public loseVerb = 'lose';

  @Input()
  public gainVerb = 'gain';

  public abs = Math.abs;
}
