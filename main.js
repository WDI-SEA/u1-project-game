var currentPlayer;
var nextPlayer;
var temp;
var critical;
var win = false;

class cat {
    constructor(bio, name, type, hp, currentHp, attack, range, special, description, damage, counter, image, dead, strong, weak) {
        this.bio = bio;
        this.name = name;
        this.type = type;
        this.hp = hp;
        this.currentHp = currentHp;
        this.attack = attack;
        this.range = range;
        this.special = special;
        this.description = description;
        this.damage = damage;
        this.counter = counter;
        this.image = image;
        this.dead = dead;
        this.strong = strong;
        this.weak = weak;
    }
}

class player {
    constructor(name, array, index, heal, id, playerClass, pickBox1, pickBox2, fightBox1, fightBox2) {
        this.name = name;
        this.array = array;
        this.index = index;
        this.heal = heal;
        this.id = id;
        this.class = playerClass;
        this.pickBox1 = pickBox1;
        this.pickBox2 = pickBox2;
        this.fightBox1 = fightBox1;
        this.fightBox2 = fightBox2;
    }
}

function switchPlayers() {
    $(currentPlayer.id).find('.moves').removeClass('red');
    temp = currentPlayer;
    currentPlayer = nextPlayer;
    nextPlayer = temp;
    $(currentPlayer.id).find('.moves').addClass('red');
}

function updatePickScreen(catName, player, box) {
    var array = player.array;
    var image = catName.image;

    array.push(catName);
    $(box).attr('src', image);
    switchPlayers();
}

function updateFightScreen(id, array, index) {
    $(id).find('.big-cat').attr('src', array[index].image);
    $(id).find('.hp').attr('value', array[index].currentHp).attr('max', array[index].hp);
    $(id).find('.fight-type').text(array[index].type);
    $(id).find('.atk').text(`1. Scratch: ${array[index].range}`);
    $(id).find('.spec').text(`2. Special: ${array[index].damage}`);
    if (id === '#player1') {
        play1.index = index;
    }
    if (id === '#player2') {
        play2.index = index;
    }
}

function damageRandomizer() {
    var randomDamage = Math.floor(Math.random() * 11);

    return randomDamage;
}

function critChance() {
    var crit;
    var chance = Math.ceil(Math.random() * 100);

    if (chance >= 90) {
        crit = 1.5;
        critical = true;
    } else {
        crit = 1;
        critical = false;
    }
    return crit;
}

function specialReady(counter, player) {
    var array = player.array;
    var index = player.index;

    if (counter > 0) {
        array[index].counter = array[index].counter - 1;
    }
}

function weakOrStrong(attkCat, oppCat) {
    var special = attkCat.special;
    var type = oppCat.type;
    var damageModifier = 1;

    switch (special) {
        case 'Hex':
            if (type === 'Adorable') {
                damageModifier = 2;
            } else if (type === 'Sleepy') {
                damageModifier = 0.5;
            } else if (type === 'Siamese') {
                damageModifier = 0.5;
            }
            return damageModifier;
        case 'Ooze Cuteness':
            if (type === 'Sleepy') {
                damageModifier = 2;
            } else if (type === 'Tabby') {
                damageModifier = 0.5;
            } else if (type === 'Siamese') {
                damageModifier = 0.5;
            }
            return damageModifier;
        case 'Fury Swipes':
            if (type === 'Goth') {
                damageModifier = 2;
            } else if (type === 'Adorable') {
                damageModifier = 0.5;
            } else if (type === 'Tabby') {
                damageModifier = 0.5;
            }
            return damageModifier;
        case 'Maul Face':
            if (type === 'Siamese') {
                damageModifier = 2;
            } else if (type === 'Sleepy') {
                damageModifier = 0.5;
            } else if (type === 'Goth') {
                damageModifier = 0.5;
            }
            return damageModifier;
        case 'Death Stare':
            if (type === 'Tabby') {
                damageModifier = 2;
            } else if (type === 'Adorable') {
                damageModifier = 0.5;
            } else if (type === 'Goth') {
                damageModifier = 0.5;
            }
            return damageModifier;
        case 'Loathe Everything':
            return damageModifier;
    }
}

