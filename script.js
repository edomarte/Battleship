const ships = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];
var shipsIndex = 0;
var countShips = 0;
var clickNum = 0;
var firstClickRow = 0;
var firstClickCol = 0;

function buildBattlefields() {
    const element = document.getElementById("start");
    element.remove();
    counter = 1;
    createTopRow();

    for (i = 1; i < 11; i++) {
        divr = document.createElement("div");
        divr.classList.add("row");
        divr.setAttribute('id', "row" + i);

        for (j = 0; j < 11; j++) {
            divc = document.createElement("div");
            divc.classList.add("col", "border", "p-0");
            if (j == 0)
                divc.innerHTML = i;
            else {

                btn = document.createElement("button");
                btn.classList.add("block");
                btn.setAttribute('id', "btn" + i + j);
                btn.setAttribute('row', i);
                btn.setAttribute('col', j);
                btn.setAttribute('shipName', '');
                btn.setAttribute('blockedForTurn', false);
                btn.addEventListener("click", positionShips);
                btn.innerHTML = counter;
                divc.appendChild(btn);
                counter++;
            }
            divr.appendChild(divc);

        }
        document.getElementById("container").appendChild(divr);
    }
    //createBattleshipsButtons();
    document.getElementById("placeholder").innerHTML = "Place your aircraft carrier (4 spaces)";
}

function createTopRow() {
    divr = document.createElement("div");
    divr.classList.add("row", "allDiv");
    divr.setAttribute('id', "topRow");

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
    clickNum++;
    disableAllButtons();

    btnClicked = event.target;
    row = parseInt(btnClicked.getAttribute("row"));
    col = parseInt(btnClicked.getAttribute("col"));
    document.getElementById(btnClicked.getAttribute("id")).classList.add("selected");
    btnClicked.setAttribute("shipName", "ac");//attribute shipname to cell

    selectCell(row, col);
    if (clickNum == ships[shipsIndex]) {
        clickNum = 0;
        shipsIndex++;
        enableButtonsUnclicked();
    }
}

