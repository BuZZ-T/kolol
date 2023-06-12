import { Injectable } from '@angular/core';

import { Effect, Item, Result } from '../action/results.types';

@Injectable({
  providedIn: 'root',
})
export class ResultsParserService {

  private testString = '<script type="text/javascript">top.charpane.location.href="charpane.php";</script><script type="text/javascript">if (window.updateInv) updateInv({"635":2,"1007":2,"1008":1})</script><script type="text/javascript">if (!window.updateInv && parent.mainpane.updateInv) parent.mainpane.updateInv({"635":2,"1007":2,"1008":1})</script><center><table  width=95%  cellspacing=0 cellpadding=0><tr><td style="color: white;" align=center bgcolor=blue><b>Results:</b></td></tr><tr><td style="padding: 5px; border: 1px solid blue;"><center><table><tr><td>You scrounge up some cocktail accessories.<center><table class="item" style="float: none" rel="id=635&s=35&q=0&d=1&g=0&t=1&n=1&m=0&p=0&u=q"><tr><td><img src="https://d2uyhvukfffg5a.cloudfront.net/itemimages/paperumb.gif" alt="little paper umbrella" title="little paper umbrella" class=hand onClick=\'descitem(635249410)\' ></td><td valign=center class=effect>You acquire an item: <b>little paper umbrella</b></td></tr></table></center><center><table class="item" style="float: none" rel="id=1007&s=35&q=0&d=1&g=0&t=1&n=1&m=0&p=0&u=q"><tr><td><img src="https://d2uyhvukfffg5a.cloudfront.net/itemimages/coconut.gif" alt="coconut shell" title="coconut shell" class=hand onClick=\'descitem(330145487)\' ></td><td valign=center class=effect>You acquire an item: <b>coconut shell</b></td></tr></table></center><center><table class="item" style="float: none" rel="id=1008&s=35&q=0&d=1&g=0&t=1&n=1&m=0&p=0&u=q"><tr><td><img src="https://d2uyhvukfffg5a.cloudfront.net/itemimages/ice.gif" alt="magical ice cubes" title="magical ice cubes" class=hand onClick=\'descitem(145169884)\' ></td><td valign=center class=effect>You acquire an item: <b>magical ice cubes</b></td></tr></table></center>After that first batch, you scrounge up a couple more for good measure.<center><table class="item" style="float: none" rel="id=1007&s=35&q=0&d=1&g=0&t=1&n=1&m=0&p=0&u=q"><tr><td><img src="https://d2uyhvukfffg5a.cloudfront.net/itemimages/coconut.gif" alt="coconut shell" title="coconut shell" class=hand onClick=\'descitem(330145487)\' ></td><td valign=center class=effect>You acquire an item: <b>coconut shell</b></td></tr></table></center><center><table class="item" style="float: none" rel="id=635&s=35&q=0&d=1&g=0&t=1&n=1&m=0&p=0&u=q"><tr><td><img src="https://d2uyhvukfffg5a.cloudfront.net/itemimages/paperumb.gif" alt="little paper umbrella" title="little paper umbrella" class=hand onClick=\descitem(635249410)\' ></td><td valign=center class=effect>You acquire an item: <b>little paper umbrella</b></td></tr></table></center></td></tr></table></center></td></tr><tr><td height=4></td></tr></table></center>';

  private domParser = new DOMParser();

  public constructor() { 
    //
  }

  public parseHtml(html: string): Result {
    const dom = this.domParser.parseFromString(html, 'text/html');

    const blocks = Array.from(dom.querySelectorAll('.effect'));

    const result: Result = blocks.reduce((res, block) => {
      // the line ends with colon and trailing space, therefore we use "".startsWith"
      const isItem = block.childNodes[0].nodeValue?.startsWith('You acquire an item');
      const isEffect = block.childNodes[0].nodeValue?.startsWith('You acquire an effect');

      const name = block.childNodes[1].textContent ?? '';
      const img = block.previousElementSibling?.querySelector('img');
      const image = img?.getAttribute('src') ?? '';

      if (isItem) {
        const id = img?.getAttribute('onclick')?.match(/descitem\((.*)\)/)?.[1] ?? '';

        const item: Item = {
          id,
          image,
          name,
        };

        res.items.push(item);
      } else if (isEffect) {
        const duration = block.childNodes[block.childNodes.length -1]?.nodeValue?.match(/\(duration:\s(.*)\sAdventures\)/)?.[1] ?? '';
        const id = img?.getAttribute('onclick')?.match(/eff\("(.*)"\)/)?.[1] ?? '';

        const effect: Effect = {
          duration,
          id,
          image,
          name,
        };

        res.effects.push(effect);
      }

      return res;
    }, { adventures: 0, effects: [], items: [], stats: { moxie: 0, muscle: 0, mysticallity: 0 } } as Result);

    return result;
  }
}
