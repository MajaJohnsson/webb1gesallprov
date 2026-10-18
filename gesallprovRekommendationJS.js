//metod för slumpad bokrekommendation

const books = [
    "The Last Bookshop in London - Madeline Martin",
    "And Then There Were None - Agatha Christie",
    "The Secret History - Donna Tartt",
    "When We Were Orphans - Kazugo Ishiguro",
    "The Princess Bride - William Goldman"
];

function getRandomizeBookRec() {
    let index = Math.floor(Math.random() * 4);
    document.getElementById("answerRandomBookRec").innerHTML = books[index];
}

//Idé till specifik bokrekommendation är användning av databas och någon form av enum för kategori av bok ex skräck
//klicka på knapp --> pop up eller formulär på en annan sida --> fyll i --> skickas tillbaka --> få svar
//undra om man kan få någon form av animering när svaret kommer fram

const bookWithGenre = [
    "The Last Bookshop in London - Madeline Martin, Historia",
    "And Then There Were None - Agatha Christie, Deckare",
    "The Secret History - Donna Tartt, Roman",
    "When We Were Orphans - Kazugo Ishiguro, Deckare",
    "The Princess Bride - William Goldman, Romans"
];

function getBookByGenre() {

    let booksResult = [];

    for (let i = 0; i < bookWithGenre.length; i++) {

        if (bookWithGenre[i].match("Historia") != null) {
            let result = bookWithGenre[i].match(/Historia/);
            booksResult.push(result);
            console.log(result);
            document.getElementById("answerRandomBookRec").innerHTML = result;   
        } else {
            document.getElementById("answerRandomBookRec").innerHTML = "Inget resultat hittades!";
        }

    }

    //for loop med alla object i booksresult
}