function catDied(array, index) {
    if (array[index].currentHp <= 0) {
        array[index].dead = true;
        checkWin(array);

        if (!win) {
            if (index === 0) {
                $(nextPlayer.fightBox1).addClass('dead');
                nextPlayer.index = 1;
                updateFightScreen(nextPlayer.id, array, nextPlayer.index);
            } else if (index === 1) {
                $(nextPlayer.fightBox2).addClass('dead');
                nextPlayer.index = 0;
                updateFightScreen(nextPlayer.id, array, nextPlayer.index);
            }
        }
    }
    if (!win) {
        switchPlayers();
    }
}

function checkDead(array, index) {
    if (index === 0) {
        return array[1].dead;
    } else {
        return array[0].dead;
    }
}

function checkWin(array) {
    if (array[0].dead && array[1].dead) {
        win = true;
        $(currentPlayer.id).find('.moves').removeClass('red');
        $('#winners-screen > h1').html(`${currentPlayer.name} is victorious!`);
        $('#winners-screen').removeClass('hide');
    }
}

function moveChoice(attacker, opponent, attackerArray, attackerIndex, opponentArray, opponentIndex, move, atkClass) {
    var plusDamage = damageRandomizer();
    var multiplyer = critChance();
    var playerCat = attackerArray[attackerIndex];
    var enemyCat = opponentArray[opponentIndex];
    var modifier = weakOrStrong(playerCat, enemyCat);
    var atkValue = Math.floor((playerCat.attack + plusDamage) * multiplyer);
    var specValue = Math.floor(playerCat.damage * multiplyer * modifier);
    var healValue = playerCat.hp - playerCat.currentHp;
    var strong = false;
    var weak = false;

    if (modifier === 2) {
        strong = true;
    } else if (modifier === 0.5) {
        weak = true;
    }

    switch (move) {
        case 1:
            enemyCat.currentHp = enemyCat.currentHp - atkValue;
            $(attacker).find('.big-cat').addClass(atkClass);
            setTimeout(function() {
                $(opponent).find('.big-cat').addClass('damage');
                $(opponent).find('.hp').attr('value', enemyCat.currentHp);
                catDied(opponentArray, opponentIndex);
            }, 250);
            setTimeout(function() {
                $(attacker).find('.big-cat').removeClass(atkClass);
            }, 300);
            setTimeout(function() {
                $(opponent).find('.big-cat').removeClass('damage');
            }, 750);
            if (!critical) {
                $('.message').html(`${playerCat.name} hit ${enemyCat.name} for ${atkValue} damage!`);
            } else if (critical) {
                $('.message').html(`${playerCat.name} crit ${enemyCat.name} for ${atkValue} damage!`);
            }
            break;
        case 2:
            enemyCat.currentHp = enemyCat.currentHp - specValue;
            $(attacker).find('.big-cat').addClass('special');
            setTimeout(function() {
                $(attacker).find('.big-cat').removeClass('special');
            }, 500);
            setTimeout(function() {
                $(opponent).find('.big-cat').addClass('damage');
                $(opponent).find('.hp').attr('value', enemyCat.currentHp);
                catDied(opponentArray, opponentIndex);
            }, 500);
            setTimeout(function() {
                $(opponent).find('.big-cat').removeClass('damage');
            }, 1000);
            if (!critical) {
                $('.message').html(`${playerCat.special} hit ${enemyCat.name} for ${specValue} damage!`);
            } else if (critical) {
                $('.message').html(`${playerCat.special} crit ${enemyCat.name} for ${specValue} damage!`);
            }
            if (strong) {
                $('.message').append($('<p>').text("It's very effective!"));
            } else if (weak) {
                $('.message').append($('<p>').text("It's not very effective..."));
            }
            break;
        case 3:
            if (healValue > 300) {
                playerCat.currentHp = playerCat.currentHp + 300;
                $('.message').html(`${playerCat.name} healed for 300 HP!`);
            } else {
                playerCat.currentHp = playerCat.currentHp + healValue;
                $('.message').html(`${playerCat.name} healed for ${healValue}`);
            }
            $(attacker).find('.big-cat').addClass('heal');
            setTimeout(function() {
                $(attacker).find('.big-cat').removeClass('heal');
                $(attacker).find('.hp').attr('value', playerCat.currentHp);
            }, 500);
            switchPlayers();
            break;
        case 4:
            if (attackerIndex === 0) {
                attackerIndex = 1;
                updateFightScreen(attacker, attackerArray, attackerIndex);
                switchPlayers();
                break;
            } else if (attackerIndex === 1) {
                attackerIndex = 0;
                updateFightScreen(attacker, attackerArray, attackerIndex);
                switchPlayers();
                break;
            }
    }
}

