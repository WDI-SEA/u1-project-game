var currentPlayer;
var nextPlayer;
var temp;
var critical;
var win = false;

class cat {
    constructor(bio, name, type, hp, currentHp, attack, range, special, description, damage, counter, image, dead, strong, weak) {
        this.Bio = bio;
        this.Name = name;
        this.Type = type;
        this.Hp = hp;
        this.CurrentHp = currentHp;
        this.Attack = attack;
        this.Range = range;
        this.Special = special;
        this.Description = description;
        this.Damage = damage;
        this.Counter = counter;
        this.Image = image;
        this.Dead = dead;
        this.Strong = strong;
        this.Weak = weak;
    }
}

class player {
    constructor(name, array, index, heal, id, playerClass, pickBox1, pickBox2, fightBox1, fightBox2) {
        this.Name = name;
        this.Array = array;
        this.Index = index;
        this.Heal = heal;
        this.Id = id;
        this.Class = playerClass;
        this.PickBox1 = pickBox1;
        this.PickBox2 = pickBox2;
        this.FightBox1 = fightBox1;
        this.FightBox2 = fightBox2;
    }
}

function switchPlayers() {
    $(currentPlayer.Id).find('.moves').removeClass('red');
    temp = currentPlayer;
    currentPlayer = nextPlayer;
    nextPlayer = temp;
    $(currentPlayer.Id).find('.moves').addClass('red');
}

function updatePickScreen(catName, player, box) {
    var array = player.Array;
    var image = catName.Image;

    array.push(catName);
    $(box).attr('src', image);
    switchPlayers();
}