function selectCell(row, col) {
    //TODO: ADD checkIfBlocked WHEN SELECT CELLS
    if (clickNum == 1) {
        firstClickRow = row;
        firstClickCol = col;
        if (row > 1) {
            btnCurrent = document.getElementById("btn" + (row - 1) + col);
            if (!btnCurrent.classList.contains("selected") && btnCurrent.getAttribute("blockedForTurn") == 'false' && checkIfXHasSpaceEnough(row,col))
                btnCurrent.disabled = false;
        }
        if (row < 10) {
            btnCurrent = document.getElementById("btn" + (row + 1) + col);
            if (!btnCurrent.classList.contains("selected") && btnCurrent.getAttribute("blockedForTurn") == 'false' && checkIfXHasSpaceEnough(row,col))
                btnCurrent.disabled = false;
        }
        if (col > 1) {
            btnCurrent = document.getElementById("btn" + row + (col - 1));
            if (!btnCurrent.classList.contains("selected") && btnCurrent.getAttribute("blockedForTurn") == 'false' && checkIfYHasSpaceEnough(row,col))
                btnCurrent.disabled = false;
        }
        if (col < 10) {
            btnCurrent = document.getElementById("btn" + row + (col + 1));
            if (!btnCurrent.classList.contains("selected") && btnCurrent.getAttribute("blockedForTurn") == 'false' && checkIfYHasSpaceEnough(row,col))
                document.getElementById("btn" + row + (col + 1)).disabled = false;
        }
    } else {
        if (firstClickRow == row) { //if clicked on x axes
            if (col > firstClickCol) {
                if (col < 10) {
                    btnCurrent = document.getElementById("btn" + row + (col + 1));
                    if (!btnCurrent.classList.contains("selected") && btnCurrent.getAttribute("blockedForTurn") == 'false')
                        btnCurrent.disabled = false;
                }
                if (firstClickCol > 1) {
                    btnCurrent = document.getElementById("btn" + row + (firstClickCol - 1));
                    if (!btnCurrent.classList.contains("selected") && btnCurrent.getAttribute("blockedForTurn") == 'false')
                        btnCurrent.disabled = false;
                }
            } else {
                if (firstClickCol < 10) {
                    btnCurrent = document.getElementById("btn" + row + (firstClickCol + 1));
                    if (!btnCurrent.classList.contains("selected") && btnCurrent.getAttribute("blockedForTurn") == 'false')
                        btnCurrent.disabled = false;
                }
                if (col > 1) {
                    btnCurrent = document.getElementById("btn" + row + (col - 1));
                    if (!btnCurrent.classList.contains("selected") && btnCurrent.getAttribute("blockedForTurn") == 'false')
                        btnCurrent.disabled = false;
                }
            }

        } else { //if clicked on y axes

            if (row > firstClickRow) {
                if (row < 10)
                    if (!document.getElementById("btn" + (row + 1) + col).classList.contains("selected") && document.getElementById("btn" + (row + 1) + col).getAttribute("blockedForTurn") == 'false')
                        document.getElementById("btn" + (row + 1) + col).disabled = false;
                if (firstClickRow > 1)
                    if (!document.getElementById("btn" + (firstClickRow - 1) + col).classList.contains("selected") && document.getElementById("btn" + (firstClickRow - 1) + col).getAttribute("blockedForTurn") == 'false')
                        document.getElementById("btn" + (firstClickRow - 1) + col).disabled = false;
            } else {
                if (firstClickRow < 10)
                    if (!document.getElementById("btn" + (firstClickRow + 1) + col).classList.contains("selected") && document.getElementById("btn" + (firstClickRow + 1) + col).getAttribute("blockedForTurn") == 'false')
                        document.getElementById("btn" + (firstClickRow + 1) + col).disabled = false;
                if (row > 1)
                    if (!document.getElementById("btn" + (row - 1) + col).classList.contains("selected") && document.getElementById("btn" + (row - 1) + col).getAttribute("blockedForTurn") == 'false')
                        document.getElementById("btn" + (row - 1) + col).disabled = false;
            }

        }
    }



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

function checkIfBlockedAll(row, col) { //Check if there is space enough around the clicked button to place the ship
    isBlocked = false;

    isBlocked = checkIfBlockedUp(row, col);

    if (!isBlocked)
        return isBlocked;
    else {
        isBlocked = checkIfBlockedDown(row, col);
    }

    if (!isBlocked)
        return isBlocked;
    else {
        isBlocked = checkIfBlockedLeft(row, col);
    }

    if (!isBlocked)
        return isBlocked;
    else {
        isBlocked = checkIfBlockedRight(row, col);

    }

    return isBlocked;
}

function checkIfBlockedUp(row, col) {
    isBlocked = false;
    if (row - ships[shipsIndex] < 0) {
        isBlocked = true;

    } else {
        for (i = 1; i < ships[shipsIndex]; i++)
            if (document.querySelector("[id = 'btn" + (row - i) + col + "']").classList.contains('selected')) {
                isBlocked = true;
                return isBlocked;
            }
    }
    return isBlocked;
}

function checkIfBlockedDown(row, col) {
    isBlocked = false;
    if (row + ships[shipsIndex] > 10) {
        isBlocked = true;
    } else {
        for (i = 1; i < ships[shipsIndex]; i++)
            if (document.querySelector("[id = 'btn" + (row + i) + col + "']").classList.contains('selected')) {
                isBlocked = true;
                return isBlocked;
            }
    }
    return isBlocked;
}

function checkIfBlockedLeft(row, col) {
    isBlocked = false;
    if (col - ships[shipsIndex] < 0) {
        isBlocked = true;
    } else {
        for (i = 1; i < ships[shipsIndex]; i++)
            if (document.querySelector("[id = 'btn" + row + (col - i) + "']").classList.contains('selected')) {
                isBlocked = true;
                return isBlocked;
            }
    }
    return isBlocked;
}

function checkIfBlockedRight(row, col) {
    isBlocked = false;
    if (col + ships[shipsIndex] > 10)
        isBlocked = true;
    else {
        for (i = 1; i < ships[shipsIndex]; i++)
            if (document.querySelector("[id = 'btn" + row + (col + i) + "']").classList.contains('selected')) {
                isBlocked = true;
                return isBlocked;
            }
    }
    return isBlocked;
}

function checkIfXHasSpaceEnough(row, col){
    countSpaces=1;
    if(row>1){
        for(i=(row-1);i>0 && countSpaces<ships[shipsIndex];i--)
            if (!document.querySelector("[id = 'btn" + i + col + "']").classList.contains('selected')) 
                countSpaces++;
            else
                break;
    }

    if(row<10){
        for(i=(row+1);i<10 && countSpaces<ships[shipsIndex];i++)
            if (!document.querySelector("[id = 'btn" + i + col + "']").classList.contains('selected')) 
                countSpaces++;
            else
                break;
    }

    if(countSpaces==ships[shipsIndex])
        return true;
    else
        return false;

}

function checkIfYHasSpaceEnough(row, col){
    countSpaces=1;
    if(col>1){
        for(i=(col-1);i>0 && countSpaces<ships[shipsIndex];i--)
            if (!document.querySelector("[id = 'btn" + row + i + "']").classList.contains('selected')) 
                countSpaces++;
            else
                break;
    }

    if(col<10){
        for(i=(col+1);i<10 && countSpaces<ships[shipsIndex];i++)
            if (!document.querySelector("[id = 'btn" + row + i + "']").classList.contains('selected')) 
                countSpaces++;
            else
                break;
    }

    if(countSpaces==ships[shipsIndex])
        return true;
    else
        return false;
}