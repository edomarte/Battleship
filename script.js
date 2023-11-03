const ships = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];
const shipsId = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
var ships1 = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];
var ships1Orientation = ['', '', '', '', '', '', '', '', '', ''];
var ships2 = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];
var ships2Orientation = ['', '', '', '', '', '', '', '', '', ''];
var toBeHitted1 = 20;
var toBeHitted2 = 20;
var shipsIndex = 0;
var countShips = 0;
var clickNum = 0;
var playerOnTurn = 1;
var playerHitted = 2;
var firstClickRow = 0;
var firstClickCol = 0;
var shipsPlaced = false;
var isBlocked = false;
var isBlockedBecauseSelected = false;

//TODO: implementare turni fra giocatori (overlayer su giocatore no turno?); 


function buildBattlefields() {
    if (playerOnTurn == 1) {
        const element = document.getElementById("start");
        element.remove();


    }
    createTopRow();
    var counter = 1;

    var divPlayer = document.createElement("div");
    divPlayer.setAttribute("id", "Player" + playerOnTurn);

    for (i = 1; i < 11; i++) {
        divr = document.createElement("div");
        divr.classList.add("row");
        divr.setAttribute('id', "p" + playerOnTurn + "row" + i);

        for (j = 0; j < 11; j++) {
            divc = document.createElement("div");
            divc.classList.add("col", "border", "p-0");
            if (j == 0)
                divc.innerHTML = i;
            else {

                btn = document.createElement("button");
                btn.classList.add("block");
                btn.setAttribute('id', "p" + playerOnTurn + "btn" + i + j);
                btn.setAttribute('row', i);
                btn.setAttribute('col', j);
                btn.setAttribute('shipId', '');
                btn.setAttribute('blockedForTurn', false);
                btn.addEventListener("click", positionShips);
                btn.innerHTML = counter;
                divc.appendChild(btn);
                counter++;
            }
            divr.appendChild(divc);

        }
        divPlayer.appendChild(divr);
    }
    document.getElementById("container").appendChild(divPlayer);
    //createBattleshipsButtons();
    //document.getElementById("placeholder").innerHTML = "Place your aircraft carrier (4 spaces)";
}

function createTopRow() {
    let p = document.createElement("p");
    p.setAttribute("id", "TitlePar" + playerOnTurn);
    p.innerHTML = "Player " + playerOnTurn + " battlefield";
    document.getElementById("container").appendChild(p);

    var divr = document.createElement("div");
    divr.classList.add("row", "allDiv");
    divr.setAttribute('id', "topRow" + playerOnTurn);

    divc = document.createElement("div");
    divc.classList.add("col", "allDiv");
    divc.innerHTML = " ";
    divr.appendChild(divc);

    for (i = 0; i < 10; i++) {
        divc = document.createElement("div");
        divc.classList.add("col", "allDiv");
        divc.innerHTML = String.fromCharCode(65 + i);
        divr.appendChild(divc);
    }
    document.getElementById("container").appendChild(divr);
}

/*function createBattleshipsButtons() { //for later versions
    divr = document.createElement("div");
    divr.classList.add("row", "m-5");
    divr.setAttribute('id', "shipsRow");

    divc = document.createElement("div");
    divc.classList.add("col", "border");

    btn = document.createElement("button");
    btn.setAttribute('id', "btnAircraftCarrier");
    btn.setAttribute('toBePositioned', "1");
    btn.setAttribute('spaces', "4");
    btn.setAttribute('onClick', "positionShips()");
    btn.innerHTML = "Aircraft Carrier (4 spaces) x1";
    divc.appendChild(btn);
    divr.appendChild(divc);


    divc = document.createElement("div");
    divc.classList.add("col", "border");

    btn = document.createElement("button");
    btn.setAttribute('id', "btnDestroyer");
    btn.setAttribute('toBePositioned', "2");
    btn.setAttribute('spaces', "3");
    btn.setAttribute('onClick', "positionShips()");
    btn.innerHTML = "Destroyer (3 spaces) x2";
    divc.appendChild(btn);
    divr.appendChild(divc);


    divc = document.createElement("div");
    divc.classList.add("col", "border");

    btn = document.createElement("button");
    btn.setAttribute('id', "btnFrigate");
    btn.setAttribute('toBePositioned', "2");
    btn.setAttribute('spaces', "2");
    btn.setAttribute('onClick', "positionShips()");
    btn.innerHTML = "Frigate (2 spaces) x3";
    divc.appendChild(btn);
    divr.appendChild(divc);


    divc = document.createElement("div");
    divc.classList.add("col", "border");


    btn = document.createElement("button");
    btn.setAttribute('id', "btnSubmarine");
    btn.setAttribute('toBePositioned', "4");
    btn.setAttribute('spaces', "1");
    btn.setAttribute('onClick', "positionShips()");
    btn.innerHTML = "Submarine (1 spaces) x4";
    divc.appendChild(btn);

    divr.appendChild(divc);
    document.getElementById("container").appendChild(divr);
}*/

