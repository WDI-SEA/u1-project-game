var currentPlayer;
var nextPlayer;
var temp;
var p1Cats = [];
var p2Cats = [];
var p1Index = 0;
var p2Index = 0;
var p1Heal = 1;
var p2Heal = 1;
var critical;

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

function updatePickScreen(catName, box1, box2, index) {
    if (currentPlayer === 1) {
        p1Cats.push(catName);
        $(box1).attr('src', p1Cats[index].Image);
        currentPlayer = 2;
        nextPlayer = 1;
    } else if (currentPlayer === 2) {
        p2Cats.push(catName);
        currentPlayer = 1;
        nextPlayer = 2;
        $(box2).attr('src', p2Cats[index].Image);
    }
}

function updateFightScreen(id, array, index) {
    $(id).find('.big-cat').attr('src', array[index].Image);
    $(id).find('.hp').attr('value', array[index].CurrentHp).attr('max', array[index].Hp);
    $(id).find('.fight-type').text(array[index].Type);
    $(id).find('.atk').text(`1. Scratch: ${array[index].Attack}`);
    $(id).find('.spec').text(`2. Special: ${array[index].Damage}`);
    if (id === '#player1') {
        p1Index = index;
    }
    if (id === '#player2') {
        p2Index = index;
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

function specialReady(counter) {
    if (counter > 0 && currentPlayer === 1) {
        p1Cats[p1Index].Counter = p1Cats[p1Index].Counter - 1;
    } else if (counter > 0 && currentPlayer === 2) {
        p2Cats[p2Index].Counter = p2Cats[p2Index].Counter - 1;
    }
}

function catDied(array, index) {
    if (array[index].CurrentHp < 0 && currentPlayer === 1) {
        if (index === 0) {
            // $('.message').text(`${array[index].Name} has died!`);
            p2Index = 1;
            updateFightScreen('#player2', p2Cats, p2Index);
        } else {
            // $('.message').text(`${array[index].Name} has died!`);
            p2Index = 0;
            updateFightScreen('#player2', p2Cats, p2Index);
        }
    } else if (array[index].CurrentHp < 0 && currentPlayer === 2) {
        if (index === 0) {
            // $('.message').text(`${array[index].Name} has died!`);
            p1Index = 1;
            updateFightScreen('#player1', p1Cats, p1Index);
        } else {
            // $('.message').text(`${array[index].Name} has died!`);
            p1Index = 0;
            updateFightScreen('#player1', p1Cats, p1Index);
        }
    }
}

function checkDead(array, index) {
    if (index === 0) {
        return array[1].Dead;
    } else {
        return array[0].Dead;
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
            temp = currentPlayer;
            currentPlayer = nextPlayer;
            nextPlayer = temp;
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
                $('.message').text(`${playerCat.Special} hit ${enemyCat.Name} for ${atkValue} damage!`);
            } else if (critical) {
                $('.message').text(`${playerCat.Special} crit ${enemyCat.Name} for ${atkValue} damage!`);
            }
            temp = currentPlayer;
            currentPlayer = nextPlayer;
            nextPlayer = temp;
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

var blackCat = new cat('Black Cat', 'Witch', 1000, 1000, 50, 'Hex', 175, 0, 'images/black-cat.png', false);
var blueCat = new cat('Baby Blue', 'Adorable', 1000, 1000, 50, 'Awwww', 175, 0, 'images/blue-cat.png', false);
var greyCat = new cat('Grey Cat', 'Sleepy', 1000, 1000, 50, 'Purrrr', 175, 0, 'images/grey-cat.png', false);
var orangeCat = new cat('Oliver', 'Tabby', 1000, 1000, 50, 'Maul Face', 175, 0, 'images/orange-cat.png', false);
var whiteCat = new cat('Senior Chang', 'Siamese', 1000, 1000, 50, 'Death Stare', 175, 0, 'images/white-cat.png', false);
var grumpyCat = new cat('Grumpy Cat', 'Disgruntled', 1000, 1000, 50, 'Loathe Everytghing', 175, 0, 'images/grumpy-cat.jpg', false);

function onPageLoad() {
    $('#pick-last').on('click', function() {
        $('#title-screen').addClass('hide');
        $('#pick-screen').removeClass('hide');
        currentPlayer = 1;
        nextPlayer = 2;
        pickScreen();
    });
    $('#go-first').on('click', function() {
        $('#title-screen').addClass('hide');
        $('#pick-screen').removeClass('hide');
        currentPlayer = 2;
        nextPlayer = 1;
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
            if (p1Cats.length < 1 || p2Cats.length < 1) {
                updatePickScreen(catName, '#p1-c1', '#p2-c1', 0);
            } else if (p1Cats.length < 2 && p2Cats.length < 2) {
                temp = currentPlayer;
                currentPlayer = nextPlayer;
                nextPlayer = temp;
                updatePickScreen(catName, '#p1-c2', '#p2-c2', 1);
            } else if (p1Cats.length < 2 || p2Cats.length < 2) {
                updatePickScreen(catName, '#p1-c2', '#p2-c2', 1);
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
    $('#p1-fight1').attr('src', p1Cats[0].Image);
    $('#p2-fight1').attr('src', p2Cats[0].Image);
    $('#p1-fight2').attr('src', p1Cats[1].Image);
    $('#p2-fight2').attr('src', p2Cats[1].Image);

    updateFightScreen('#player1', p1Cats, p1Index);
    updateFightScreen('#player2', p2Cats, p2Index);

    $(document).on('keyup', function() {
        if (event.key === '1') {
            if (currentPlayer === 1) {
                specialReady(p1Cats[p1Index].Counter);
                moveChoice('#player1', '#player2', p1Cats, p1Index, p2Cats, p2Index, 1, 'p1attack');
            } else if (currentPlayer === 2) {
                specialReady(p2Cats[p2Index].Counter);
                moveChoice('#player2', '#player1', p2Cats, p2Index, p1Cats, p1Index, 1, 'p2attack');
            }
        } else if (event.key === '2') {
            if (currentPlayer === 1) {
                if (p1Cats[p1Index].Counter === 0) {
                    p1Cats[p1Index].Counter = 2;
                    moveChoice('#player1', '#player2', p1Cats, p1Index, p2Cats, p2Index, 2);
                } else {
                    $('.message').text(`Your special isn't ready yet!  ${p1Cats[p1Index].Counter} more turns!`);
                }
            } else if (currentPlayer === 2) {
                if (p2Cats[p2Index].Counter === 0) {
                    p2Cats[p2Index].Counter = 2;
                    moveChoice('#player2', '#player1', p2Cats, p2Index, p1Cats, p1Index, 2);
                } else {
                    $('.message').text(`Your special isn't ready yet!  ${p2Cats[p2Index].Counter} more turns!`);
                }
            }
        } else if (event.key === '3') {
            if (currentPlayer === 1) {
                if (p1Heal === 1 && (p1Cats[p1Index].Hp - p1Cats[p1Index].CurrentHp) !== 0) {
                    specialReady(p1Cats[p1Index].Counter);
                    moveChoice('#player1', '#player2', p1Cats, p1Index, p2Cats, p2Index, 3);
                    p1Heal = 0;
                } else if ((p1Cats[p1Index].Hp - p1Cats[p1Index].CurrentHp) === 0) {
                    $('.message').text(`You're at max health!`);
                } else {
                    $('.message').text(`You've already use your heal!`);
                }
            } else if (currentPlayer === 2) {
                if (p2Heal === 1 && (p2Cats[p2Index].Hp - p2Cats[p2Index].CurrentHp) !== 0) {
                    specialReady(p2Cats[p2Index].Counter);
                    moveChoice('#player2', '#player1', p2Cats, p2Index, p1Cats, p1Index, 3);
                    p1Heal = 0;
                } else if ((p2Cats[p2Index].Hp - p2Cats[p2Index].CurrentHp) === 0) {
                    $('.message').text(`You're at max health!`);
                } else {
                    $('.message').text(`You've already use your heal!`);
                }
            }
        } else if (event.key === '4') {
            if (currentPlayer === 1 && !checkDead(p1Cats, p1Index)) {
                specialReady(p1Cats[p1Index].Counter);
                moveChoice('#player1', '#player2', p1Cats, p1Index, p2Cats, p2Index, 4);
            } else if (currentPlayer === 1 && checkDead(p1Cats, p1Index)) {
                $('.message').text(`Can't switch!  Your other cat is dead!`);
            } else if (currentPlayer === 2 && !checkDead(p2Cats, p2Index)) {
                specialReady(p2Cats[p2Index].Counter);
                moveChoice('#player2', '#player1', p2Cats, p2Index, p1Cats, p1Index, 4);
            } else if (currentPlayer === 2 && checkDead(p2Cats, p2Index)) {
                $('.message').text(`Can't switch!  Your other cat is dead!`);
            }
        }
    });

}

$(onPageLoad);
