
const feedback = document.getElementById("feedback")
const board = document.getElementById("board");
const remaining = document.getElementById("remaining");
const start = document.getElementById("start");
const rules = document.getElementById("rules");
const startmenu = document.getElementById("startmenu");
const overlay = document.getElementById("overlay");
const end = document.getElementById("endGame");
const explanation = document.getElementById("explanation");
const returnbutton = document.getElementById("return");
const tdcollection = [].slice.call(document.getElementsByTagName("td")); //document.getelements returns htmlcollection, this is a way to make that an array!
let shotsText = document.getElementById("shots");




rules.onclick = () =>
{
    setupInfoScreen();


    function setupInfoScreen() {
        startmenu.hidden = true;
        returnbutton.hidden= false;
        if(explanation.innerHTML === "")
        {
        explanation.insertAdjacentHTML( "afterbegin",

                    "<h3> Goal </h3>" +
                    "<p>You are at war with a rivalling fleet commander. Take down his ships and prove you are the best captain there ever will be!</p>" +
                   "<h3>Targets </h3> <p>Your adversary commands the following ships: " +
                       "<ul><li>1 Carrier (5 tiles)</li><li>2 Battleships (4 tiles)</li><li>3 Destroyers (3 tiles)</li><li> 4 Submarines (3 tiles)</li><li>2 Patrol boats (2 tiles)</li> </ul> </p>" +
                    "<h3>Rules</h3>" +
                     "<p>You are allowed to miss 9 shots, but the 10th miss will mean your demise." +
                     "Every ship occupies a number of consecutive squares on the field, either horizontally or vertically." +
                     "</p> "
        );
        }
        explanation.hidden=false;


    }
}

returnbutton.onclick = () =>
{
    startmenu.hidden = false;
    returnbutton.hidden = true;
    explanation.hidden = true;
}


start.onclick = () =>
{
/*
    let occupiedTiles = [];
*/
    let ships = [];
    let shots = 10;

    placeShips();
    setupPlayScreen();
    setUpMusic();
    const tilesCollection = [].slice.call(document.getElementsByClassName("tile"));



    function setUpMusic() {
        startmenu.insertAdjacentHTML("afterbegin",
            "\n" +
            "<audio id='music' autoplay=\"autoplay\">\n" +
            "    <source src=\"sounds/Funky%20music.mp3\" />\n" +
            "</audio>"
        )
    }

    function gameOver() {
       document.getElementById("music").pause();
        board.hidden = true
        overlay.hidden = true
        end.insertAdjacentHTML("afterbegin",
            "<h1>You lost. Such a shame honestly...</h1>")
        end.hidden= false


    }

    function gameWon() {
        document.getElementById("music").pause();
        board.hidden = true
        overlay.hidden = true
        end.insertAdjacentHTML("afterbegin",
            "<h1>You won! Congratulations!</h1>")
        end.hidden= false
    }

    function fireShot(tile) {
        let target = tile.parentNode.parentNode.id + tile.parentNode.className;
        let hit = false;
        for(let i =0; i < ships.length ; i++) {

            if (ships[i].indexOf(target) !== -1) {
                hit = true;
                giveFeedback("You hit!")
                tile.style.backgroundColor = "green";
                tile.disabled;
                //find a way to filter the selected tile and remove it from the array
                /*ships[i].splice(ships[i].indexOf(target), 1);*/
                console.log(ships[i].splice(ships[i].indexOf(target), 1));

                if(ships[i].length === 0)
                    ships.splice(ships.indexOf(ships[i]), 1);
                console.log(`Destroyed a ship! ${ships.length} left to destroy!`)

                if (ships.length === 0)
                    gameWon();

            } }

               if(hit === false){

                   giveFeedback("You missed...");
                    shots -= 1;
                    tile.style.backgroundColor = "red";
                    tile.disabled;
               }

                 shotsText.innerHTML = shots;
                 remaining.innerHTML = ships.length;
        if (shots === 0)
            gameOver();
    }

    function placeShips() {
 /*       ships:
       1x6
       2x4
       3x3
       4x2


       IDEE VOOR SCHEPEN
       Kies richting boot (horizontaal/verticaal)
       Kies random rij/kolom en begin met de grote boot (6)
       Doe checks of dit past (randen, collisions met andere boten,...)
       "Plaats" finaal de boot, maak er een ship-variabele van en push die dan in de ships array
        */
        let ship1 = ["1A","2A","3A","4A"];
        let ship2 = ["1B","2B","3B","4B"];
        let ship3 = ["1I","1J"];
        let ship4 = ["7C","7D","7E"]
        ships.push(ship1,ship2, ship3, ship4);
        console.log(ships)

    //occupiedTiles variable will be used to track which tiles are already taken in the generation of ships!


    }

    function setupPlayScreen() {
        startmenu.hidden = true;
        board.hidden= false;
        overlay.hidden = false;
        remaining.innerHTML = ships.length.toString();
        tdcollection.forEach(element =>
            element.insertAdjacentHTML("afterbegin",
                "<button class='tile'></button>"
            ));

    }
   async function giveFeedback(text) {
        feedback.innerHTML = text;
        await(sleep(2000))
        feedback.innerHTML = "";

    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }



    tilesCollection.forEach(element =>
        element.onclick = () => {
        fireShot(element);
        element.setAttribute("disabled","")

        }

    )







}