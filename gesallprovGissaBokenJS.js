//slumpa fram en bok att gissa rätt på
let chosenBook;
let countGuesses = 0;

//startar spelet, nollställer alla ledtrådar och gissningar
function startGame() {
    document.getElementById("anwser").innerHTML = "";
    document.getElementById("clueOne").innerHTML = "";
    document.getElementById("clueTwo").innerHTML = "";
    document.getElementById("clueThree").innerHTML = "";
    document.getElementById("clueFour").innerHTML = "";
    document.getElementById("guessInput").value = "";
    countGuesses = 0;   
    chooseBook();
}

//använder metod för att hämta ut alla böcker, och slumpa fram en bok
async function chooseBook() {
    
    let books = await getAllBooks();
    //console.log(books.length);

    if (books.length > 0) {
        let number = randomizeAnwserBook(books);
        chosenBook = books[number];
        console.log("funkar");
        console.log(chosenBook);

        document.getElementById("startGameBtn").innerHTML = "Starta nytt spel!";

        return chosenBook;
    }
}

//varifierar om gissningen är rätt, och kallae på metod som ger ledtrådar beroende på hur många gissningar personen har gjort
function guessBook() {
    if (chosenBook != null) {
        let guessTxt = document.getElementById("guessInput").value;
        if (guessTxt != null && guessTxt !== "") {
            if (guessTxt.trim().toLowerCase() === chosenBook.title.trim().toLowerCase()) {
                document.getElementById("anwser").innerHTML = "Rätt svar! Bra jobbat!";
            } else {
                document.getElementById("anwser").innerHTML = "";
                giveHint();
                countGuesses++;
            }
        } else {
            document.getElementById("anwser").innerHTML = "Du måste skriva in en gissning!";
        }
    } else {
        document.getElementById("anwser").innerHTML = "Du måste starta spelet först!";
    }
}

//regex för att kolla hur många ord som matchar orginaltiteln
function checkGuess() {
    let guess = document.getElementById("guessInput").value.trim().toLowerCase();
    let guessArray = guess.split(" ");

    console.log(guessArray);
    
    let title = chosenBook.title.trim().toLowerCase();
    let matchCount = 0;
    let regex = new RegExp("\\b" + guess + "\\b", "g");
    let matches = title.match(regex);

    //för att ett ord som förekommer flera gånger i texten endast ska gå genom regex en gång, läggs varje unikt ord i en ny lista
    let list = [];

    for (let g of guessArray) {
        if (!list.includes(g)) {
            list.push(g);
        }
    }

    //det är endast exakta ord som ska matchas, därav av b, men ordet får förekomma flera gånger och ska då räknas, därav g
    for (let l of list) {
        let r = new RegExp("\\b" + l + "\\b", "g");
        let rMatch = title.match(r);

        if (rMatch) {
           matchCount += rMatch.length; 
        }
    }

    return matchCount;
}

//visa en ledtråd beroende på hur många gissningar personer har gjort
function giveHint() {
    if (countGuesses == 0) {
        document.getElementById("clueOne").innerHTML = checkGuess() + " ord matchar titeln";
    } else if (countGuesses == 1) {
        document.getElementById("clueTwo").innerHTML = chosenBook.clue;
        document.getElementById("clueOne").innerHTML = checkGuess() + " ord matchar titeln";
    } else if (countGuesses >= 2) {
        document.getElementById("clueThree").innerHTML = chosenBook.genre;
        document.getElementById("clueOne").innerHTML = checkGuess() + " ord matchar titeln";
    } else if (countGuesses >= 3) {
        document.getElementById("clueFour").innerHTML = chosenBook.author;
        document.getElementById("clueOne").innerHTML = checkGuess() + " ord matchar titeln";
    }
}

//gissa rätt kan visas genom animate ease in 
