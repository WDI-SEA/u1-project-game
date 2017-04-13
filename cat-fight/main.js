var currentPlayer;
var nextPlayer;
var temp;
var p1Cats = [];
var p2Cats = [];
var p1Index = 0;
var p2Index = 0;
var critical;

class cat {
    constructor(name, type, hp, currentHp, attack, special, damage, image) {
        this.Name = name;
        this.Type = type;
        this.Hp = hp;
        this.CurrentHp = currentHp;
        this.Attack = attack;
        this.Special = special;
        this.Damage = damage;
        this.Image = image;
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

function moveChoice(attacker, opponent, attackerArray, attackerIndex, opponentArray, opponentIndex, move, atkClass) {
    var plusDamage = damageRandomizer();
    var multiplyer = critChance();
    var playerCat = attackerArray[attackerIndex];
    var enemyCat = opponentArray[opponentIndex];
    var atkValue = playerCat.Attack + plusDamage;
    var specValue = playerCat.Damage * multiplyer;
    switch (move) {
        case 1:
            enemyCat.CurrentHp = enemyCat.CurrentHp - atkValue;
            $(attacker).find('.big-cat').addClass(atkClass);
            setTimeout(function() {
                $(opponent).find('.big-cat').addClass('damage');
                $(opponent).find('.hp').attr('value', enemyCat.CurrentHp);
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
            break;
        case 2:
            enemyCat.CurrentHp = enemyCat.CurrentHp - specValue;
            $(opponent).find('.hp').attr('value', enemyCat.CurrentHp);
            temp = currentPlayer;
            currentPlayer = nextPlayer;
            nextPlayer = temp;
            break;
        case 3:
            playerCat.CurrentHp = playerCat.CurrentHp + 300;
            $(attacker).find('.hp').attr('value', playerCat.CurrentHp);
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

var blackCat = new cat('Black Cat', 'Witch', 1000, 500, 50, 'Hex', 175, 'images/black-cat.png');
var blueCat = new cat('Baby Blue', 'Adorable', 1000, 500, 50, 'Awwww', 175, 'images/blue-cat.png');
var greyCat = new cat('Grey Cat', 'Sleepy', 1000, 500, 50, 'Purrrr', 175, 'images/grey-cat.png');
var orangeCat = new cat('Oliver', 'Tabby', 1000, 500, 50, 'Maul Face', 175, 'images/orange-cat.png');
var whiteCat = new cat('Senior Chang', 'Siamese', 1000, 500, 50, 'Death Stare', 175, 'images/white-cat.png');
var grumpyCat = new cat('Grumpy Cat', 'Disgruntled', 1000, 500, 50, 'Loathe Everytghing', 175, 'images/grumpy-cat.jpg');

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
                moveChoice('#player1', '#player2', p1Cats, p1Index, p2Cats, p2Index, 1, 'p1attack');
            } else if (currentPlayer === 2) {
                moveChoice('#player2', '#player1', p2Cats, p2Index, p1Cats, p1Index, 1, 'p2attack');
            }
        } else if (event.key === '2') {
            if (currentPlayer === 1) {
                moveChoice('#player1', '#player2', p1Cats, p1Index, p2Cats, p2Index, 2);
            } else if (currentPlayer === 2) {
                moveChoice('#player2', '#player1', p2Cats, p2Index, p1Cats, p1Index, 2);
            }
        } else if (event.key === '3') {
            if (currentPlayer === 1) {
                moveChoice('#player1', '#player2', p1Cats, p1Index, p2Cats, p2Index, 3);
            } else if (currentPlayer === 2) {
                moveChoice('#player2', '#player1', p2Cats, p2Index, p1Cats, p1Index, 3);
            }
        } else if (event.key === '4') {
            if (currentPlayer === 1) {
                moveChoice('#player1', '#player2', p1Cats, p1Index, p2Cats, p2Index, 4);
            } else if (currentPlayer === 2) {
                moveChoice('#player2', '#player1', p2Cats, p2Index, p1Cats, p1Index, 4);
            }
        }
    });

}

$(onPageLoad);
