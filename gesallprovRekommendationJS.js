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
    "The Last Bookshop in London - Madeline Martin, Romans",
    "And Then There Were None - Agatha Christie, Deckare",
    "The Secret History - Donna Tartt, Fiktion",
    "When We Were Orphans - Kazugo Ishiguro, Deckare",
    "Night - Elie Wiesel, Biografi",
    "The Song of Achilles - Madeline Miller, Romans",
    "And the Mountains Echoed - Khaled Hosseini, Fiktion",
    "The Little Shop of Happy Ever After - Jenny Colgan, Romans",
    "A House in the Sky - Sara Corbett, Biografi"
];

function getBookByGenre(genre) {

    let booksResult = [];

    for (let i = 0; i < bookWithGenre.length; i++) {
        if (bookWithGenre[i].match(/Deckare/) != null) {
            let result = bookWithGenre[i].match(/Deckare/);
            booksResult.push(result.input);
        }
    }

    if (booksResult.length >= 0) {
        let length = booksResult.length;
        //length - 1 för att den ska börja vid det första elementet i listan, dvs 0
        let number = Math.floor(Math.random() * length - 1) + 1;
        document.getElementById("answerRandomBookRec").innerHTML = booksResult[number];   
    } else {
        document.getElementById("answerRandomBookRec").innerHTML = "Ojdå, ingen bok hittades";   
    }
}

function getGenre() {
    let genre = prompt("Skriv in den genre på bok du letar efter!");

    if (genre != null) {
        getBookByGenre(genre);
    }
}
