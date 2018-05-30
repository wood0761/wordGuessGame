$(document).ready(function(){
    $(".lose").hide();
    $(".win").hide();

$(document).keyup(function(){
    $(".anyKey").hide();
});

                                                    // array of the good die young
var twentySevenClub = ["brian jones", "jimi hendrix", "janis joplin", "jim morrison", "kurt cobain", "amy winehouse"];
var randomNumber = Math.floor(Math.random() * twentySevenClub.length);
var wordString = twentySevenClub[randomNumber];     // the string is used for charAt() to find whitespacer for printing underscores or whitespace
var choosenWord = wordString.split("");             // the array of the string is used for everything else
var x = choosenWord.length - 1;                     // - 1 to account for whitespace. x is used to determine if the full word has been guessed!
var arrayOfLetters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var underScore = [];                                // array where underscores are stored
var char = "";                                       // user input
var strikes = [" X "," X "," X "," X "," X "," X "];                // total guesses 
var winsCounter = 0;                                 // total wins
var lossesCounter = 0;                               // total losses


generateUnderScore(choosenWord);
$(".underScore").append(underScore);
$(".wrongGuess").append(strikes);
keyEvents();

$(".resetButton").click(function(){
    // on clicking the "play again" button, most of the screen resets, with the exception of the wins/losses tally (s.t. the score is kept)                                                  
    twentySevenClub = ["brian jones", "jimi hendrix", "janis joplin", "jim morrison", "kurt cobain", "amy winehouse"];
    randomNumber = Math.floor(Math.random() * twentySevenClub.length);
    wordString = twentySevenClub[randomNumber];     // the string is used for charAt() to find whitespacer for printing underscores or whitespace
    choosenWord = wordString.split("");             // the array of the string is used for everything else
    x = choosenWord.length - 1;                     // - 1 to account for whitespace. x is used to determine if the full word has been guessed!
    arrayOfLetters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    underScore = [];                                // array where underscores are stored
    char = "";                                       // user input
    strikes = [" X ", " X ", " X ", " X ", " X "];   // total guesses
    $(".underScore").empty(); 
    $(".wrongGuess").empty();
    $(".wrongLetters").empty();
    $(".lose").hide();
    $(".win").hide();

    generateUnderScore(choosenWord);
    $(".underScore").append(underScore);
    $(".wrongGuess").append(strikes);
    keyEvents();
});
    
function keyEvents () {
document.addEventListener("keydown", function(event) {
    char = (String.fromCharCode(event.which).toLowerCase());    // creates character from key event using key code

    if (arrayOfLetters.indexOf(char) > -1) {                    // IF GUESS IS RIGHT:
        arrayOfLetters.splice(arrayOfLetters.indexOf(char), 1); // removes (1) guess from array of characters to stop repeats!
         
        for (var i = 0; i < choosenWord.length; i++) {          // for loop checks array of choosen word for matching characters
            if (choosenWord[i] === char){                       // if they match, 
                underScore[i] = char;                           // underscore in underscore array is replaced by letter
                $(".underScore").empty();                       // HTML div is emptied
                $(".underScore").append(underScore);            // HTML div is replaced with new underScore array
                x--;                                            // every time a letter is correct, x (which equals the total number of letters of the word) losses 1
                    if (x === 0){                               // so if x = 0, the entire word has been guessed
                        winsCounter++;
                        $(".winsTally").empty();
                        $(".winsTally").append("Wins: " + winsCounter);    // update winstally div with win
                        $(".win").show();                       // show you win! div w/ reset button
                    }                                         
            }      
        }

        if (choosenWord.indexOf(char) < 0) {                    // IF GUESS IS WRONG:
            strikes.splice(0,1);                                // remove 1 guess from strikes
            $(".wrongGuess").empty();                           // clear strikes
            $(".wrongGuess").append(strikes);                   // append new strikes array (after sliced)
            $(".wrongLetters").append(char + " ");                    // append wrong char to guessed letters div
            if (strikes.length === 0){
                lossesCounter++;
                arrayOfLetters = [];
                $(".wrongGuess").append(": (");                 // no more strikes, sad face
                $(".lossesTally").empty();                 
                $(".lossesTally").append("Losses: " + lossesCounter);        // update loses tally with lost game
                $(".lose").show();                              // reveal you lose reset button
            }
        }
    }
    
});
}

function generateUnderScore (choosenWord){
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