function updateFightScreen(id, array, index) {
    $(id).find('.big-cat').attr('src', array[index].Image);
    $(id).find('.hp').attr('value', array[index].CurrentHp).attr('max', array[index].Hp);
    $(id).find('.fight-type').text(array[index].Type);
    $(id).find('.atk').text(`1. Scratch: ${array[index].Range}`);
    $(id).find('.spec').text(`2. Special: ${array[index].Damage}`);
    if (id === '#player1') {
        play1.Index = index;
    }
    if (id === '#player2') {
        play2.Index = index;
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
    var array = player.Array;
    var index = player.Index;

    if (counter > 0) {
        array[index].Counter = array[index].Counter - 1;
    }
}

function weakOrStrong(attkCat, oppCat) {
    var special = attkCat.Special;
    var type = oppCat.Type;
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
    if (array[index].CurrentHp <= 0) {
        array[index].Dead = true;
        checkWin(array);

        if (!win) {
            if (index === 0) {
                $(nextPlayer.FightBox1).addClass('dead');
                nextPlayer.Index = 1;
                updateFightScreen(nextPlayer.Id, array, nextPlayer.Index);
            } else if (index === 1) {
                $(nextPlayer.FightBox2).addClass('dead');
                nextPlayer.Index = 0;
                updateFightScreen(nextPlayer.Id, array, nextPlayer.Index);
            }
        }
    }

    switchPlayers();
}

function checkDead(array, index) {
    if (index === 0) {
        return array[1].Dead;
    } else {
        return array[0].Dead;
    }
}

function checkWin(array) {
    if (array[0].Dead && array[1].Dead) {
        win = true;
        $('.message').text(`${nextPlayer.Name}'s cats are dead!  ${currentPlayer.Name} wins!!`);
    }
}

function moveChoice(attacker, opponent, attackerArray, attackerIndex, opponentArray, opponentIndex, move, atkClass) {
    var plusDamage = damageRandomizer();
    var multiplyer = critChance();
    var playerCat = attackerArray[attackerIndex];
    var enemyCat = opponentArray[opponentIndex];
    var modifier = weakOrStrong(playerCat, enemyCat);
    var atkValue = Math.floor((playerCat.Attack + plusDamage) * multiplyer);
    var specValue = Math.floor(playerCat.Damage * multiplyer * modifier);
    var healValue = playerCat.Hp - playerCat.CurrentHp;
    var strong = false;
    var weak = false;

    if (modifier === 2) {
        strong = true;
    } else if (modifier === 0.5) {
        weak = true;
    }

    switch (move) {
        case 1:
            enemyCat.CurrentHp = enemyCat.CurrentHp - atkValue;
            $(attacker).find('.big-cat').addClass(atkClass);
            setTimeout(function() {
                $(opponent).find('.big-cat').addClass('damage');
                $(opponent).find('.hp').attr('value', enemyCat.CurrentHp);
                catDied(opponentArray, opponentIndex);
            }, 250);
            setTimeout(function() {
                $(attacker).find('.big-cat').removeClass(atkClass);
            }, 300);
            setTimeout(function() {
                $(opponent).find('.big-cat').removeClass('damage');
            }, 750);
            if (!critical) {
                $('.message').html(`${playerCat.Name} hit ${enemyCat.Name} for ${atkValue} damage!`);
            } else if (critical) {
                $('.message').html(`${playerCat.Name} crit ${enemyCat.Name} for ${atkValue} damage!`);
            }
            break;
        case 2:
            enemyCat.CurrentHp = enemyCat.CurrentHp - specValue;
            $(attacker).find('.big-cat').addClass('special');
            setTimeout(function() {
                $(attacker).find('.big-cat').removeClass('special');
            }, 500);
            setTimeout(function() {
                $(opponent).find('.big-cat').addClass('damage');
                $(opponent).find('.hp').attr('value', enemyCat.CurrentHp);
                catDied(opponentArray, opponentIndex);
            }, 500);
            setTimeout(function() {
                $(opponent).find('.big-cat').removeClass('damage');
            }, 1000);
            if (!critical) {
                $('.message').html(`${playerCat.Special} hit ${enemyCat.Name} for ${specValue} damage!`);
            } else if (critical) {
                $('.message').html(`${playerCat.Special} crit ${enemyCat.Name} for ${specValue} damage!`);
            }
            if (strong) {
                $('.message').append($('<p>').text("It's very effective!"));
            } else if (weak) {
                $('.message').append($('<p>').text("It's not very effective..."));
            }
            break;
        case 3:
            if (healValue > 300) {
                playerCat.CurrentHp = playerCat.CurrentHp + 300;
                $('.message').html(`${playerCat.Name} healed for 300 HP!`);
            } else {
                playerCat.CurrentHp = playerCat.CurrentHp + healValue;
                $('.message').html(`${playerCat.Name} healed for ${healValue}`);
            }
            $(attacker).find('.big-cat').addClass('heal');
            setTimeout(function() {
                $(attacker).find('.big-cat').removeClass('heal');
                $(attacker).find('.hp').attr('value', playerCat.CurrentHp);
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
        play1.Name = $('#play1-name').val();
        play2.Name = $('#play2-name').val();
        currentPlayer = play1;
        nextPlayer = play2;
        pickScreen();
    });
    $('#go-first').on('click', function() {
        $('#title-screen').addClass('hide');
        $('#pick-screen').removeClass('hide');
        play1.Name = $('#play1-name').val();
        play2.Name = $('#play2-name').val();
        currentPlayer = play2;
        nextPlayer = play1;
        pickScreen();
    });
}


function pickScreen() {
    console.log(play1.Name, play2.Name);
    var catPicsArray = $('.cat-pics > div > img');
    $(currentPlayer.PickBox1).addClass('red');

    $.each(catPicsArray, function() {
        $(this).on('mouseover', function() {
            var catName = eval(this.name);
            $('.name').html(catName.Name);
            $('.type').text(catName.Type);
            $('.bio').html(`<i>"${catName.Bio}"</i>`);
            $('.attack').text(catName.Range);
            $('.specialName').text(catName.Special);
            $('.description').html(`<i>"${catName.Description}"</i>`);
            $('.damageAmt').text(catName.Damage);
            $('.strong').text(catName.Strong);
            $('.weak').text(catName.Weak);
        });
    });

    $.each(catPicsArray, function() {
        $(this).on('click', function() {
            var catName = eval(this.name);
            var array1 = currentPlayer.Array;
            var array2 = nextPlayer.Array;
            var box1 = currentPlayer.PickBox1;
            var box2 = currentPlayer.PickBox2;

            if (array1.length < 1 && array2.length === 0) {
                $(currentPlayer.PickBox1).removeClass('red');
                updatePickScreen(catName, currentPlayer, box1);
                $(currentPlayer.PickBox1).addClass('red');
            } else if (array1.length < 1 && array2.length === 1) {
                $(currentPlayer.PickBox1).removeClass('red');
                $(currentPlayer.PickBox2).addClass('red');
                updatePickScreen(catName, currentPlayer, box1);
            } else if (array1.length < 2 && array2.length < 2) {
                switchPlayers();
                box2 = currentPlayer.PickBox2;
                $(currentPlayer.PickBox2).removeClass('red');
                updatePickScreen(catName, currentPlayer, box2);
                $(currentPlayer.PickBox2).addClass('red');
            } else if (array1.length < 2 || array2.length < 2) {
                $(currentPlayer.PickBox2).removeClass('red');
                updatePickScreen(catName, currentPlayer, box2);
            }
        });
    });

    $('#fight').on('click', function(event) {
        if (play1.Array.length < 2 || play2.Array.length < 2) {
            event.preventDefault();
        } else {
            $('#pick-screen').addClass('hide');
            $('#fight-screen').removeClass('hide');
            fightScreen();
        }
    });
}

function fightScreen() {
    var p1Array = play1.Array;
    var p2Array = play2.Array;

    $('#p1-fight1').attr('src', p1Array[0].Image);
    $('#p2-fight1').attr('src', p2Array[0].Image);
    $('#p1-fight2').attr('src', p1Array[1].Image);
    $('#p2-fight2').attr('src', p2Array[1].Image);

    updateFightScreen(play1.Id, p1Array, play1.Index);
    updateFightScreen(play2.Id, p2Array, play2.Index);
    $(currentPlayer.Id).find('.moves').addClass('red');

    $(document).on('keyup', function() {
        var attkId = currentPlayer.Id;
        var oppId = nextPlayer.Id;
        var attkArray = currentPlayer.Array;
        var oppArray = nextPlayer.Array;
        var attkIndex = currentPlayer.Index;
        var oppIndex = nextPlayer.Index;
        var attkClass = currentPlayer.Class;
        var currentCounter = attkArray[attkIndex].Counter;


        if (event.key === '1' && !win) {
            specialReady(currentCounter, currentPlayer);
            moveChoice(attkId, oppId, attkArray, attkIndex, oppArray, oppIndex, 1, attkClass);
        } else if (event.key === '2' && !win) {
            if (currentCounter === 0) {
                attkArray[attkIndex].Counter = 2;
                moveChoice(attkId, oppId, attkArray, attkIndex, oppArray, oppIndex, 2);
            } else {
                $('.message').text(`Your special isn't ready yet!  ${currentCounter} more turns!`);
            }
        } else if (event.key === '3' && !win) {
            if (currentPlayer.Heal === 1 && (attkArray[attkIndex].Hp - attkArray[attkIndex].CurrentHp) !== 0) {
                specialReady(currentCounter, currentPlayer);
                currentPlayer.Heal = 0;
                moveChoice(attkId, oppId, attkArray, attkIndex, oppArray, oppIndex, 3);
            } else if ((attkArray[attkIndex].Hp - attkArray[attkIndex].CurrentHp) === 0) {
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
