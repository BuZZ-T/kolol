type SkillTableEntryData = {
    id?: string;
    image: string;
    level: number | 'N/A';
    name: string;
    source: string;
}

const sealClubberSkills: Array<SkillTableEntryData> = [
  {
    id: '1000',
    image: 'Clubseal',
    level: 0,
    name: 'Seal Clubbing Frenzy',
    source: 'base',
  },
  {
    id: '1022',
    image: 'Clobber.gif',
    level: 0,
    name: 'Clobber',
    source: 'base',
  },
  {
    id: '1004',
    image: 'Club2.gif',
    level: 1,
    name: 'Lunge Smack',
    source: 'base',
  },
  {
    id: '1008',
    image: 'Smallheart.gif',
    level: 1,
    name: 'Fortitude of the Muskox',
    source: 'base',
  },
  {
    id: '1009',
    image: '3claws.gif',
    level: 2,
    name: 'Audacity of the Otter',
    source: 'base',
  },
  {
    id: '1027',
    image: 'Sleepy.gif',
    level: 2,
    name: 'Hibernate',
    source: 'base',
  },
  {
    id: '1007',
    image: 'Sebashield.gif',
    level: 3,
    name: 'Blubber Up',
    source: 'base',
  },
  {
    id: '1028 ',
    image: 'Snowflake.gif',
    level: 3,
    name: 'Cold Shoulder',
    source: 'base',
  },
  {
    id: '1003',
    image: 'Club.gif',
    level: 4,
    name: 'Thrust-Smack',
    source: 'base',
  },
  {
    id: '1029',
    image: 'Dipshitfangs.gif',
    level: 4,
    name: 'Wrath of the Wolverine',
    source: 'base',
  },
  {
    id: '1006',
    image: 'Hammer.gif',
    level: 5,
    name: 'Super-Advanced Meatsmithing',
    source: 'base',
  },
  {
    id: '1030',
    image: 'Beluga.gif',
    level: 5,
    name: 'Buoyancy of the Beluga',
    source: 'base',
  },
  {
    id: '1031',
    image: 'Angry.gif',
    level: 6,
    name: 'Scowl of the Auk',
    source: 'base',
  },
  {
    id: '1036',
    image: 'Weasel.gif',
    level: 6,
    name: 'Thirst of the Weasel',
    source: 'base',
  },
  {
    id: '1011',
    image: 'Yakskin.gif',
    level: 7,
    name: 'Hide of the Walrus',
    source: 'base',
  },
  {
    id: '1032',
    image: 'Wallop.gif',
    level: 7,
    name: 'Furious Wallop',
    source: 'base',
  },
  {
    id: '1012',
    image: '3clawsbig.gif',
    level: 8,
    name: 'Claws of the Walrus',
    source: 'base',
  },
  {
    id: '1033',
    image: 'Clubfoot.gif',
    level: 8,
    name: 'Club Foot',
    source: 'base',
  },
  {
    id: '1010',
    image: 'Tonguewalrus.gif',
    level: 9,
    name: 'Tongue of the Walrus',
    source: 'base',
  },
  {
    id: '1034',
    image: 'Madcat.gif',
    level: 9,
    name: 'Seething of the Snow Leopard',
    source: 'base',
  },
  {
    id: '1005',
    image: 'Cudgel.gif',
    level: 10,
    name: 'Lunging Thrust-Smack',
    source: 'base',
  },
  {
    id: '1035',
    image: 'Orca.gif',
    level: 10,
    name: 'Ire of the Orca',
    source: 'base',
  },
  {
    id: '1014',
    image: 'Ballbat item.gif',
    level: 11,
    name: 'Batter Up!',
    source: 'base',
  },
  {
    id: '1015',
    image: 'Reindeer.gif',
    level: 11,
    name: 'Rage of the Reindeer',
    source: 'base',
  },
  {
    id: '1017',
    image: '2clubs.gif',
    level: 12,
    name: 'Double-Fisted Skull Smashing',
    source: 'base',
  },
  {
    id: '1037',
    image: 'Cavalcade.gif',
    level: 12,
    name: 'Cavalcade of Fury',
    source: 'base',
  },
  {
    id: '1018',
    image: 'Blackcold.gif',
    level: 13,
    name: 'Northern Exposure',
    source: 'base',
  },
  {
    id: '1038',
    image: 'Northernexp.gif',
    level: 13,
    name: 'Northern Explosion',
    source: 'base',
  },
  {
    id: '1019',
    image: 'Moosemusk.gif',
    level: 14,
    name: 'Musk of the Moose',
    source: 'base',
  },
  {
    id: '1039',
    image: 'Reticle.gif',
    level: 14,
    name: 'Precision of the Penguin',
    source: 'base',
  },
  {
    id: '1016',
    image: 'Blackhammer.gif',
    level: 15,
    name: 'Pulverize',
    source: 'base',
  },
  {
    id: '1040',
    image: 'Trophy.gif',
    level: 15,
    name: 'Pride of the Puffin',
    source: 'base',
  },
  {
    id: '1020',
    image: 'Wolfmask.gif',
    level: 'N/A',
    name: 'Snarl of the Timberwolf',
    source: 'Spookyraven Manor Quest Skill',
  },
  {
    id: '1023',
    image: 'Hookspear.gif',
    level: 'N/A',
    name: 'Harpoon!',
    source: 'Sea Floor Skill',
  },
  {
    id: '1025',
    image: 'Palmtree.gif',
    level: 'N/A',
    name: 'Iron Palm Technique',
    source: 'The Traveling Trader Skill',
  },
  {
    id: '1024',
    image: 'Bathroomscale.gif',
    level: 'N/A',
    name: 'Holiday Weight Gain',
    source: 'Crimbo \'09 Skill',
  },
  {
    id: '1041',
    image: 'Silenthunter.gif',
    level: 'N/A',
    name: 'Silent Hunter',
    source: 'Crimbo \'17 Skill',
  },
];

