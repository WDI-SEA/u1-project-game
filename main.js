var currentPlayer;
var nextPlayer;
var temp;
var critical;
var win = false;

class cat {
    constructor(name, type, hp, currentHp, attack, special, damage, counter, image, dead) {
        this.Name = name;
        this.Type = type;
        this.Hp = hp;
        this.CurrentHp = currentHp;
        this.Attack = attack;
        this.Special = special;
        this.Damage = damage;
        this.Counter = counter;
        this.Image = image;
        this.Dead = dead;
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
    temp = currentPlayer;
    currentPlayer = nextPlayer;
    nextPlayer = temp;
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
    $(id).find('.atk').text(`1. Scratch: ${array[index].Attack}`);
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

    // if (counter > 0 && currentPlayer === 1) {
    //     p1Cats[p1Index].Counter = p1Cats[p1Index].Counter - 1;
    // } else if (counter > 0 && currentPlayer === 2) {
    //     p2Cats[p2Index].Counter = p2Cats[p2Index].Counter - 1;
    // }
}

function catDied(array, index) {
    if (array[index].CurrentHp <= 0 && currentPlayer === 1) {
        array[index].Dead = true;
        checkWin(array);
        if (!win) {
            if (index === 0) {
                p2Index = 1;
                updateFightScreen('#player2', p2Cats, p2Index);
            } else {
                p2Index = 0;
                updateFightScreen('#player2', p2Cats, p2Index);
            }
        }
    } else if (array[index].CurrentHp <= 0 && currentPlayer === 2) {
        array[index].Dead = true;
        checkWin(array);
        if (!win) {
            if (index === 0) {
                p1Index = 1;
                updateFightScreen('#player1', p1Cats, p1Index);
            } else {
                p1Index = 0;
                updateFightScreen('#player1', p1Cats, p1Index);
            }
        }
    }
    temp = currentPlayer;
    currentPlayer = nextPlayer;
    nextPlayer = temp;

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
        if (currentPlayer === 1) {
            $('.message').text(`Player 2's cats are dead!  Player 1 wins!!`);
        } else if (currentPlayer === 2) {
            $('.message').text(`Player 1's cats are dead!  Player 2 wins!!`);
        }
    }
}

function moveChoice(attacker, opponent, attackerArray, attackerIndex, opponentArray, opponentIndex, move, atkClass) {
    var plusDamage = damageRandomizer();
    var multiplyer = critChance();
    var playerCat = attackerArray[attackerIndex];
    var enemyCat = opponentArray[opponentIndex];
    var atkValue = Math.floor((playerCat.Attack + plusDamage) * multiplyer);
    var specValue = Math.floor(playerCat.Damage * multiplyer);
    var healValue = playerCat.Hp - playerCat.CurrentHp;

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
                $('.message').text(`${playerCat.Name} hit ${enemyCat.Name} for ${atkValue} damage!`);
            } else if (critical) {
                $('.message').text(`${playerCat.Name} crit ${enemyCat.Name} for ${atkValue} damage!`);
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
                $('.message').text(`${playerCat.Special} hit ${enemyCat.Name} for ${specValue} damage!`);
            } else if (critical) {
                $('.message').text(`${playerCat.Special} crit ${enemyCat.Name} for ${specValue} damage!`);
            }
            break;
        case 3:
            if (healValue > 300) {
                playerCat.CurrentHp = playerCat.CurrentHp + 300;
                $('.message').text(`${playerCat.Name} healed for 300 HP!`);
            } else {
                playerCat.CurrentHp = playerCat.CurrentHp + healValue;
                $('.message').text(`${playerCat.Name} healed for ${healValue}`);
            }
            $(attacker).find('.big-cat').addClass('heal');
            setTimeout(function() {
                $(attacker).find('.big-cat').removeClass('heal');
                $(attacker).find('.hp').attr('value', playerCat.CurrentHp);
            }, 500);
            temp = currentPlayer;
            currentPlayer = nextPlayer;
            nextPlayer = temp;
            break;
        case 4:
            if (attackerIndex === 0) {
                attackerIndex = 1;
                updateFightScreen(attacker, attackerArray, attackerIndex);
                temp = currentPlayer;
                currentPlayer = nextPlayer;
                nextPlayer = temp;
                break;
            } else if (attackerIndex === 1) {
                attackerIndex = 0;
                updateFightScreen(attacker, attackerArray, attackerIndex);
                temp = currentPlayer;
                currentPlayer = nextPlayer;
                nextPlayer = temp;
                break;
            }
    }
}

