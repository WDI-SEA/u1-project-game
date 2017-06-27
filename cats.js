var hex = new Special('Hex', {
    adorable: 2,
    sleepy: 0.5,
    siamese: 0.5
});
var oozeCuteness = new Special('Ooze cuteness', {
    sleepy: 2,
    tabby: 0.5,
    siamese: 0.5
});
var furySwipes = new Special('Fury Swipes', {
    goth: 2,
    adorable: 0.5,
    tabby: 0.5
});
var maulFace = new Special('Maul Face', {
    siamese: 2,
    sleepy: 0.5,
    goth: 0.5
});
var deathStare = new Special('Death Stare', {
    tabby: 2,
    adorable: 0.5,
    goth: 0.5
});
var loatheEverything = new Special('Loathe Everything', {});

var blackCat = new Cat({
    bio: "A favorite of witches and warlocks.  Goth cats often inherit some of their master's magical abilities.",
    name: 'Binx',
    type: 'Goth',
    hp: 800,
    currentHp: 800,
    attack: 70,
    range: '70 - 80',
    special: hex,
    description: 'Blasts an opponent in the face with black magic.',
    damage: 200,
    counter: 0,
    image: 'images/black-cat.png',
    dead: false,
    strong: 'Adorable',
    weak: 'Sleepy & Siamese'
});
var blueCat = new Cat({
    bio: 'Genetically engineered by scientists to be as cute as possible.',
    name: 'Baby Blue',
    type: 'Adorable',
    hp: 1200,
    currentHp: 1200,
    attack: 89,
    range: '89 - 99',
    special: oozeCuteness,
    description: "Literally melts the hearts of it's opponents with cuteness.",
    damage: 150,
    counter: 0,
    image: 'images/blue-cat.png',
    dead: false,
    strong: 'Sleepy',
    weak: 'Tabby & Siamese'
});
var greyCat = new Cat({
    bio: 'Most of their life is spent sleeping.  Wake them up, however, and you experience their wrath',
    name: 'Patches',
    type: 'Sleepy',
    hp: 900,
    currentHp: 900,
    attack: 100,
    range: '100 - 110',
    special: furySwipes,
    description: 'Unleashes a fury of attacks and hisses until left alone.',
    damage: 130,
    counter: 0,
    image: 'images/grey-cat.png',
    dead: false,
    strong: 'Goth',
    weak: 'Adorable & Tabby'
});
var orangeCat = new Cat({
    bio: 'Small, orange, and cute.  Only their lifeless eyes hint at the ire that festers inside.',
    name: 'Oliver',
    type: 'Tabby',
    hp: 1000,
    currentHp: 1000,
    attack: 105,
    range: '105 - 115',
    special: maulFace,
    description: "Latches onto their enemy's face and doesn't relent until they're dead.",
    damage: 125,
    counter: 0,
    image: 'images/orange-cat.png',
    dead: false,
    strong: 'Siamese',
    weak: 'Goth & Sleepy'
});
var whiteCat = new Cat({
    bio: "Prefers the title Se&ntilde;or, despite not actually being of Latino decent.  It is unknown why.",
    name: 'Se&ntilde;or Chang',
    type: 'Siamese',
    hp: 750,
    currentHp: 750,
    attack: 80,
    range: '80 - 90',
    special: deathStare,
    description: "Lasers shoot out of it's eyes causing severe burn damage to it's victims.",
    damage: 175,
    counter: 0,
    image: 'images/white-cat.png',
    dead: false,
    strong: 'Tabby',
    weak: 'Goth & Adorable'
});
var grumpyCat = new Cat({
    bio: 'Hates everything and everyone.',
    name: 'Grumpy Cat',
    type: 'Disgruntled',
    hp: 925,
    currentHp: 925,
    attack: 50,
    range: '87 - 97',
    special: loatheEverything,
    description: "Hate flows out of it's body in waves of intense energy.",
    damage: 100,
    counter: 0,
    image: 'images/grumpy-cat.png',
    dead: false,
    strong: 'Despises everything equally.',
    weak: 'Is indifferent to all types of attacks.'
});