const turtleTamerSkills: Array<SkillTableEntryData> = [
  {
    id: '2000',
    image: 'Tortpatience.gif',
    level: 0,
    name: 'Patience of the Tortoise',
    source: 'base',
  },
  {
    id: '2023',
    image: 'Toss.gif',
    level: 0,
    name: 'Toss',
    source: 'base',
  },
  {
    id: '2003',
    image: 'Headbutt.gif',
    level: 1,
    name: 'Headbutt',
    source: 'base',
  },
  {
    id: '2027',
    image: 'Palmtree.gif',
    level: 1,
    name: 'Spirit Vacation',
    source: 'base',
  },
  {
    id: '2004',
    image: 'Skin.gif',
    level: 2,
    name: 'Skin of the Leatherback',
    source: 'base',
  },
  {
    id: '2030',
    image: 'Warsnapper.gif',
    level: 2,
    name: 'Blessing of the War Snapper',
    source: 'base',
  },
  {
    id: '2014',
    image: 'Sympathy.gif',
    level: 3,
    name: 'Amphibian Sympathy',
    source: 'base',
  },
  {
    id: '2029',
    image: 'Stiffupperlip.gif',
    level: 3,
    name: 'Stiff Upper Lip',
    source: 'base',
  },
  {
    id: '2007',
    image: 'Ghosturtle.gif',
    level: 4,
    name: 'Ghostly Shell',
    source: 'base',
  },
  {
    id: '2036',
    image: 'Pizzaslice.gif',
    level: 4,
    name: 'Pizza Lover',
    source: 'base',
  },
  {
    id: '2006',
    image: 'Hatpants.gif',
    level: 5,
    name: 'Armorcraftiness',
    source: 'base',
  },
  {
    id: '2028',
    image: 'Shellup.gif',
    level: 5,
    name: 'Shell Up',
    source: 'base',
  },
  {
    id: '2010',
    image: 'Snapper.gif',
    level: 6,
    name: 'Tenacity of the Snapper',
    source: 'base',
  },
  {
    id: '2032',
    image: 'Spiritsnap.gif',
    level: 6,
    name: 'Spirit Snap',
    source: 'base',
  },
  {
    id: '2015',
    image: 'Kneebutt.gif',
    level: 7,
    name: 'Kneebutt',
    source: 'base',
  },
  {
    id: '2033',
    image: 'Shewhowas.gif',
    level: 7,
    name: 'Blessing of She-Who-Was',
    source: 'base',
  },
  {
    id: '2009',
    image: 'Empathy.gif',
    level: 8,
    name: 'Empathy of the Newt',
    source: 'base',
  },
  {
    id: '2034',
    image: 'Steel.gif',
    level: 8,
    name: 'Butts of Steel',
    source: 'base',
  },
  {
    id: '2031',
    image: 'Spikyshell.gif',
    level: 9,
    name: 'Spiky Shell',
    source: 'base',
  },
  {
    id: '2035',
    image: 'Sayturtle.gif',
    level: 9,
    name: 'Testudinal Teachings',
    source: 'base',
  },
  {
    id: '2008',
    image: 'Scharm.gif',
    level: 10,
    name: 'Reptilian Fortitude',
    source: 'base',
  },
  {
    id: '2005',
    image: 'Simpleshield.gif',
    level: 10,
    name: 'Shieldbutt',
    source: 'base',
  },
  {
    id: '2011',
    image: 'Wisdom.gif',
    level: 11,
    name: 'Wisdom of the Elder Tortoises',
    source: 'base',
  },
  {
    id: '2037',
    image: 'Stormtort.gif',
    level: 11,
    name: 'Blessing of the Storm Tortoise',
    source: 'base',
  },
  {
    id: '2012',
    image: 'Blackshell.gif',
    level: 12,
    name: 'Astral Shell',
    source: 'base',
  },
  {
    id: '2038',
    image: 'Calendar.gif',
    level: 12,
    name: 'The Long View',
    source: 'base',
  },
  {
    id: '2016',
    image: 'Blackskull.gif',
    level: 13,
    name: 'Cold-Blooded Fearlessness',
    source: 'base',
  },
  {
    id: '2039',
    image: 'Spiritboon.gif',
    level: 13,
    name: 'Spirit Boon',
    source: 'base',
  },
  {
    id: '2020',
    image: 'Halfshell.gif',
    level: 14,
    name: 'Hero of the Half-Shell',
    source: 'base',
  },
  {
    id: '2040',
    image: 'Patientsmile.gif',
    level: 14,
    name: 'Patient Smile',
    source: 'base',
  },
  {
    id: '2021',
    image: 'Tao.gif',
    level: 15,
    name: 'Tao of the Terrapin',
    source: 'base',
  },
  {
    id: '2041',
    image: 'Turtlepower.gif',
    level: 15,
    name: 'Turtle Power',
    source: 'base',
  },
  {
    id: '2022',
    image: 'Ssnapper.gif',
    level: 'N/A',
    name: 'Spectral Snapper',
    source: 'Spookyraven Manor Quest Skill',
  },
  {
    id: '2024',
    image: 'Leviatuga.gif',
    level: 'N/A',
    name: 'Summon Leviatuga',
    source: 'Sea Floor Skill',
  },
  {
    id: '2026',
    image: 'Turtle.gif',
    level: 'N/A',
    name: 'Curiosity of Br\'er Tarrypin',
    source: 'The Traveling Trader Skill',
  },
  {
    id: '2025',
    image: 'Jinglebells.gif',
    level: 'N/A',
    name: 'Jingle Bells',
    source: 'Crimbo \'09 Skill',
  },
  {
    id: '2042',
    image: 'Quietresolve.gif',
    level: 'N/A',
    name: 'Quiet Determination',
    source: 'Crimbo \'17 Skill',
  },
];

