//slumpa fram en bok att gissa rätt på

function startGame () {
}

async function chooseBook () {
    
    let books = await getAllBooks();
    console.log(books.length);

    if (books.length > 0) {
        let number = randomizeAnwserBook(books);
        let chosenBook = books[number];
        console.log("funkar");
        
    }
    
    //let number = randomizeAnwserBook(books);
    //let chosenBook = books[number];

    //console.log("funkar");
    
}


//regex för att kolla hur många ord som matchar orginaltiteln, hur många utslag regex får i loopen genom titeln, kan lägga rätt ord i en lista
//när alla ord är detsamma har personen rätt
//sätta så att den inte är känsling för stora och små bokstäver

//visa en ledtråd beroende på hur många gissningar personer har gjort, kan göras genom att hålla koll på hur många gånger de har tryckt på gissa-knapp

//gissa rätt kan visas genom animate ease in 

//en ge upp knapp, där allt nollställs
