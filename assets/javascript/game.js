$(document).ready(function(){
    $(".lose").hide();
    $(".win").hide();

$(document).keyup(function(){
    $(".anyKey").hide();
});

                                                    // array of the good die young
const twentySevenClub = ["brian jones", "jimi hendrix", "janis joplin", "jim morrison", "kurt cobain", "amy winehouse"];
let randomNumber = Math.floor(Math.random() * twentySevenClub.length);
let wordString = twentySevenClub[randomNumber];     // the string is used for charAt() to find whitespacer for printing underscores or whitespace
let choosenWord = wordString.split("");             // the array of the string is used for everything else
let x = choosenWord.length - 1;                     // - 1 to account for whitespace. x is used to determine if the full word has been guessed!
let arrayOfLetters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
let underScore = [];                                // array where underscores are stored
let strikes = [" X "," X "," X "," X "," X "," X "];                // total guesses 
let winsCounter = 0;                                 // total wins
let lossesCounter = 0;                               // total losses


generateUnderScore();
$(".underScore").append(underScore);
$(".wrongGuess").append(strikes);


$(".resetButton").click(function(){
    // on clicking the "play again" button, most of the screen resets, with the exception of the wins/losses tally (s.t. the score is kept)                                                  
    randomNumber = Math.floor(Math.random() * twentySevenClub.length);
    wordString = twentySevenClub[randomNumber];     // the string is used for charAt() to find whitespacer for printing underscores or whitespace
    choosenWord = wordString.split("");             // the array of the string is used for everything else
    x = choosenWord.length - 1;                     // - 1 to account for whitespace. x is used to determine if the full word has been guessed!
    arrayOfLetters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    underScore = [];                                // array where underscores are stored
    strikes = [" X ", " X ", " X ", " X ", " X ", " X "];   // total guesses
    $(".underScore").empty(); 
    $(".wrongGuess").empty();
    $(".wrongLetters").empty();
    $(".lose").hide();
    $(".win").hide();

    generateUnderScore();
    $(".underScore").append(underScore);
    $(".wrongGuess").append(strikes);
});
    
document.addEventListener("keyup", function(event) {
    event.stopPropagation();
    event.preventDefault();
    console.log(x);
    let char = (String.fromCharCode(event.which).toLowerCase());    // creates character from key event using key code

    if (choosenWord.indexOf(char) > -1 && arrayOfLetters.indexOf(char) > -1) {    // IF GUESS IS RIGHT:
        arrayOfLetters.splice(arrayOfLetters.indexOf(char), 1);             // removes (1) guess from array of characters to stop repeats

        for (var i = 0; i < choosenWord.length; i++) {              // for loop checks array of choosen word for matching characters
            if (choosenWord[i] === char){                           // if they match, 
                underScore[i] = char;                               // underscore in underscore array is replaced by letter
                $(".underScore").empty();                           // HTML div is emptied
                $(".underScore").append(underScore);                // HTML div is replaced with new underScore array 
                x--;                                                // every time a letter is correct, x (which equals the total number of letters of the word) losses 1

                if (x == 0){                                       // so if x = 0, the entire word has been guessed
                    winsCounter++;
                    arrayOfLetters = [];                            // this clears the array of letters so the game stops working once you have won
                    $(".winsTally").empty();
                    $(".winsTally").append("Wins: " + winsCounter);    // update winstally div with win
                    $(".win").show();                               // show you win! div w/ reset button
                }      
            }       
        }
    }
        else if (choosenWord.indexOf(char) < 0 && arrayOfLetters.indexOf(char) > -1) {    // IF GUESS IS WRONG:
        arrayOfLetters.splice(arrayOfLetters.indexOf(char), 1);                     // removes (1) guess from array of characters to stop repeats
        strikes.splice(0,1);                                                        // remove 1 guess from strikes
        $(".wrongGuess").empty();                                                   // clear strikes
        $(".wrongGuess").append(strikes);                                        // append new strikes array (after sliced)
        $(".wrongLetters").append(char + " ");                                   // append wrong char to guessed letters div

        if (strikes.length === 0){
            lossesCounter++;
            arrayOfLetters = [];                                                 // this clears the array of letters so the game stops working once you have lost
            $(".wrongGuess").append(": (");                                      // no more strikes, sad face
            $(".lossesTally").empty();                 
            $(".lossesTally").append("Losses: " + lossesCounter);                // update loses tally with lost game
            $(".lose").show();                                                   // reveal you lose reset button
        }

    }


});

function generateUnderScore (){
    for (var i = 0; i < wordString.length; i++){
        if (wordString.charAt(i) === " "){
            underScore.push("&nbsp;");
        }
        else
            underScore.push(" _ ");
        }

    return underScore;

    };

});
