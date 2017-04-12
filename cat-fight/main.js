var blackCat = {
    Name: 'Black Cat',
    Type: 'Witch',
    Hp: 1000,
    CurrentHp: 500,
    Attack: 50,
    Special: 'Hex',
    Damage: 175,
    Image: 'images/black-cat.png'
};

var blueCat = {
    Name: 'Baby Blue',
    Type: 'Adorable',
    Hp: 1000,
    CurrentHp: 500,
    Attack: 50,
    Special: 'Awwwww',
    Damage: 175,
    Image: 'images/blue-cat.png'
};

var greyCat = {
    Name: 'Grey Cat',
    Type: 'Sleepy',
    Hp: 1000,
    CurrentHp: 500,
    Attack: 50,
    Special: 'Purrr',
    Damage: 175,
    Image: 'images/grey-cat.png'
};

var orangeCat = {
    Name: 'Oliver',
    Type: 'Tabby',
    Hp: 1000,
    CurrentHp: 500,
    Attack: 50,
    Special: 'Maul Face',
    Damage: 175,
    Image: 'images/orange-cat.png'
};

var whiteCat = {
    Name: 'Senior Chang',
    Type: 'Siamese',
    Hp: 1000,
    CurrentHp: 500,
    Attack: 50,
    Special: 'Tounge Lick',
    Damage: 175,
    Image: 'images/white-cat.png'
};

var grumpyCat = {
    Name: 'Grumpy Cat',
    Type: 'Disgruntled',
    Hp: 1500,
    CurrentHp: 500,
    Attack: 75,
    Special: 'Loathe Everything',
    Damage: 75,
    Image: 'images/grumpy-cat.jpg'
};

var catArray = [blackCat, blueCat, greyCat, orangeCat, whiteCat, grumpyCat];
var currentPlayer;
var nextPlayer;
var p1Cats = [];
var p2Cats = [];
var p1CurrentCat;
var p2CurrentCat;

function onPageLoad() {
    $('#pick-last').on('click', function() {
        $('#title-screen').addClass('hide');
        $('#pick-screen').removeClass('hide');
        currentPlayer = 2;
        nextPlayer = 1;
        pickScreen();
    });
    $('#go-first').on('click', function() {
        $('#title-screen').addClass('hide');
        $('#pick-screen').removeClass('hide');
        currentPlayer = 1;
        nextPlayer = 2;
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
                if (currentPlayer === 1) {
                    p1Cats.push(catName);
                    $('#p1-c1').attr('src', p1Cats[0].Image);
                    currentPlayer = 2;
                } else if (currentPlayer === 2) {
                    p2Cats.push(catName);
                    currentPlayer = 1;
                    $('#p2-c1').attr('src', p2Cats[0].Image);
                }
            } else if (p1Cats.length < 2 || p2Cats.length < 2) {
                if (currentPlayer === 1) {
                    p1Cats.push(catName);
                    $('#p1-c2').attr('src', p1Cats[1].Image);
                    currentPlayer = 2;
                    nextPlayer = 1;
                } else if (currentPlayer === 2) {
                    p2Cats.push(catName);
                    currentPlayer = 1;
                    nextPlayer = 2;
                    $('#p2-c2').attr('src', p2Cats[1].Image);
                }
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
    p1CurrentCat = p1Cats[0];
    p2CurrentCat = p2Cats[0];
    $('#p1-fight-c1').attr('src', p1Cats[0].Image);
    $('#p2-fight-c1').attr('src', p2Cats[0].Image);
    $('#p1-fight-c2').attr('src', p1Cats[1].Image);
    $('#p2-fight-c2').attr('src', p2Cats[1].Image);
    $('#p1-big-cat').attr('src', p1CurrentCat.Image);
    $('#p2-big-cat').attr('src', p2CurrentCat.Image);
    $('#p1-hp').attr('value', p1CurrentCat.CurrentHp).attr('max', p1CurrentCat.Hp);
    $('#p2-hp').attr('value', p2CurrentCat.CurrentHp).attr('max', p2CurrentCat.Hp);
    $('#player-1').find('.fight-type').text(p1CurrentCat.Type);
    $('#player-2').find('.fight-type').text(p2CurrentCat.Type);
    $('#player-1').find('.atk').text(`1. Scratch: ${p1CurrentCat.Attack}`);
    $('#player-2').find('.atk').text(`1. Scratch: ${p2CurrentCat.Attack}`);
    $('#player-1').find('.spec').text(`2. Special: ${p1CurrentCat.Damage}`);
    $('#player-2').find('.spec').text(`2. Special: ${p2CurrentCat.Damage}`);

    $(document).on('keyup', function() {
        var currentCat = eval(`p${currentPlayer}CurrentCat`);
        var opponentCat = eval(`p${nextPlayer}CurrentCat`);
        var currentArray = eval(`p${currentPlayer}Cats`);
        var opponentHp = `#p${nextPlayer}-hp`;
        var currentHp = `#p${currentPlayer}-hp`;
        if (event.key === "1") {
            var atkValue = currentCat.Attack;
            opponentCat.CurrentHp = opponentCat.CurrentHp - atkValue;
            $(opponentHp).attr('value', opponentCat.CurrentHp);
        } else if (event.key === "2") {
            var specValue = currentCat.Special;
            opponentCat.CurrentHp = opponentCat.CurrentHp - specValue;
            $(opponentHp).attr('value', opponentCat.CurrentHp);
        } else if (event.key === "3") {
            currentCat.CurrentHp = currentCat.CurrentHp + 300;
            $(currentHp).attr('value', currentCat.CurrentHp);
        } else if (event.key === "4") {
            if (currentArray[i] === 0) {
                currentCat = currentArray[1];
            } else {
                currentCat = currentArray[0];
            }
            console.log(currentCat);
        }
    });
}

$(onPageLoad);