const pastamancerSkills: Array<SkillTableEntryData> = [
  {
    id: '3000',
    image: 'Mandala.gif',
    level: 0,
    name: 'Manicotti Meditation',
    source: 'base',
  },
  {
    id: '3020',
    image: 'Line.gif',
    level: 0,
    name: 'Spaghetti Spear',
    source: 'base',
  },
  {
    id: '3003',
    image: 'Ravshurikens.gif',
    level: 1,
    name: 'Ravioli Shurikens',
    source: 'base',
  },
  {
    id: '3025',
    image: 'Pizzacut.gif',
    level: 1,
    name: 'Utensil Twist',
    source: 'base',
  },
  {
    id: '3004',
    image: 'Entnoodles.gif',
    level: 2,
    name: 'Entangling Noodles',
    source: 'base',
  },
  {
    id: '3026',
    image: 'Aldente.gif',
    level: 2,
    name: 'Transcendent Al Dente',
    source: 'base',
  },
  {
    id: '3009',
    image: 'Lasbandage.gif',
    level: 3,
    name: 'Lasagna Bandages',
    source: 'base',
  },
  {
    id: '3027',
    image: 'T vampieroghi.gif',
    level: 3,
    name: 'Bind Vampieroghi',
    source: 'base',
  },
  {
    id: '3005',
    image: 'Pastacannon.gif',
    level: 4,
    name: 'Cannelloni Cannon',
    source: 'base',
  },
  {
    id: '3028',
    image: 'Archedeyebrow.gif',
    level: 4,
    name: 'Arched Eyebrow of the Archmage',
    source: 'base',
  },
  {
    id: '3006',
    image: 'Bowl.gif',
    level: 5,
    name: 'Pastamastery',
    source: 'base',
  },
  {
    id: '3029',
    image: 'T vermincelli.gif',
    level: 5,
    name: 'Bind Vermincelli',
    source: 'base',
  },
  {
    id: '3015',
    image: 'Fusilli.gif',
    level: 6,
    name: 'Springy Fusilli',
    source: 'base',
  },
  {
    id: '3030',
    image: 'Bringuptherear.gif',
    level: 6,
    name: 'Bringing Up the Rear',
    source: 'base',
  },
  {
    id: '3011',
    image: 'Rigatoni.gif',
    level: 7,
    name: 'Spirit of Rigatoni',
    source: 'base',
  },
  {
    id: '3031',
    image: 'T wisp.gif',
    level: 7,
    name: 'Bind Angel Hair Wisp',
    source: 'base',
  },
  {
    id: '3007',
    image: 'Stuffshell.gif',
    level: 8,
    name: 'Stuffed Mortar Shell',
    source: 'base',
  },
  {
    id: '3032',
    image: 'Pastashield.gif',
    level: 8,
    name: 'Shield of the Pastalord',
    source: 'base',
  },
  {
    id: '3014',
    image: 'Ravioli.gif',
    level: 9,
    name: 'Spirit of Ravioli',
    source: 'base',
  },
  {
    id: '3033',
    image: 'T elbowmac.gif',
    level: 9,
    name: 'Bind Undead Elbow Macaroni',
    source: 'base',
  },
  {
    id: '3008',
    image: 'Ironspoon.gif',
    level: 10,
    name: 'Weapon of the Pastalord',
    source: 'base',
  },
  {
    id: '3034',
    image: 'Tactics.gif',
    level: 10,
    name: 'Thrall Unit Tactics',
    source: 'base',
  },
  {
    id: '3010',
    image: 'String.gif',
    level: 11,
    name: 'Leash of Linguini',
    source: 'base',
  },
  {
    id: '3035',
    image: 'T dreadful.gif',
    level: 11,
    name: 'Bind Penne Dreadful',
    source: 'base',
  },
  {
    id: '3005',
    image: 'Coccoon.gif',
    level: 12,
    name: 'Cannelloni Cocoon',
    source: 'base',
  },
  {
    id: '3036',
    image: 'Quicktoanger.gif',
    level: 12,
    name: 'Subtle and Quick to Anger',
    source: 'base',
  },
  {
    id: '3016',
    image: 'Blackfire.gif',
    level: 13,
    name: 'Tolerance of the Kitchen',
    source: 'base',
  },
  {
    id: '3037',
    image: 'T lasagmbie.gif',
    level: 13,
    name: 'Bind Lasagmbie',
    source: 'base',
  },
  {
    id: '3017',
    image: 'Flavorofmagic.gif',
    level: 14,
    name: 'Flavour of Magic',
    source: 'base',
  },
  {
    id: '3038',
    image: 'Wizardsquint.gif',
    level: 14,
    name: 'Wizard Squint',
    source: 'base',
  },
  {
    id: '3018',
    image: 'Blacknoodles.gif',
    level: 15,
    name: 'Transcendental Noodlecraft',
    source: 'base',
  },
  {
    id: '3039',
    image: 'T spiceghost.gif',
    level: 15,
    name: 'Bind Spice Ghost',
    source: 'base',
  },
  {
    id: '3019',
    image: 'Fearfulfet.gif',
    level: 'N/A',
    name: 'Fearful Fettucini',
    source: 'Spookyraven Manor Quest Skill',
  },
  {
    id: '3021',
    image: 'Batter2.gif',
    level: 'N/A',
    name: 'Tempuramancy',
    source: 'Sea Floor Skill',
  },
  {
    id: '3023',
    image: 'Scharm.gif',
    level: 'N/A',
    name: 'Stringozzi Serpent',
    source: 'The Traveling Trader Skill',
  },
  {
    id: '3022',
    image: 'Candypile.gif',
    level: 'N/A',
    name: 'Candyblast',
    source: 'Crimbo \'09 Skill',
  },
  {
    id: '3042',
    image: 'Quietjudgement.gif',
    level: 'N/A',
    name: 'Quiet Judgement',
    source: 'Crimbo \'17 Skill',
  },
  // {
  //   id: '3024',
  //   image: 'Carboloading.gif',
  //   level: 'N/A',
  //   name: 'Canticle of Carboloading',
  //   source: 'Nemesis Quest',
  // },
  // {
  //   id: '3041',
  //   image: 'T spagdemon.gif',
  //   level: 'N/A',
  //   name: 'Bind Spaghetti Elemental',
  //   source: 'Nemesis Quest',
  // },
];