var blackCat = new cat('Black Cat', 'Witch', 1000, 250, 50, 'Hex', 175, 0, 'images/black-cat.png', false);
var blueCat = new cat('Baby Blue', 'Adorable', 1000, 250, 50, 'Awwww', 175, 0, 'images/blue-cat.png', false);
var greyCat = new cat('Grey Cat', 'Sleepy', 1000, 250, 50, 'Purrrr', 175, 0, 'images/grey-cat.png', false);
var orangeCat = new cat('Oliver', 'Tabby', 1000, 250, 50, 'Maul Face', 175, 0, 'images/orange-cat.png', false);
var whiteCat = new cat('Senior Chang', 'Siamese', 1000, 250, 50, 'Death Stare', 175, 0, 'images/white-cat.png', false);
var grumpyCat = new cat('Grumpy Cat', 'Disgruntled', 1000, 250, 50, 'Loathe Everytghing', 175, 0, 'images/grumpy-cat.jpg', false);

var play1 = new player('Player 1', [], 0, 1, '#player1', 'p1attack', '#p1-c1', '#p1-c2', '#p1-fight1', '#p1-fight2');
var play2 = new player('Player 2', [], 0, 1, '#player2', 'p2attack', '#p2-c1', '#p2-c2', '#p2-fight1', '#p2-fight2');

function onPageLoad() {
    $('#pick-last').on('click', function() {
        $('#title-screen').addClass('hide');
        $('#pick-screen').removeClass('hide');
        currentPlayer = play1;
        nextPlayer = play2;
        pickScreen();
    });
    $('#go-first').on('click', function() {
        $('#title-screen').addClass('hide');
        $('#pick-screen').removeClass('hide');
        currentPlayer = play2;
        nextPlayer = play1;
        pickScreen();
    });
}


function pickScreen() {
    var catPicsArray = $('.cat-pics > img');
    $.each(catPicsArray, function() {
        $(this).on('mouseover', function() {
            var catName = eval(this.name);
            $('.name').text('Name: ' + catName.Name);
            $('.type').text('Type: ' + catName.Type);
        });
    });

    $.each(catPicsArray, function() {
        $(this).on('click', function() {
            var catName = eval(this.name);
            var array1 = currentPlayer.Array;
            var array2 = nextPlayer.Array;
            var box1 = currentPlayer.PickBox1;
            var box2 = currentPlayer.PickBox2;

            if (array1.length < 1 || array2.length < 1) {
                updatePickScreen(catName, currentPlayer, box1);
            } else if (array1.length < 2 && array2.length < 2) {
                switchPlayers();
                box2 = currentPlayer.PickBox2;
                updatePickScreen(catName, currentPlayer, box2);
            } else if (array1.length < 2 || array2.length < 2) {
                updatePickScreen(catName, currentPlayer, box2);
            }
        });
    });

    $('#fight').on('click', function() {
        $('#pick-screen').addClass('hide');
        $('#fight-screen').removeClass('hide');
        fightScreen();
    });
}

function fightScreen() {
    var p1Array = play1.Array;
    var p2Array = play2.Array;

    $('#p1-fight1').attr('src', p1Array[0].Image);
    $('#p2-fight1').attr('src', p2Array[0].Image);
    $('#p1-fight2').attr('src', p1Array[1].Image);
    $('#p2-fight2').attr('src', p2Array[1].Image);

    updateFightScreen(play1.Id, play1.Array, play1.Index);
    updateFightScreen(play2.Id, play2.Array, play2.Index);

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
