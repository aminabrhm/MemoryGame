/*
 * Create a list that holds all of your cards
 */
 /*let objects = [{document.getElementsByClassName("fa fa-diamond").innerHTML="diamond" };
 {document.getElementsByClassName("fa fa-diamond").innerHTML="diamond" },
{document.getElementsByClassName("fa fa-paper-plane-o").innerHTML="plane" },
{document.getElementsByClassName("fa fa-paper-plane-o").innerHTML="plane" },
{document.getElementsByClassName("fa fa-anchor").innerHTML="anchor" },
{document.getElementsByClassName("fa fa-anchor").innerHTML="anchor" },
{document.getElementsByClassName("fa fa-bolt").innerHTML="bolt" },
{document.getElementsByClassName("fa fa-bolt").innerHTML="bolt" },
{document.getElementsByClassName("fa fa-cube").innerHTML="cube" },
{document.getElementsByClassName("fa fa-cube").innerHTML="cube" },
{document.getElementsByClassName("fa fa-leaf").innerHTML="leaf" },
{document.getElementsByClassName("fa fa-leaf").innerHTML="leaf" },
{document.getElementsByClassName("fa fa-bicycle").innerHTML="bicycle" },
{document.getElementsByClassName("fa fa-bicycle").innerHTML="bicycle" },
{document.getElementsByClassName("fa fa-bomb").innerHTML="bomb" },
{document.getElementsByClassName("fa fa-bomb").innerHTML="bomb" },
]*/
let objects = ['diamond', 'diamond', 'paper-plane-o', 'paper-plane-o', 'anchor', 'anchor', 'bolt', 'bolt', 'paper-plane-o', 'paper-plane-o', 'cube', 'cube', 'leaf', 'leaf', 'bicycle', 'bicycle','bomb','bomb'],


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

     // Useful selectors shortened
     $container = $('.container'),
     $scorePanel = $('.score-panel'),
     $rating = $('.fa-star'),
     $moves = $('.moves'),
     $timer = $('.timer'),
     $restart = $('.restart'),
     $deck = $('.deck'),

     // Set variables to shorten code
     nowTime,
     allOpen = [],
     match = 0,
     second = 0,
     moves = 0,
     wait = 420,
     totalCard = deck.length / 2,

     // Scoring system from 1 to 3 stars to shorten code
     stars3 = 10,
     stars2 = 15,
     star1 = 25;

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
//loop through each card and create its HTML

function init() {

    // The shuffle function shuffles the objects array
    let allCards = shuffle(objects);
    $deck.empty();

    // The game starts with no matching cards and zero moves
    match = 0;
    moves = 0;
    $moves.text('0');

    // A for loop creates 16  <li> tags with the class of card for every <i> tag
    // A class of fa fa- and a name of each object from the objects=[] array
    for (let i = 0; i < allCards.length; i++) {
        $deck.append($('<li class="card"><i class="fa fa-' + allCards[i] + '"></i></li>'))
    }
    addCardListener();

    // Enables the timer to reset to 0 when the game is restarted
    resetTimer(nowTime);
    second = 0;
    $timer.text(`${second}`)
    initTime();
}

function rating(moves) {
    let rating = 3;
    if (moves > stars3 && moves < stars2) {
        $rating.eq(3).removeClass('fa fa-star').addClass('fa fa-star-o');
    } else if (moves > stars2 && moves < star1) {
        $rating.eq(2).removeClass('fa fa-star').addClass('fa fa-star-o');
    } else if (moves > star1) {
        $rating.eq(1).removeClass('fa fa-star').addClass('fa fa-star-o');
        rating = 1;
    }
    return { score: rating };
}

// Add boostrap modal alert window showing time, moves, score it took to finish the game, toggles when all pairs are matched.
function gameOver(moves, score) {
    $('#winnerText').text(`In ${second} seconds, you did a total of ${moves} moves with a score of ${score}. Well done!`);
    $('#winnerModal').modal('toggle');
}

// Clicking on the button located on the top right of the game, enables the cards too be reset
$restart.bind('click', function (confirmed) {
    if (confirmed) {
        $rating.removeClass('fa fa-star-o').addClass('fa fa-star');
        init();
    }
});
let addCardListener = function () {

    // With the following, the card that is clicked on is flipped
    $deck.find('.card').bind('click', function () {
        let $this = $(this);

        if ($this.hasClass('card show') || $this.hasClass('card match')) { return true; }

        let card = $this.context.innerHTML;
        $this.addClass('card open show');
        allOpen.push(card);

        // Compares cards if they matched
        if (allOpen.length > 1) {
            if (card === allOpen[0]) {
                $deck.find('.card.open').addClass('card match');
                setTimeout(function () {
                    $deck.find('card open').removeClass('card open show');
                }, wait);
                match++;

                // If cards are not matched, there is a delay of 630ms, and the cards will turn back cover up.
            } else {
                $deck.find('.card.open').addClass('card notmatch');
                setTimeout(function () {
                    $deck.find('.card.open').removeClass('card open show');
                }, wait / 1.5);
            }

            // The allOpen array specifies all added cards facing up
            allOpen = [];

            // Increments the number of moves by one only when two cards are matched or not matched
            moves++;

            // The number of moves is added to the rating() function that will determine the star score
            rating(moves);

            // The number of moves are added to the modal HTML alert
            $moves.html(moves);
        }

        // The game is finished once all cards have been matched, with a short delay
        if (totalCard === match) {
            rating(moves);
            let score = rating(moves).score;
            setTimeout(function () {
                gameOver(moves, score);
            }, 500);
        }
    });
}

// Initiates the timer as soon as the game is loaded
function initTime() {
    nowTime = setInterval(function () {
        $timer.text(`${second}`)
        second = second + 1
    }, 1000);
}

// Resets the timer when the game ends or is restarted
function resetTimer(timer) {
    if (timer) {
        clearInterval(timer);
    }
}

init();
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