const saucerorSkills: Array<SkillTableEntryData> = [
  {
    id: '4000',
    image: 'Contemplation.gif',
    level: 0,
    name: 'Sauce Contemplation',
    source: 'base',
  },
  {
    id: '4020',
    image: 'Salsaball.gif',
    level: 0,
    name: 'Salsaball',
    source: 'base',
  },
  {
    id: '4024',
    image: 'Scurse1.gif',
    level: 1,
    name: 'Curse of Vichyssoise',
    source: 'base',
  },
  {
    id: '4025',
    image: 'Simmer.gif',
    level: 1,
    name: 'Simmer',
    source: 'base',
  },
  {
    id: '4003',
    image: 'Saucestream.gif',
    level: 2,
    name: 'Stream of Sauce',
    source: 'base',
  },
  {
    id: '4014',
    image: 'Saucysalve.gif',
    level: 2,
    name: 'Saucy Salve',
    source: 'base',
  },
  {
    id: '4004',
    image: 'Saucepan.gif',
    level: 3,
    name: 'Expert Panhandling',
    source: 'base',
  },
  {
    id: '4026',
    image: 'Icyglare.gif',
    level: 3,
    name: 'Icy Glare',
    source: 'base',
  },
  {
    id: '4007',
    image: 'Elesphere.gif',
    level: 4,
    name: 'Elemental Saucesphere',
    source: 'base',
  },
  {
    id: '4028',
    image: 'Innersauce.gif',
    level: 4,
    name: 'Inner Sauce',
    source: 'base',
  },
  {
    id: '4006',
    image: 'Lovepotion.gif',
    level: 5,
    name: 'Advanced Saucecrafting',
    source: 'base',
  },
  {
    id: '4005',
    image: 'Raincloud.gif',
    level: 5,
    name: 'Saucestorm',
    source: 'base',
  },
  {
    id: '4027',
    image: 'Soulsauce.gif',
    level: 6,
    name: 'Soul Saucery',
    source: 'base',
  },
  {
    id: '4029',
    image: 'Scurse3.gif',
    level: 6,
    name: 'Curse of Marinara',
    source: 'base',
  },
  {
    id: '4008',
    image: 'Pepsphere.gif',
    level: 7,
    name: 'Jalapeño Saucesphere',
    source: 'base',
  },
  {
    id: '4009',
    image: 'Saucewave.gif',
    level: 7,
    name: 'Wave of Sauce',
    source: 'base',
  },
  {
    id: '4030',
    image: 'Triggerfinger.gif',
    level: 8,
    name: 'Itchy Curse Finger',
    source: 'base',
  },
  {
    id: '4031',
    image: 'Scurse2.gif',
    level: 8,
    name: 'Curse of the Thousand Islands',
    source: 'base',
  },
  {
    id: '4010',
    image: 'Pepper.gif',
    level: 9,
    name: 'Intrinsic Spiciness',
    source: 'base',
  },
  {
    id: '4032',
    image: 'Saucecicle.gif',
    level: 9,
    name: 'Saucecicle',
    source: 'base',
  },
  {
    id: '4011',
    image: 'Mastersaucier.gif',
    level: 10,
    name: 'Master Saucier',
    source: 'base',
  },
  {
    id: '4033',
    image: 'Antibiosphere.gif',
    level: 10,
    name: 'Antibiotic Saucesphere',
    source: 'base',
  },
  {
    id: '4012',
    image: 'Saucegeyser.gif',
    level: 11,
    name: 'Saucegeyser',
    source: 'base',
  },
  {
    id: '4039',
    image: 'Saucemaven.gif',
    level: 11,
    name: 'Saucemaven',
    source: 'base',
  },
  {
    id: '4015',
    image: '5alarm.gif',
    level: 12,
    name: 'Impetuous Sauciness',
    source: 'base',
  },
  {
    id: '4034',
    image: 'Scurse4.gif',
    level: 12,
    name: 'Curse of Weaksauce',
    source: 'base',
  },
  {
    id: '4016',
    image: 'Blackstench.gif',
    level: 13,
    name: 'Diminished Gag Reflex',
    source: 'base',
  },
  {
    id: '4035',
    image: 'Wrysmile.gif',
    level: 13,
    name: 'Wry Smile',
    source: 'base',
  },
  {
    id: '4017',
    image: 'Spunk.gif',
    level: 14,
    name: 'Irrepressible Spunk',
    source: 'base',
  },
  {
    id: '4037',
    image: 'Saucemonocle.gif',
    level: 14,
    name: 'Sauce Monocle',
    source: 'base',
  },
  {
    id: '4018',
    image: 'Potion9.gif',
    level: 15,
    name: 'The Way of Sauce',
    source: 'base',
  },
  {
    id: '4038',
    image: 'Saucedrops.gif',
    level: 15,
    name: 'Blood Sugar Sauce Magic',
    source: 'base',
  },
  {
    id: '4019',
    image: 'Scarysauce.gif',
    level: 'N/A',
    name: 'Scarysauce',
    source: 'Spookyraven Manor Quest Skill',
  },
  {
    id: '4021',
    image: 'Potion10.gif',
    level: 'N/A',
    name: 'Deep Saucery',
    source: 'Sea Floor Skill',
  },
  {
    id: '4023',
    image: 'Cheesestorm.gif',
    level: 'N/A',
    name: 'Käsesoßesturm',
    source: 'The Traveling Trader Skill',
  },
  {
    id: '4022',
    image: 'Icingsurge.gif',
    level: 'N/A',
    name: 'Surge of Icing',
    source: 'Crimbo \'09 Skill',
  },
  {
    id: '4040',
    image: 'Silenttreatment.gif',
    level: 'N/A',
    name: 'Silent Treatment',
    source: 'Crimbo \'17 Skill',
  },
];