function positionShips(event) {

    if (!shipsPlaced) {

        clickNum++;
        disableAllButtons();

        btnClicked = event.target;
        row = parseInt(btnClicked.getAttribute("row"));
        col = parseInt(btnClicked.getAttribute("col"));
        document.getElementById(btnClicked.getAttribute("id")).classList.add("selected");
        btnClicked.setAttribute("shipId", shipsId[shipsIndex]);//attribute id to ship and cell

        selectCell(row, col);

        if (clickNum == ships[shipsIndex]) {
            if (shipsIndex == (ships.length - 1)) { // se posizionate tutte le navi, fai posizionare quelle dell'altro
                if (playerOnTurn == 2) {
                    document.getElementById("Player1").hidden = false;
                    document.getElementById("TitlePar1").hidden = false;
                    document.getElementById("topRow1").hidden = false;
                    shipsPlaced = true;
                    enableAllButtons();
                    playerOnTurn = 1;
                } else {
                    document.getElementById("Player1").hidden = true;
                    document.getElementById("TitlePar1").hidden = true;
                    document.getElementById("topRow1").hidden = true;
                    document.getElementById("Player1").classList.add("disabledbutton");
                    playerOnTurn = 2;
                    shipsIndex = 0;
                    clickNum = 0;
                    buildBattlefields();
                }

            } else {
                clickNum = 0;
                shipsIndex++;
                enableButtonsUnclicked();
            }
        }
    } else {
        bombQuadrant();
    }
}

function bombQuadrant() {
    var btnClicked = event.target;
    row = parseInt(btnClicked.getAttribute("row"));
    col = parseInt(btnClicked.getAttribute("col"));

    btnClicked.disabled = true;

    if (btnClicked.classList.contains("selected")) {
        if (playerOnTurn == 1) {
            decreaseShipLife(ships2, btnClicked);
            toBeHitted1--;
        } else {
            decreaseShipLife(ships1, btnClicked);
            toBeHitted2--;
        }
        blockAngles(row, col);
    } else { // if no hit --> change turn
        changeTurn();
    }

    isGameOver();
}

function changeTurn(){
    if(playerOnTurn==1){
        playerOnTurn = 2;
        playerHitted = 1;
        document.getElementById("Player1").classList.remove("disabledbutton");
        document.getElementById("Player2").classList.add("disabledbutton");
    }else{
        playerOnTurn = 1;
        playerHitted = 2;
        document.getElementById("Player2").classList.remove("disabledbutton");
        document.getElementById("Player1").classList.add("disabledbutton");
    }
}

function isGameOver() {
    if (toBeHitted1 == 0) {
        alert("Player 1 wins!");
        disableAllButtons();
    }
    if (toBeHitted2 == 0) {
        alert("Player 2 wins!");
        disableAllButtons();
    }
    
}

function decreaseShipLife(shipsPl, btnClicked) {
    var currentShipId = btnClicked.getAttribute("shipId");
    shipsPl[currentShipId]--;

    if (shipsPl[currentShipId] == 0) {
        shipDestroyed(btnClicked.getAttribute("row"), btnClicked.getAttribute("col"), currentShipId);
    }

}

