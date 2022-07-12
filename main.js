

const board = document.getElementById("board");
const start = document.getElementById("start");
const startmenu = document.getElementById("startmenu");
const overlay = document.getElementById("overlay");
const end = document.getElementById("endGame");
const tdcollection = [].slice.call(document.getElementsByTagName("td")); //document.getelements returns htmlcollection, this is a way to make that an array!
/*tdcollection.forEach(element => console.log(element));*/
let shotsText = document.getElementById("shots")
//get buttons using class getelementsbyclass and put them in an array?
start.onclick = () =>
{
    let ships = [];
    let shots = 10;


    placeShips();

    startmenu.insertAdjacentHTML("afterbegin",
        "\n" +
        "<audio id='music' autoplay=\"autoplay\">\n" +
        "    <source src=\"sounds/Funky%20music.mp3\" />\n" +
        "</audio>"
        )
    startmenu.hidden = true;
    board.hidden= false;
    overlay.hidden = false;
    tdcollection.forEach(element =>
        element.insertAdjacentHTML("afterbegin",
            "<button class='tile'></button>"
        ));



    const tilesCollection = [].slice.call(document.getElementsByClassName("tile"));





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
        //kijken of de id + classname (bv 1A) te vinden is in de array ships
        //uit de element concatenatie maken van ID en class en dan zoeken of die er inzit met indexof?

        if(ships.indexOf(target) !== -1)
        {
            console.log("You hit!")
            tile.style.backgroundColor = "green";
            tile.disabled;
            //find a way to filter the selected tile and remove it from the array
            ships.splice(ships.indexOf(target), 1);

            if(ships.length===0)
                gameWon();
        }

        else
        {
            console.log("You missed...")
            shots -=1;
            tile.style.backgroundColor = "red";
            tile.disabled;
        }

        shotsText.innerHTML = shots;
        if(shots === 0)
            gameOver();


    }

    function placeShips()
    {
     //for this example, we will put a 4-tile long boat from the topleft corner going right
  ships.push("1A","2A","3A","4A");
    }

    tilesCollection.forEach(element =>
        element.onclick = () => {
        fireShot(element);
        element.setAttribute("disabled","")

        }

    )







}