var blackCat = new cat(
    "A favorite of witches and warlocks.  Goth cats often inherit some of their master's magical abilities.",
    'Binx',
    'Goth',
    800,
    800,
    70,
    '70 - 80',
    'Hex',
    'Blasts an opponent in the face with black magic.',
    200,
    0,
    'images/black-cat.png',
    false,
    'Adorable',
    'Sleepy & Siamese');
var blueCat = new cat(
    'Genetically engineered by scientists to be as cute as possible.',
    'Baby Blue',
    'Adorable',
    1200,
    1200,
    89,
    '89 - 99',
    'Ooze Cuteness',
    "Literally melts the hearts of it's opponents with cuteness.",
    150,
    0,
    'images/blue-cat.png',
    false,
    'Sleepy',
    'Tabby & Siamese');
var greyCat = new cat(
    'Most of their life is spent sleeping.  Wake them up, however, and you experience their wrath',
    'Patches',
    'Sleepy',
    900,
    900,
    100,
    '100 - 110',
    'Fury Swipes',
    'Unleashes a fury of attacks and hisses until left alone.',
    130,
    0,
    'images/grey-cat.png',
    false,
    'Goth',
    'Adorable & Tabby');
var orangeCat = new cat(
    'Small, orange, and cute.  Only their lifeless eyes hint at the ire that festers inside.',
    'Oliver',
    'Tabby',
    1000,
    1000,
    105,
    '105 - 115',
    'Maul Face',
    "Latches onto their enemy's face and doesn't relent until they're dead.",
    125,
    0,
    'images/orange-cat.png',
    false,
    'Siamese',
    'Goth & Sleepy');
var whiteCat = new cat(
    "Prefers the title Se&ntilde;or, despite not actually being of Latino decent.  It is unknown why.",
    'Se&ntilde;or Chang',
    'Siamese',
    750,
    750,
    80,
    '80 - 90',
    'Death Stare',
    "Lasers shoot out of it's eyes causing severe burn damage to it's victims.",
    175,
    0,
    'images/white-cat.png',
    false,
    'Tabby',
    'Goth & Adorable');
var grumpyCat = new cat(
    'Hates everything and everyone.',
    'Grumpy Cat',
    'Disgruntled',
    925,
    925,
    50,
    '87 - 97',
    'Loathe Everything',
    "Hate flows out of it's body in waves of intense energy.",
    100,
    0,
    'images/grumpy-cat.png',
    false,
    'Despises everything equally.',
    'Is indifferent to all types of attacks.');

var play1 = new player('', [], 0, 1, '#player1', 'p1attack', '#p1-c1', '#p1-c2', '#p1-fight1', '#p1-fight2');
var play2 = new player('', [], 0, 1, '#player2', 'p2attack', '#p2-c1', '#p2-c2', '#p2-fight1', '#p2-fight2');

function onPageLoad() {
    $('#pick-last').on('click', function() {
        $('#title-screen').addClass('hide');
        $('#pick-screen').removeClass('hide');
        $('body').removeClass('lightblue');
        $('body').addClass('lightslategrey');
        play1.name = $('#play1-name').val();
        play2.name = $('#play2-name').val();
        currentPlayer = play1;
        nextPlayer = play2;
        pickScreen();
    });
    $('#go-first').on('click', function() {
        $('#title-screen').addClass('hide');
        $('#pick-screen').removeClass('hide');
        $('body').removeClass('lightblue');
        $('body').addClass('lightslategrey');
        play1.name = $('#play1-name').val();
        play2.name = $('#play2-name').val();
        currentPlayer = play2;
        nextPlayer = play1;
        pickScreen();
    });
}