function shipDestroyed(row, col, currentShipId) {
    var shipOrientation;
    var rowI = parseInt(row);
    var colI = parseInt(col);
    var shipLength = ships[currentShipId];
    var isSubmarine = false;

    if (shipLength == 1)
        isSubmarine = true;

    if (playerOnTurn == 1) {
        shipOrientation = ships2Orientation;
    } else {
        shipOrientation = ships1Orientation;
    }

    if (shipOrientation[currentShipId] == "x" || isSubmarine)
        if (colI == 1)
            document.getElementById("p" + playerHitted + "btn" + rowI + (colI + shipLength).toString()).disabled = true;

        else

            if (colI == 10)
                document.getElementById("p" + playerHitted + "btn" + rowI + (colI - shipLength).toString()).disabled = true;
            else

                if (document.getElementById("p" + playerHitted + "btn" + rowI + (colI - 1).toString()).classList.contains("selected")) {
                    document.getElementById("p" + playerHitted + "btn" + rowI + (colI + 1).toString()).disabled = true;
                    if (colI - shipLength > 0)
                        document.getElementById("p" + playerHitted + "btn" + rowI + (colI - shipLength).toString()).disabled = true;
                } else {
                    document.getElementById("p" + playerHitted + "btn" + rowI + (colI - 1).toString()).disabled = true;
                    if (colI + shipLength < 11)
                        document.getElementById("p" + playerHitted + "btn" + rowI + (colI + shipLength).toString()).disabled = true;
                }
    if (shipOrientation[currentShipId] == "y" || isSubmarine)
        if (rowI == 1)
            document.getElementById("p" + playerHitted + "btn" + (rowI + shipLength).toString() + colI).disabled = true;

        else

            if (rowI == 10)
                document.getElementById("p" + playerHitted + "btn" + (rowI - shipLength).toString() + colI).disabled = true;

            else

                if (document.getElementById("p" + playerHitted + "btn" + (rowI - 1).toString() + colI).classList.contains("selected")) {
                    document.getElementById("p" + playerHitted + "btn" + (rowI + 1).toString() + colI).disabled = true;
                    if (rowI - shipLength > 0)
                        document.getElementById("p" + playerHitted + "btn" + (rowI - shipLength).toString() + colI).disabled = true;
                } else {
                    document.getElementById("p" + playerHitted + "btn" + (rowI - 1).toString() + colI).disabled = true;
                    if (rowI + shipLength < 11)
                        document.getElementById("p" + playerHitted + "btn" + (rowI + shipLength).toString() + colI).disabled = true;
                }
}


