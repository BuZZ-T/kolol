/**
 * name, duration, image, "skill:<skillId>", "effectId"
 * effectId is used for upeffect.php (which redirects to runskillz.php)
 * skillid is used for runskillz.php
 */
export type ApiEffect = [ string, string, string, `skill:${string}`, string ]

export type ApiStatus = {
    playerid: string;
    name: string;
    hardcore: string;
    ascensions: string;
    path: string;
    sign: string;
    roninleft: string;
    casual: string;
    drunk: string;
    full: string;
    turnsplayed: string;
    familiar: string;
    hp: string;
    mp: string;
    meat: string;
    adventures: string;
    level: string;
    rawmuscle: string;
    rawmysticality: string;
    rawmoxie: string;
    basemuscle: string;
    basemysticality: string;
    basemoxie: string;
    familiarexp: string;
    class: string;
    lastadv: {
      id: string;
      name: string;
      link: string;
      container: string;
    },
    title: string;
    pvpfights: string;
    maxhp: number;
    maxmp: number;
    spleen: string;
    muscle: number;
    mysticality: number;
    moxie: number;
    famlevel: number;
    locked: false,
    limitmode: number;
    daysthisrun: number;
    equipment: {
      fakehands:  number;
      cardsleeve: number;
    },
    stickers: [number, number, number],
    soulsauce: number;
    fury: number;
    pastathrall: number;
    pastathralllevel: number;
    folder_holder: [string, string, string, string, string],
    eleronkey: '8c3ccbb64b74674d1200ba8d8758f52f',
    flag_config: {
      noinvpops: 0,
      fastdecking: 0,
      seenewaccts: 0,
      devskills: 0,
      shortcharpane: 0,
      lazyinventory: 0,
      compactfights: 0,
      poppvpsearch: 0,
      questtracker: 0,
      charpanepvp: 0,
      australia: 0,
      fffights: 0,
      compactchar: 0,
      noframesize: 0,
      fullnesscounter: 0,
      nodevdebug: 0,
      noquestnudge: 0,
      nocalendar: 0,
      alwaystag: 0,
      clanlogins: 0,
      quickskills: 0,
      hprestorers: 0,
      hidejacko: 0,
      anchorshelf: 0,
      showoutfit: 0,
      wowbar: 0,
      swapfam: 0,
      hidefamfilter: 0,
      invimages: 0,
      showhandedness: 0,
      acclinks: 0,
      invadvancedsort: 0,
      powersort: 0,
      autodiscard: 0,
      unfamequip: 0,
      invclose: 0,
      sellstuffugly: 0,
      oneclickcraft: 0,
      dontscroll: 0,
      multisume: 0,
      threecolinv: 0,
      profanity: 0,
      tc_updatetitle: 0,
      tc_alwayswho: 0,
      tc_times: 0,
      tc_combineallpublic: 0,
      tc_eventsactive: 0,
      tc_hidebadges: 0,
      tc_colortabs: 0,
      tc_modifierkey: 0,
      tc_tabsonbottom: 0,
      chatversion: 0,
      aabosses: 0,
      compacteffects: 0,
      slimhpmpdisplay: 0,
      ignorezonewarnings: 0,
      whichpenpal: 0,
      compactmanuel: 0,
      hideefarrows: 0,
      questtrackertiny: 0,
      questtrackerscroll: 0,
      disablelovebugs: 0,
      eternalmrj: 0,
      autoattack: 0,
      topmenu: 2
    },
    recalledskills: number;
    freedralph: number;
    mcd: number;
    pwd: string;
    rollover: number;
    turnsthisrun: number;
    familiar_wellfed: number;
    intrinsics: unknown[],
    familiarpic: string;
    pathname: string;
    coolitems: string;
    daynumber: string;
    effects: Record<string, ApiEffect>;
  }

export type ActionHotkey = {
  type: 'action';
  id: 'attack' | 'chefstaff' | 'repeat' | 'runaway' | 'steal';
  pic: string;
}

export type GenericHotkey = {
    id: string;
    pic: string;
    type: 'action' | 'item' | 'skill';
  }

export type Hotkey = ActionHotkey | GenericHotkey

export type HotkeyData = [Hotkey, Hotkey, Hotkey, Hotkey, Hotkey, Hotkey, Hotkey, Hotkey, Hotkey, Hotkey, Hotkey, Hotkey]

export type ActionBarResponse = {
  pages: HotkeyData[];
  whichpage: number;
}