function pickScreen() {
    var catPicsArray = $('.cat-pics > div > img');
    $(currentPlayer.pickBox1).addClass('red');

    $.each(catPicsArray, function() {
        $(this).on('mouseover', function() {
            var catName = eval(this.name);
            $('.name').html(catName.name);
            $('.type').text(catName.type);
            $('.bio').html(`<i>"${catName.bio}"</i>`);
            $('.attack').text(catName.range);
            $('.specialName').text(catName.special);
            $('.description').html(`<i>"${catName.description}"</i>`);
            $('.damageAmt').text(catName.damage);
            $('.strong').text(catName.strong);
            $('.weak').text(catName.weak);
        });
    });

    $.each(catPicsArray, function() {
        $(this).on('click', function() {
            var catName = eval(this.name);
            var array1 = currentPlayer.array;
            var array2 = nextPlayer.array;
            var box1 = currentPlayer.pickBox1;
            var box2 = currentPlayer.pickBox2;

            if (array1.length < 1 && array2.length === 0) {
                $(currentPlayer.pickBox1).removeClass('red');
                updatePickScreen(catName, currentPlayer, box1);
                $(currentPlayer.pickBox1).addClass('red');
            } else if (array1.length < 1 && array2.length === 1) {
                $(currentPlayer.pickBox1).removeClass('red');
                $(currentPlayer.pickBox2).addClass('red');
                updatePickScreen(catName, currentPlayer, box1);
            } else if (array1.length < 2 && array2.length < 2) {
                switchPlayers();
                box2 = currentPlayer.pickBox2;
                $(currentPlayer.pickBox2).removeClass('red');
                updatePickScreen(catName, currentPlayer, box2);
                $(currentPlayer.pickBox2).addClass('red');
            } else if (array1.length < 2 || array2.length < 2) {
                $(currentPlayer.pickBox2).removeClass('red');
                updatePickScreen(catName, currentPlayer, box2);
            }
        });
    });

    $('#fight').on('click', function(event) {
        if (play1.array.length < 2 || play2.array.length < 2) {
            event.preventDefault();
        } else {
            $('#pick-screen').addClass('hide');
            $('#fight-screen').removeClass('hide');
            $('body').removeClass('lightslategrey');
            $('body').addClass('mintgreen');
            fightScreen();
        }
    });
}

function fightScreen() {
    var p1Array = play1.array;
    var p2Array = play2.array;

    $('#p1-fight1').attr('src', p1Array[0].image);
    $('#p2-fight1').attr('src', p2Array[0].image);
    $('#p1-fight2').attr('src', p1Array[1].image);
    $('#p2-fight2').attr('src', p2Array[1].image);

    updateFightScreen(play1.id, p1Array, play1.index);
    updateFightScreen(play2.id, p2Array, play2.index);
    $(currentPlayer.id).find('.moves').addClass('red');

    $(document).on('keyup', function() {
        var attkId = currentPlayer.id;
        var oppId = nextPlayer.id;
        var attkArray = currentPlayer.array;
        var oppArray = nextPlayer.array;
        var attkIndex = currentPlayer.index;
        var oppIndex = nextPlayer.index;
        var attkClass = currentPlayer.class;
        var currentCounter = attkArray[attkIndex].counter;


        if (event.key === '1' && !win) {
            specialReady(currentCounter, currentPlayer);
            moveChoice(attkId, oppId, attkArray, attkIndex, oppArray, oppIndex, 1, attkClass);
        } else if (event.key === '2' && !win) {
            if (currentCounter === 0) {
                attkArray[attkIndex].counter = 2;
                moveChoice(attkId, oppId, attkArray, attkIndex, oppArray, oppIndex, 2);
            } else {
                $('.message').text(`Your special isn't ready yet!  ${currentCounter} more turns!`);
            }
        } else if (event.key === '3' && !win) {
            if (currentPlayer.heal === 1 && (attkArray[attkIndex].hp - attkArray[attkIndex].currentHp) !== 0) {
                specialReady(currentCounter, currentPlayer);
                currentPlayer.heal = 0;
                moveChoice(attkId, oppId, attkArray, attkIndex, oppArray, oppIndex, 3);
            } else if ((attkArray[attkIndex].hp - attkArray[attkIndex].currentHp) === 0) {
                $('.message').text(`You're at max health!`);
            } else {
                $('.message').text(`You've already use your heal!`);
            }
        } else if (event.key === '4' && !win) {
            if (!checkDead(attkArray, attkIndex)) {
                specialReady(currentCounter, currentPlayer);
                moveChoice(attkId, oppId, attkArray, attkIndex, oppArray, oppIndex, 4);
            } else if (checkDead(attkArray, attkIndex)) {
                $('.message').text(`Can't switch!  Your other cat is dead!`);
            }
        }
    });
}

$(onPageLoad);
