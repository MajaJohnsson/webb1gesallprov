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
    "The Last Bookshop in London - Madeline Martin, romans",
    "And Then There Were None - Agatha Christie, deckare",
    "The Secret History - Donna Tartt, fiktion",
    "When We Were Orphans - Kazugo Ishiguro, deckare",
    "Night - Elie Wiesel, biografi",
    "The Song of Achilles - Madeline Miller, romans",
    "And the Mountains Echoed - Khaled Hosseini, fiktion",
    "The Little Shop of Happy Ever After - Jenny Colgan, romans",
    "A House in the Sky - Sara Corbett, biografi"
];

function getBookByGenre(genre) {

    let booksResult = [];

    for (let i = 0; i < bookWithGenre.length; i++) {
        console.log(bookWithGenre[i].match(genre));
        if (bookWithGenre[i].match(genre) != null) {
            let result = bookWithGenre[i].match(genre);
            booksResult.push(result.input);
        }
    }

    if (booksResult.length > 0 ) {
        let length = booksResult.length;
        //length - 1 för att den ska börja vid det första elementet i listan, dvs 0
        let number = Math.floor(Math.random() * length - 1) + 1;
        document.getElementById("answerRandomBookRec").innerHTML = booksResult[number];   
    } else {
        document.getElementById("answerRandomBookRec").innerHTML = "Ojdå, ingen bok hittades";   
    }
}

function getGenre() {
    let genre = document.getElementById("bookGenre").value.trim().toLowerCase();

    if (genre != null && genre !== "") {
        hidePrompt();
        getBookByGenre(genre);
    }
}

function showPrompt() {
    let prompt = document.getElementById("prompt");
    prompt.show();
}

function hidePrompt() {
    let prompt = document.getElementById("prompt");
    prompt.close();
}

if (!window.indexedDB) {
    alert("Något gick fel vid IndexedDB");
}

let database;

let objectStore;

window.onload = function createDatabase() {
    const request = window.indexedDB.open("Books", 1);

    request.onsuccess = function (event) {
        database = event.target.result;
    }

    request.onupgradeneeded = function (event) {
        database = event.target.result;

        objectStore = database.createObjectStore("book", {keyPath: "title"});

        objectStore.createIndex("title", "title");
        objectStore.createIndex("author", "author");
        objectStore.createIndex("genre", "genre");

        objectStore.transaction.oncomplete = function () {
            addBooks();
        }   
    }

}

function addBooks() {
    const transaction = database.transaction("book", "readwrite");

    objectStore = transaction.objectStore("book");

    for (let book of bookWithGenres) {
        objectStore.add(book);
    }
}

const bookWithGenres = [
    {title: "The Last Bookshop in London", author: "Madeline Martin", genre: "romans"},
    {title: "And Then There Were None", author: "Agatha Christie", genre: "deckare"},
    {title: "The Secret History", author: "Donna Tartt", genre: "fiktion"},
    {title: "When We Were Orphans", author: "Kazugo Ishiguro", genre: "deckare"},
    {title: "Night", author: "Elie Wiesel", genre: "biografi"},
    {title: "The Song of Achilles", author: "Madeline Miller", genre: "romans"},
    {title: "And the Mountains Echoed", author: "Khaled Hosseini", genre: "fiktion"},
    {title: "The Little Shop of Happy Ever After", author: "Jenny Colgan", genre: "romans"},
    {title: "A House in the Sky", author: "Sara Corbett", genre: "biografi"}
];
