//metod för slumpad bokrekommendation
//koppla detta till databas också? getallbooks + randomizebook

const books = [
    "The Last Bookshop in London - Madeline Martin",
    "And Then There Were None - Agatha Christie",
    "The Secret History - Donna Tartt",
    "When We Were Orphans - Kazugo Ishiguro",
    "The Princess Bride - William Goldman"
];

function getRandomizeBookRec() {
    let index = Math.floor(Math.random() * 4);
    //document.getElementById("answerRandomBookRec").innerHTML = books[index];
    
    startAnimation(books[index]);
    
}


/*const bookWithGenre = [
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
*/

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
        //console.log(database);
    }

    request.onupgradeneeded = function (event) {
        database = event.target.result;

        objectStore = database.createObjectStore("book", {keyPath: "title"});

        objectStore.createIndex("title", "title");
        objectStore.createIndex("author", "author");
        objectStore.createIndex("genre", "genre");
        objectStore.createIndex("clue", "clue");

        objectStore.transaction.oncomplete = function () {
            addAllBooks();

            console.log(objectStore);
        }   
    }

}

//fylla på böcker vid första initieringen av databasen
function addAllBooks() {
    const transaction = database.transaction("book", "readwrite");

    objectStore = transaction.objectStore("book");

    console.log(bookWithGenres.length);

    for (let book of bookWithGenres) {
        let request = objectStore.add(book);

        request.onsuccess = function () {
            console.log("tillagd bok lyckades" + book.title);
        }

        request.onerror = function () {
            console.log("tillagd bok misslyckadeds" + book.title);
        }
    }
}

let foundBooks = [];

//"hämta ut" alla böcker
async function getAllBooks() {
    /*
    let foundBooks = [];
    
    let request = database.transaction("book").objectStore("book").getAll();

    let books;

    request.onsuccess = function () {
            
        books = request.result;

        //console.log(books);

        for (let book of books) {
            foundBooks.push(book);
        }
        console.log(foundBooks);

        //return foundBooks;

        //asynkront, hinner inte hämta alla
        //return foundBooks;

        return foundBooks;
    }
    */

    //returnAllBooks();

    //async function returnAllBooks() {
        //await getBooksFromDatabase();
        //console.log(foundBooks);
    //request.oncomplete = function () {
        //return foundBooks;
    //}
    //}

    let books = await getDataFromDatabase();

    return books;

}

function getDataFromDatabase() {
    
    let request = database.transaction("book").objectStore("book").getAll();

    let books;

    request.onsuccess = function () {
            
        books = request.result;

        for (let book of books) {
            foundBooks.push(book);
        }
        console.log(foundBooks);
    }
}


//hämtar ut böcker beroende på genre
function getBooksByGenre(genre) {
    let foundBooks = [];
    
    let request = database.transaction("book").objectStore("book").index("genre").getAll(genre);

    let books;

    request.onsuccess = function () {
            
        books = request.result;


        for (let book of books) {
            foundBooks.push(book.title + " - " + book.author);
        }

        let index = randomizeAnwserBook(foundBooks);
        startAnimation(foundBooks[index]);
    
    }

}

//hämtar ut genren som användren skriver in
function getGenre() {
    let genre = document.getElementById("bookGenre").value.trim().toLowerCase();

    if (genre != null && genre !== "") {
        hidePrompt();
        getBooksByGenre(genre);
    }
}

//slumpa genom lista med math
function randomizeAnwserBook(booksResult) {

    if (booksResult.length > 0 ) {
        let length = booksResult.length;
        //length - 1 för att den ska börja vid det första elementet i listan, dvs 0
        let number = Math.floor(Math.random() * length - 1) + 1;
        //document.getElementById("answerRandomBookRec").innerHTML = booksResult[number]; 
        return number;
        //startAnimation(booksResult[number]);
    } else {
        document.getElementById("answerRandomBookRec").innerHTML = "Ojdå, ingen bok hittades";   
    }
    
}


//lägga till objekt i databasen
function addNewBookInDatabase() {    
    let txtTitle = document.getElementById("title").value;
    let txtAuthor = document.getElementById("author").value;
    let txtGenre = document.getElementById("genre").value;

    let newBook = {
        title: txtTitle,
        author: txtAuthor,
        genre: txtGenre
    }

    let request = database.transaction("book", "readwrite").objectStore("book").add(newBook);

    request.onsuccess = function () {
        document.getElementById("title").value = "";
        document.getElementById("author").value = "";
        document.getElementById("genre").value = "";

        window.location.href = "gesallprovRekommendationHTML.html";
        
        console.log("lägga till bok lyckades");
    }

    request.onerror = function () {
        console.log("lägga till bok något gick fel");
    }
}

//animation för svaret

//lägga till i databasen länk till där man kan köpa boken och skriva ut det

function startAnimation (bookName) {

    let answerRandomBookRec = document.getElementById("answerRandomBookRec").innerHTML;

    console.log(answerRandomBookRec);

    if (answerRandomBookRec != null || answerRandomBookRec != "") {
        document.getElementById("answerRandomBookRec").innerHTML = " ";
    }

    let id = 0;

    clearInterval(id);

    id = setInterval(animationBookRec, 30);

    let length = bookName.length;

    let i = 0;

    function animationBookRec () {

        if (i == length) {
            clearInterval(id);
        } else {
            let letter = document.getElementById("answerRandomBookRec").innerHTML += bookName.charAt(i);
            i++;
        }
    }
}



//böckerna som laddas in i databasen
//AI användes för att delvis generera ledtrådar för respektive bok
const bookWithGenres = [
    {title: "The Last Bookshop in London", author: "Madeline Martin", genre: "romans", clue: "Historisk roman utspelad under andra världskriget, med en titel passande för denna hemsida"},
    {title: "And Then There Were None", author: "Agatha Christie", genre: "deckare", clue: "Tio främlingar på en isolerad ö, där någon döljer en mörk hemlighet och ingen går säker"},
    {title: "The Secret History", author: "Donna Tartt", genre: "fiktion", clue: "En grupp elitstudenter dras in i en värld av besatthet, hemligheter och ett mord som förändrar allt"},
    {title: "When We Were Orphans", author: "Kazugo Ishiguro", genre: "deckare", clue: "En detektiv återvänder till sitt förfluta för att lösa mysteriet kring sina föräldrars försvinnande"},
    {title: "Night", author: "Elie Wiesel", genre: "biografi"},
    {title: "The Song of Achilles", author: "Madeline Miller", genre: "romans", clue: "Grekisk mytologi och myterna om Troja får ett nytt sken och berättas ur en annan vinkel"},
    {title: "And the Mountains Echoed", author: "Khaled Hosseini", genre: "fiktion", clue: "Ett syskonpars separation får konsekvenser som sträcker sig över generationer och formar liv långt bortom deras egen"},
    {title: "The Little Shop of Happy Ever After", author: "Jenny Colgan", genre: "romans", clue: "En kvinna lämnar sitt gamla liv bakom sig för att en ny början i en liten bokhandel"},
    {title: "A House in the Sky", author: "Sara Corbett", genre: "biografi", clue: "En ung kvinnas resa genom fångenskap och lidande blir en berättelse om överlevnad, hopp och mänsklig styrka"}
];
