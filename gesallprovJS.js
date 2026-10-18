//metod för start bildspel
const pictures = [
    "Bilder/BuryOurBonesInTheMidnightSoil.png",
    "Bilder/Educated.png",
    "Bilder/IfCatsDisappeardFromTheWorld.png",
    "Bilder/Piranesi.png",
    "Bilder/BeforeTheCoffeeGetsCold.png"
];

const textPictures = [
    "Denna bok ger en ny twist på odödlighet och hur det till slut påverkar ens mänsklighet. Betyg: 4/5",
    "En fascinerande och känslosam inblick i en livhistoria om utbildningen påverkan. Betyg: 5/5",
    "Hur mycket är du villig att offra för att leva en dag till? Betyg: 4/5",
    "En av de konstigaste och mest förvirrande böcker jag någonsin har läst. Jag skulle inte kunna förklara den om jag försökte. Betyg: 5/5",
    "Hur länge kan man dröja sig kvar i dåtiden utan att offra nuet? Betyg: 3/5"
];

window.addEventListener("load", animatePictures);

function animatePictures() {
    let pictureAnimation = document.querySelector("#pictureAnimationInterval");

    let i = 0;

    setInterval(changePicture, 10000);

    //för att byta bilderna i bildspelet
    async function changePicture() {
        //om man har gått igenom hela listan, sätt i till 0 för att börja om
        //OBS på sista bilden blir det som två loopar så att den väntar 10 sek innnan den byter
        //OBS finns funktion för att styra bildbyten med pilar
        if (i == pictures.length) {
            i = 0;
        }
        //annars byt bild som vanligt 
        else {
            pictureAnimation.src = pictures[i];
            document.getElementById("descriptionPicture").innerHTML = textPictures[i];
            i++;
        }
    }
}