const discoBanditSkills: Array<SkillTableEntryData> = [
  {
    id: '5000',
    image: 'Discoball',
    level: 0,
    name: 'Disco Aerobics',
    source: 'base',
  },
  {
    id: '5021',
    image: 'Hernia.gif',
    level: 0,
    name: 'Suckerpunch',
    source: 'base',
  },
  {
    id: '5003',
    image: 'Eyepoke.gif',
    level: 1,
    name: 'Disco Eye-Poke',
    source: 'base',
  },
  {
    id: '5025',
    image: 'Glove.gif',
    level: 1,
    name: 'Deft Hands',
    source: 'base',
  },
  {
    id: '5010',
    image: 'Numberone.gif',
    level: 2,
    name: 'Overdeveloped Sense of Self Preservation',
    source: 'base',
  },
  {
    id: '5005',
    image: 'Dance1.gif',
    level: 2,
    name: 'Disco Dance of Doom',
    source: 'base',
  },
  {
    id: '5007',
    image: 'Sleepy.gif',
    level: 3,
    name: 'Disco Nap',
    source: 'base',
  },
  {
    id: '5026',
    image: 'Moxman.gif',
    level: 3,
    name: 'Disco State of Mind',
    source: 'base',
  },
  {
    id: '5008',
    image: 'Dance2.gif',
    level: 4,
    name: 'Disco Dance II: Electric Boogaloo',
    source: 'base',
  },
  {
    id: '5027',
    image: 'Spiral.gif',
    level: 4,
    name: 'Frantic Gyrations',
    source: 'base',
  },
  {
    id: '5014',
    image: 'Shaker.gif',
    level: 5,
    name: 'Advanced Cocktailcrafting',
    source: 'base',
  },
  {
    id: '5028',
    image: 'Knife.gif',
    level: 5,
    name: 'That\'s Not a Knife',
    source: 'base',
  },
  {
    id: '5004',
    image: 'Glove.gif',
    level: 6,
    name: 'Nimble Fingers',
    source: 'base',
  },
  {
    id: '5012',
    image: 'Facestab.gif',
    level: 6,
    name: 'Disco Face Stab',
    source: 'base',
  },
  {
    id: '5029',
    image: 'Dv remknife.gif',
    level: 7,
    name: 'Tricky Knifework',
    source: 'base',
  },
  {
    id: '5030',
    image: 'Flashydancer.gif',
    level: 7,
    name: 'Flashy Dancer',
    source: 'base',
  },
  {
    id: '5006',
    image: 'Chest2.gif',
    level: 8,
    name: 'Mad Looting Skillz',
    source: 'base',
  },
  {
    id: '5031',
    image: 'Wink.gif',
    level: 8,
    name: 'Disco Smirk',
    source: 'base',
  },
  {
    id: '5032',
    image: 'Dollarsign.gif',
    level: 9,
    name: 'Disco Greed',
    source: 'base',
  },
  {
    id: '5033',
    image: 'Knifedark.gif',
    level: 9,
    name: 'Knife in the Dark',
    source: 'base',
  },
  {
    id: '5034',
    image: 'Discobravado.gif',
    level: 10,
    name: 'Disco Bravado',
    source: 'base',
  },
  {
    id: '5035',
    image: 'Irondagger.gif',
    level: 10,
    name: 'Disco Shank',
    source: 'base',
  },
  {
    id: '5011',
    image: 'Powernap.gif',
    level: 11,
    name: 'Adventurer of Leisure',
    source: 'base',
  },
  {
    id: '5036',
    image: 'Dance3.gif',
    level: 11,
    name: 'Disco Dance 3: Back in the Habit',
    source: 'base',
  },
  {
    id: '5015',
    image: 'Ambidex.gif',
    level: 12,
    name: 'Ambidextrous Funkslinging',
    source: 'base',
  },
  {
    id: '5037',
    image: 'Fire.gif',
    level: 12,
    name: 'Disco Inferno',
    source: 'base',
  },
  {
    id: '5016',
    image: 'Blackwink.gif',
    level: 13,
    name: 'Heart of Polyester',
    source: 'base',
  },
  {
    id: '5009',
    image: 'Discomask.gif',
    level: 13,
    name: 'Disco Fever',
    source: 'base',
  },
  {
    id: '5017',
    image: 'Footprints.gif',
    level: 14,
    name: 'Smooth Movement',
    source: 'base',
  },
  {
    id: '5038',
    image: 'Sensifingers.gif',
    level: 14,
    name: 'Sensitive Fingers',
    source: 'base',
  },
  {
    id: '5018',
    image: 'Fruitym.gif',
    level: 15,
    name: 'Superhuman Cocktailcrafting',
    source: 'base',
  },
  {
    id: '5039',
    image: 'Discoleer.gif',
    level: 15,
    name: 'Disco Leer',
    source: 'base',
  },
  {
    id: '5019',
    image: 'Terrortango.gif',
    level: 'N/A',
    name: 'Tango of Terror',
    source: 'Spookyraven Manor Quest Skill',
  },
  {
    id: '5022',
    image: 'Saltshaker.gif',
    level: 'N/A',
    name: 'Salacious Cocktailcrafting',
    source: 'Sea Floor Skill',
  },
  {
    id: '5024',
    image: 'Kungfu.gif',
    level: 'N/A',
    name: 'Kung Fu Hustler',
    source: 'Traveling Trader Skill',
  },
  {
    id: '5023',
    image: 'Mistletoe.gif',
    level: 'N/A',
    name: 'Stealth Mistletoe',
    source: 'Crimbo \'09 Skill',
  },
  {
    id: '5040',
    image: 'Silentknife.gif',
    level: 'N/A',
    name: 'Silent Knife',
    source: 'Crimbo \'17 Skill',
  },
  // {
  //   id: '5009',
  //   image: 'Loop.gif',
  //   level: 'N/A',
  //   name: 'Gothy Handwave',
  //   source: 'Rave Skills',
  // },
  // {
  //   id: '0050',
  //   image: 'Brokebone.gif',
  //   level: 'N/A',
  //   name: 'Break It On Down',
  //   source: 'Rave Skills',
  // },
  // {
  //   id: '0051',
  //   image: 'Oaf.gif',
  //   level: 'N/A',
  //   name: 'Pop and Lock It',
  //   source: 'Rave Skills',
  // },
  // {
  //   id: '0052',
  //   image: 'Fast.gif',
  //   level: 'N/A',
  //   name: 'Run Like the Wind',
  //   source: 'Rave Skills',
  // },
];

