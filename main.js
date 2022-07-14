
const feedback = document.getElementById("feedback")
const board = document.getElementById("board");
const remaining = document.getElementById("remaining");
const start = document.getElementById("start");
const startmenu = document.getElementById("startmenu");
const overlay = document.getElementById("overlay");
const end = document.getElementById("endGame");
const tdcollection = [].slice.call(document.getElementsByTagName("td")); //document.getelements returns htmlcollection, this is a way to make that an array!
let shotsText = document.getElementById("shots")


start.onclick = () =>
{
/*
    let occupiedTiles = [];
*/
    let ships = [];
    let shots = 10;


    setupScreen();
    placeShips();
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
       2x 4
       3x3
       4x2
        */
        let ship1 = ["1A","2A","3A","4A"];
        let ship2 = ["1B","2B","3B","4B"];
        let ship3 = ["1I","1J"];

        ships.push(ship1,ship2, ship3);
        console.log(ships)

    //occupiedTiles variable will be used to track which tiles are already taken in the generation of ships!


    }

    function setupScreen() {
        startmenu.hidden = true;
        board.hidden= false;
        overlay.hidden = false;
        remaining.innerHTML = 3;
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