function selectCell(row, col) {
    if (clickNum == 1) {
        firstClickRow = row;
        firstClickCol = col;
        if (row > 1) {
            btnCurrent = document.getElementById("p" + playerOnTurn + "btn" + (row - 1) + col);
            if (!btnCurrent.classList.contains("selected") && btnCurrent.getAttribute("blockedForTurn") == 'false' && checkIfXHasSpaceEnough(row, col))
                btnCurrent.disabled = false;
        }
        if (row < 10) {
            btnCurrent = document.getElementById("p" + playerOnTurn + "btn" + (row + 1) + col);
            if (!btnCurrent.classList.contains("selected") && btnCurrent.getAttribute("blockedForTurn") == 'false' && checkIfXHasSpaceEnough(row, col))
                btnCurrent.disabled = false;
        }
        if (col > 1) {
            btnCurrent = document.getElementById("p" + playerOnTurn + "btn" + row + (col - 1));
            if (!btnCurrent.classList.contains("selected") && btnCurrent.getAttribute("blockedForTurn") == 'false' && checkIfYHasSpaceEnough(row, col))
                btnCurrent.disabled = false;
        }
        if (col < 10) {
            btnCurrent = document.getElementById("p" + playerOnTurn + "btn" + row + (col + 1));
            if (!btnCurrent.classList.contains("selected") && btnCurrent.getAttribute("blockedForTurn") == 'false' && checkIfYHasSpaceEnough(row, col))
                document.getElementById("p" + playerOnTurn + "btn" + row + (col + 1)).disabled = false;
        }
        blockAngles(firstClickRow, firstClickCol);
    } else {
        if (firstClickRow == row) { //if clicked on x axes
            setShipOrientation("x");
            if (col > firstClickCol) {
                if (col < 10) {
                    btnCurrent = document.getElementById("p" + playerOnTurn + "btn" + row + (col + 1));
                    if (!btnCurrent.classList.contains("selected") && btnCurrent.getAttribute("blockedForTurn") == 'false')
                        btnCurrent.disabled = false;
                }
                if (firstClickCol > 1) {
                    btnCurrent = document.getElementById("p" + playerOnTurn + "btn" + row + (firstClickCol - 1));
                    if (!btnCurrent.classList.contains("selected") && btnCurrent.getAttribute("blockedForTurn") == 'false')
                        btnCurrent.disabled = false;
                }
            } else {
                if (firstClickCol < 10) {
                    btnCurrent = document.getElementById("p" + playerOnTurn + "btn" + row + (firstClickCol + 1));
                    if (!btnCurrent.classList.contains("selected") && btnCurrent.getAttribute("blockedForTurn") == 'false')
                        btnCurrent.disabled = false;
                }
                if (col > 1) {
                    btnCurrent = document.getElementById("p" + playerOnTurn + "btn" + row + (col - 1));
                    if (!btnCurrent.classList.contains("selected") && btnCurrent.getAttribute("blockedForTurn") == 'false')
                        btnCurrent.disabled = false;
                }
            }

        } else { //if clicked on y axes
            setShipOrientation("y");

            if (row > firstClickRow) {
                if (row < 10)
                    if (!document.getElementById("p" + playerOnTurn + "btn" + (row + 1) + col).classList.contains("selected") && document.getElementById("p" + playerOnTurn + "btn" + (row + 1) + col).getAttribute("blockedForTurn") == 'false')
                        document.getElementById("p" + playerOnTurn + "btn" + (row + 1) + col).disabled = false;
                if (firstClickRow > 1)
                    if (!document.getElementById("p" + playerOnTurn + "btn" + (firstClickRow - 1) + col).classList.contains("selected") && document.getElementById("p" + playerOnTurn + "btn" + (firstClickRow - 1) + col).getAttribute("blockedForTurn") == 'false')
                        document.getElementById("p" + playerOnTurn + "btn" + (firstClickRow - 1) + col).disabled = false;
            } else {
                if (firstClickRow < 10)
                    if (!document.getElementById("p" + playerOnTurn + "btn" + (firstClickRow + 1) + col).classList.contains("selected") && document.getElementById("p" + playerOnTurn + "btn" + (firstClickRow + 1) + col).getAttribute("blockedForTurn") == 'false')
                        document.getElementById("p" + playerOnTurn + "btn" + (firstClickRow + 1) + col).disabled = false;
                if (row > 1)
                    if (!document.getElementById("p" + playerOnTurn + "btn" + (row - 1) + col).classList.contains("selected") && document.getElementById("p" + playerOnTurn + "btn" + (row - 1) + col).getAttribute("blockedForTurn") == 'false')
                        document.getElementById("p" + playerOnTurn + "btn" + (row - 1) + col).disabled = false;
            }

        }
        if (clickNum == ships[shipsIndex])
            blockAngles(row, col);
    }
}

function setShipOrientation(orientation) {
    if (playerOnTurn == 1)
        ships1Orientation[shipsIndex] = orientation;
    else
        ships2Orientation[shipsIndex] = orientation
}


/*function selectCellMultipleBoxes(row, col) {
    for (i = col + 1; i < 11 && i < (col + countTBSelectedPerShip); i++) {

        if (document.getElementById("btn" + row + i).disabled == isNotFirstClick)
            break;
        document.getElementById("btn" + row + i).disabled = isNotFirstClick;
    }
    for (i = row + 1; i < 11 && i < (row + countTBSelectedPerShip); i++) {
        if (document.getElementById("btn" + i + col).disabled == isNotFirstClick)
            break;
        document.getElementById("btn" + i + col).disabled = isNotFirstClick;
    }
    for (i = col - 1; i > 0 && i > (col - countTBSelectedPerShip); i--) {
        if (document.getElementById("btn" + row + i).disabled == isNotFirstClick)
            break;
        document.getElementById("btn" + row + i).disabled = isNotFirstClick;
    }

    for (i = row - 1; i > 0 && i > (row - countTBSelectedPerShip); i--) {
        if (document.getElementById("btn" + i + col).disabled == isNotFirstClick)
            break;
        document.getElementById("btn" + i + col).disabled = isNotFirstClick;
    }
}*/

function disableAllButtons() {
    document.querySelectorAll('button').forEach(elem => {
        elem.disabled = true;
    });
}