const accordionThiefSkills: Array<SkillTableEntryData> = [
  {
    id: '6000',
    image: 'Accordion',
    level: 0,
    name: 'Moxie of the Mariachi',
    source: 'base',
  },
  {
    id: '6025',
    image: 'Breath.gif',
    level: 0,
    name: 'Sing',
    source: 'base',
  },
  {
    id: '6004',
    image: 'Madrigal.gif',
    level: 1,
    name: 'The Moxious Madrigal',
    source: 'base',
  },
  {
    id: '6029',
    image: 'Brokenflute.gif',
    level: 1,
    name: 'Dissonant Riff',
    source: 'base',
  },
  {
    id: '6007',
    image: 'Mojomusc.gif',
    level: 2,
    name: 'The Magical Mojomuscular Melody',
    source: 'base',
  },
  {
    id: '6030',
    image: 'Cadenza.gif',
    level: 2,
    name: 'Cadenza',
    source: 'base',
  },
  {
    id: '6005',
    image: 'Celerity.gif',
    level: 3,
    name: 'Cletus\'s Canticle of Celerity',
    source: 'base',
  },
  {
    id: '6031',
    image: 'Crabclaw.gif',
    level: 3,
    name: 'Crab Claw Technique',
    source: 'base',
  },
  {
    id: '6008',
    image: 'Arrowsmith.gif',
    level: 4,
    name: 'The Power Ballad of the Arrowsmith',
    source: 'base',
  },
  {
    id: '6032',
    image: 'Accordionbash.gif',
    level: 4,
    name: 'Accordion Bash',
    source: 'base',
  },
  {
    id: '6006',
    image: 'Plenty.gif',
    level: 5,
    name: 'The Polka of Plenty',
    source: 'base',
  },
  {
    id: '6033',
    image: 'Acc17.gif',
    level: 5,
    name: 'Accordion Appreciation',
    source: 'base',
  },
  {
    id: '6012',
    image: 'Jackasses.gif',
    level: 6,
    name: 'Jackasses\' Symphony of Destruction',
    source: 'base',
  },
  {
    id: '6034',
    image: 'Cdlm.gif',
    level: 6,
    name: 'Concerto de los Muertos',
    source: 'base',
  },
  {
    id: '6010',
    image: 'Fatleons.gif',
    level: 7,
    name: 'Fat Leon\'s Phat Loot Lyric',
    source: 'base',
  },
  {
    id: '6035',
    image: 'Dollarsign.gif',
    level: 7,
    name: 'Five Finger Discount',
    source: 'base',
  },
  {
    id: '6009',
    image: 'Brawnees.gif',
    level: 8,
    name: 'Brawnee\'s Anthem of Absorption',
    source: 'base',
  },
  {
    id: '6036',
    image: 'Susgaze.gif',
    level: 8,
    name: 'Suspicious Gaze',
    source: 'base',
  },
  {
    id: '6011',
    image: 'Psalm.gif',
    level: 9,
    name: 'The Psalm of Pointiness',
    source: 'base',
  },
  {
    id: '6037',
    image: 'Bawdyrefrain.gif',
    level: 9,
    name: 'Bawdy Refrain',
    source: 'base',
  },
  {
    id: '6013',
    image: 'Superiority.gif',
    level: 10,
    name: 'Stevedave\'s Shanty of Superiority',
    source: 'base',
  },
  {
    id: '6038',
    image: 'Thiefeyes.gif',
    level: 10,
    name: 'Thief Among the Honorable',
    source: 'base',
  },
  {
    id: '6003',
    image: 'Antiphon.gif',
    level: 11,
    name: 'Aloysius\' Antiphon of Aptitude',
    source: 'base',
  },
  {
    id: '6039',
    image: 'Stickygloves.gif',
    level: 11,
    name: 'Sticky Fingers',
    source: 'base',
  },
  {
    id: '6014',
    image: 'Odetobooze.gif',
    level: 12,
    name: 'The Ode to Booze',
    source: 'base',
  },
  {
    id: '6040',
    image: 'Zydecone.gif',
    level: 12,
    name: 'Cone of Zydeco',
    source: 'base',
  },
  {
    id: '6015',
    image: 'Sonata.gif',
    level: 13,
    name: 'The Sonata of Sneakiness',
    source: 'base',
  },
  {
    id: '6041',
    image: 'Moneybag.gif',
    level: 13,
    name: 'Master Accordion Master Thief',
    source: 'base',
  },
  {
    id: '6016',
    image: 'Cantata.gif',
    level: 14,
    name: 'Carlweather\'s Cantata of Confrontation',
    source: 'base',
  },
  {
    id: '6042',
    image: 'Coolsmile.gif',
    level: 14,
    name: 'Knowing Smile',
    source: 'base',
  },
  {
    id: '6017',
    image: 'Urkels.gif',
    level: 15,
    name: 'Ur-Kel\'s Aria of Annoyance',
    source: 'base',
  },
  {
    id: '6043',
    image: 'Mariachimem.gif',
    level: 15,
    name: 'Mariachi Memory',
    source: 'base',
  },
  {
    id: '6018',
    image: 'Dirge.gif',
    level: 'N/A',
    name: 'Dirge of Dreadfulness',
    source: 'Spookyraven Manor Quest Skill',
  },
  {
    id: '6026',
    image: 'Bubblyballad.gif',
    level: 'N/A',
    name: 'Donho\'s Bubbly Ballad',
    source: 'Sea Floor Skill',
  },
  // {
  //   id: '6020',
  //   image: 'Richie.gif',
  //   level: 'N/A',
  //   name: 'The Ballad of Richie Thingfinder',
  //   source: 'Hobopolis Skills',
  // },
  // {
  //   id: '6045',
  //   image: 'Medley.gif',
  //   level: 'N/A',
  //   name: 'Benetton\'s Medley of Diversity',
  //   source: 'Hobopolis Skills',
  // },
  // {
  //   id: '6046',
  //   image: 'Etude.gif',
  //   level: 'N/A',
  //   name: 'Elron\'s Explosive Etude',
  //   source: 'Hobopolis Skills',
  // },
  // {
  //   id: '6047',
  //   image: 'Chorale.gif',
  //   level: 'N/A',
  //   name: 'Chorale of Companionship',
  //   source: 'Hobopolis Skills',
  // },
  // {
  //   id: '6048',
  //   image: 'Prelude.gif',
  //   level: 'N/A',
  //   name: 'Prelude of Precision',
  //   source: 'Hobopolis Skills',
  // },
  {
    id: '6028',
    image: 'Incantation.gif',
    level: 'N/A',
    name: 'Inigo\'s Incantation of Inspiration',
    source: 'The Traveling Trader Skill',
  },
  {
    id: '6027',
    image: 'Curative.gif',
    level: 'N/A',
    name: 'Cringle\'s Curative Carol',
    source: 'Crimbo \'09 Skill',
  },
  {
    id: '6044',
    image: 'Quietdesperation.gif',
    level: 'N/A',
    name: 'Quiet Desperation',
    source: 'Crimbo \'17 Skill',
  },
];

export const skillTableData: Array<Array<SkillTableEntryData>> = [
  sealClubberSkills,
  turtleTamerSkills,
  pastamancerSkills,
  saucerorSkills,
  discoBanditSkills,
  accordionThiefSkills,
];

export const transformedSkillTableData = skillTableData.reduce((acc, rowToColumn) => {
  rowToColumn.forEach((skill, index) => {
    if (!acc[index]) {
      acc[index] = [];
    }
    acc[index].push(skill);
  });

  return acc;
}, ([]  as Array<Array<SkillTableEntryData>>));
