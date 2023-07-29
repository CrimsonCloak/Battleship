
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
const restartbutton = document.getElementById("restart");
const tdcollection = [].slice.call(document.getElementsByTagName("td")); //document.getelements returns htmlcollection, this is a way to make that an array!
let shotsText = document.getElementById("shots");
let music; let boosh1; let boosh2;



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
                     " Every ship occupies a number of consecutive squares on the field, either horizontally or vertically." +
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
    restartbutton.onclick = () =>
    {
        location.reload()
    }



    function setUpMusic() {
        music = new Audio("sounds/Funky_music.mp3");
        music.play();
        boosh1 = new Audio("sounds/Boosh.mp3")
        boosh2 = new Audio("sounds/Actually_strong_boosh.mp3");
    }

    function gameOver() {
        music.muted; //please github???
        board.hidden = true
        overlay.hidden = true
        end.insertAdjacentHTML("afterbegin",
            "<h1>You lost. Better luck next time...</h1>")
        end.hidden= false

    }

    function gameWon() {
        music.pause();
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
                Math.random() <= 0.5 ? boosh1.play(): boosh2.play();
                giveFeedback("You hit!");
                tile.style.backgroundColor = "green";
                tile.disabled;
                ships[i].splice(ships[i].indexOf(target), 1);

                if(ships[i].length === 0) {
                    console.log(ships.splice(ships.indexOf(ships[i]), 1));
                    console.log(ships)
                }
                if (ships.length === 0)
                    gameWon();

            } }

               if(hit === false){

                   giveFeedback("You missed...");
                    shots -= 1;
                    tile.style.backgroundColor = "red";
                    tile.disabled;
                   if (shots === 0)
                       gameOver();
               }

                 shotsText.innerHTML = shots;
                 remaining.innerHTML = ships.length;
    }

    function placeShips() {
 /*       ships:
       IDEE VOOR SCHEPEN
       Kies richting boot (horizontaal/verticaal)
       Kies random rij/kolom en begin met de grote boot (6)
       Doe checks of dit past (randen, collisions met andere boten,...)
       "Plaats" finaal de boot, maak er een ship-variabele van en push die dan in de ships array
        */
   /*   let ship1 = ["1A","2A","3A","4A"];
        let ship2 = ["1B","2B","3B","4B"];
        let ship3 = ["1I","1J"];
        let ship4 = ["7C","7D","7E"]*/

        /*let carrier = ["I2","I3","I4","I5","I6"];
        let battleship1 = ["C1","C2","C3","C4"];
        let battleship2 = ["G8","H8","I8","J8"];
        let destroyer1 = ["J4","J5","J6"]
        let destroyer2 = ["F6","F7","F8"]
        let destroyer3 = ["A6","B6","C6"]
        let submarine1 = ["E2","E3","E4"]
        let submarine2 = ["A8","B8","C8"]
        let submarine3 = ["F1","G1","H1"]
        let submarine4 = ["E5","F5","G5"]
        let patrolboat1 = ["B1","B2"]
        let patrolboat2 = ["G3","H3"]*/
       /* ships.push(carrier,battleship1,battleship2);*/
        ships.push(
            ["2I","3I","4I","5I","6I"],
            ["1C","2C","3C","4C"],
            ["8G","8H","8I","8J"],
            ["4J","5J","6J"],
            ["6F","7F","8F"],
            ["6A","6B","6C"],
            ["2E","3E","4E"],
            ["8A","8B","8C"],
            ["1F","1G","1H"],
            ["5E","5F","5G"],
            ["1B","2B"],
            ["3G","3H"]
        )
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