function enableButtonsUnclicked() {
    document.querySelectorAll('button:not(.selected)').forEach(elem => {
        row = parseInt(elem.getAttribute("row"));
        col = parseInt(elem.getAttribute("col"));

        isBlocked = checkIfBlockedAll(row, col);
        if (!isBlocked)
            elem.disabled = false;
        else {
            elem.disabled = true;
            elem.setAttribute("blockedForTurn", true);
        }

    });
}

function enableAllButtons() {
    document.querySelectorAll('button').forEach(elem => {
        elem.disabled = false;
    });
}

function checkIfBlockedAll(row, col) { //Check if there is space enough around the clicked button to place the ship
    isBlocked = true;
    isBlockedBecauseSelected = false;


    checkIfBlockedUp(row, col);

    if (isBlockedBecauseSelected)
        return isBlockedBecauseSelected;


    checkIfBlockedDown(row, col);
    if (isBlockedBecauseSelected)
        return isBlockedBecauseSelected;

    if (isBlockedBecauseSelected)
        return isBlockedBecauseSelected;

    checkIfBlockedLeft(row, col);


    if (isBlockedBecauseSelected)
        return isBlockedBecauseSelected;


    checkIfBlockedRight(row, col);

    if (isBlockedBecauseSelected)
        return isBlockedBecauseSelected;


    return isBlocked;
}

function checkIfBlockedUp(row, col) {
    if (row - ships[shipsIndex] >= 0) {
        isBlocked = false;
        for (i = 1; i < ships[shipsIndex]; i++)
            if (document.querySelector("[id = 'p" + playerOnTurn + "btn" + (row - i) + col + "']").classList.contains('selected')
                || document.querySelector("[id = 'p" + playerOnTurn + "btn" + (row) + col + "']").classList.contains('proximityToSelected')) {
                if (i == 1)
                    isBlockedBecauseSelected = true;
                return;
            }
    }
    if (row > 1)
        if (document.querySelector("[id = 'p" + playerOnTurn + "btn" + (row - 1) + col + "']").classList.contains('selected')
            || document.querySelector("[id = 'p" + playerOnTurn + "btn" + (row) + col + "']").classList.contains('proximityToSelected')) {
            isBlockedBecauseSelected = true;
        }

}

function checkIfBlockedDown(row, col) {
    if (row + ships[shipsIndex] <= 10) {
        isBlocked = false;
        for (i = 1; i < ships[shipsIndex]; i++)
            if (document.querySelector("[id = 'p" + playerOnTurn + "btn" + (row + i) + col + "']").classList.contains('selected')
                || document.querySelector("[id = 'p" + playerOnTurn + "btn" + (row) + col + "']").classList.contains('proximityToSelected')) {
                if (i == 1)
                    isBlockedBecauseSelected = true;
                return;
            }
    }
    if (row < 10)
        if (document.querySelector("[id = 'p" + playerOnTurn + "btn" + (row + 1) + col + "']").classList.contains('selected')
            || document.querySelector("[id = 'p" + playerOnTurn + "btn" + (row) + col + "']").classList.contains('proximityToSelected'))
            isBlockedBecauseSelected = true;

}

function checkIfBlockedLeft(row, col) {

    if (col - ships[shipsIndex] >= 0) {
        isBlocked = false;

        for (i = 1; i < ships[shipsIndex]; i++)
            if (document.querySelector("[id = 'p" + playerOnTurn + "btn" + row + (col - i) + "']").classList.contains('selected')
                || document.querySelector("[id = 'p" + playerOnTurn + "btn" + row + (col) + "']").classList.contains('proximityToSelected')) {
                if (i == 1)
                    isBlockedBecauseSelected = true;
                return;
            }
    }
    if (col > 1)
        if (document.querySelector("[id = 'p" + playerOnTurn + "btn" + row + (col - 1) + "']").classList.contains('selected')
            || document.querySelector("[id = 'p" + playerOnTurn + "btn" + row + (col) + "']").classList.contains('proximityToSelected'))
            isBlockedBecauseSelected = true;


}

function checkIfBlockedRight(row, col) {

    if (col + ships[shipsIndex] <= 10) {
        isBlocked = false;

        for (i = 1; i < ships[shipsIndex]; i++)
            if (document.querySelector("[id = 'p" + playerOnTurn + "btn" + row + (col + i) + "']").classList.contains('selected')
                || document.querySelector("[id = 'p" + playerOnTurn + "btn" + row + (col) + "']").classList.contains('proximityToSelected')) {
                if (i == 1)
                    isBlockedBecauseSelected = true;
                return;
            }
    }
    if (col < 10)
        if (document.querySelector("[id = 'p" + playerOnTurn + "btn" + row + (col + 1) + "']").classList.contains('selected')
            || document.querySelector("[id = 'p" + playerOnTurn + "btn" + row + (col) + "']").classList.contains('proximityToSelected'))
            isBlockedBecauseSelected = true;
}

function checkIfXHasSpaceEnough(row, col) {
    countSpaces = 1;
    if (row > 1) {
        for (i = (row - 1); i > 0 && countSpaces < ships[shipsIndex]; i--)
            if (!document.querySelector("[id = 'p" + playerOnTurn + "btn" + i + col + "']").classList.contains('selected')
                && !document.querySelector("[id = 'p" + playerOnTurn + "btn" + i + col + "']").classList.contains('proximityToSelected'))
                countSpaces++;
            else
                break;
    }

    if (row < 10) {
        for (i = (row + 1); i < 10 && countSpaces < ships[shipsIndex]; i++)
            if (!document.querySelector("[id = 'p" + playerOnTurn + "btn" + i + col + "']").classList.contains('selected')
                && !document.querySelector("[id = 'p" + playerOnTurn + "btn" + i + col + "']").classList.contains('proximityToSelected'))
                countSpaces++;
            else
                break;
    }

    if (countSpaces == ships[shipsIndex])
        return true;
    else
        return false;

}

function checkIfYHasSpaceEnough(row, col) {
    countSpaces = 1;
    if (col > 1) {
        for (i = (col - 1); i > 0 && countSpaces < ships[shipsIndex]; i--)
            if (!document.querySelector("[id = 'p" + playerOnTurn + "btn" + row + i + "']").classList.contains('selected')
                && !document.querySelector("[id = 'p" + playerOnTurn + "btn" + row + i + "']").classList.contains('proximityToSelected'))
                countSpaces++;
            else
                break;
    }

    if (col < 10) {
        for (i = (col + 1); i < 10 && countSpaces < ships[shipsIndex]; i++)
            if (!document.querySelector("[id = 'p" + playerOnTurn + "btn" + row + i + "']").classList.contains('selected')
                && !document.querySelector("[id = 'p" + playerOnTurn + "btn" + row + i + "']").classList.contains('proximityToSelected'))
                countSpaces++;
            else
                break;
    }

    if (countSpaces == ships[shipsIndex])
        return true;
    else
        return false;
}

function blockAngles(row, col) {
    var fieldSelector;
    if (shipsPlaced)
        fieldSelector = playerHitted;
    else
        fieldSelector = playerOnTurn;

    if (row > 1) {
        if (col > 1)
            if (!document.querySelector("[id = 'p" + fieldSelector + "btn" + (row - 1) + (col - 1) + "']").classList.contains('selected')) {
                disableProximityToSelected(row - 1, col - 1, fieldSelector);

            }
        if (col < 10)
            if (!document.querySelector("[id = 'p" + fieldSelector + "btn" + (row - 1) + (col + 1) + "']").classList.contains('selected')) {
                disableProximityToSelected(row - 1, col + 1, fieldSelector);
            }
    }
    if (row < 10) {
        if (col > 1)
            if (!document.querySelector("[id = 'p" + fieldSelector + "btn" + (row + 1) + (col - 1) + "']").classList.contains('selected')) {
                disableProximityToSelected(row + 1, col - 1, fieldSelector);
            }
        if (col < 10)
            if (!document.querySelector("[id = 'p" + fieldSelector + "btn" + (row + 1) + (col + 1) + "']").classList.contains('selected')) {
                disableProximityToSelected(row + 1, col + 1, fieldSelector);
            }
    }
}

function disableProximityToSelected(row, col, fieldSelector) {
    document.getElementById("p" + fieldSelector + "btn" + row + col).disabled = true;
    if (!shipsPlaced)
        document.getElementById("p" + fieldSelector + "btn" + row + col).classList.add("proximityToSelected");
}