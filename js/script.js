// Copiamo la griglia fatta ieri nella nuova repo e aggiungiamo la logica del gioco.
// Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe
//     . Attenzione: nella stessa cella può essere posizionata al massimo una bomba, 
//          perciò nell’array delle bombe non potranno esserci due numeri uguali.
// In seguito l'utente clicca su una cella: se il numero è presente nella lista dei numeri generati 
//     - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina.
//  Altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.
// La partita termina quando il giocatore clicca su una bomba o quando raggiunge il numero massimo possibile di numeri consentiti.
// Al termine della partita il software deve comunicare il punteggio,
//  cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.



// creare variabile button
const buttonGridEl = document.getElementById("button-grid");

// creare variabile contenitore griglia
const containerGridEl = document.getElementById("grid-container");

let levelInputEl = document.getElementById("level-select");


let finishedGameEl = document.getElementById("finished-game");


//creo variabile per conteggio click
let count = 0;



//inizializzo variabile per l'array
let numeroBombe;



// al click dell'utente sul button
buttonGridEl.addEventListener("click", function() {

    levelSelect = levelInputEl.value

    if(levelSelect == 1){
        //funzione che genera griglia tramite parametri di num celle e colonne
        generateGrid(100, 10);
        //assegno alla variabile funzione che crea array di numeri casuali (inserisco range in cui devono essere presi numeri)
        numeroBombe = arrayBombs(100);

       
        

    }else if(levelSelect == 2){
        //funzione che genera griglia tramite parametri di num celle e colonne
        generateGrid(81, 9);
        //assegno alla variabile funzione che crea array di numeri casuali (inserisco range in cui devono essere presi numeri)
        numeroBombe = arrayBombs(81);

       


    
    }else if(levelSelect == 3){
        //funzione che genera griglia tramite parametri di num celle e colonne
        generateGrid(49, 7);
        //assegno alla variabile funzione che crea array di numeri casuali (inserisco range in cui devono essere presi numeri)
        numeroBombe = arrayBombs(49);
        console.log(numeroBombe);

    }

    buttonGridEl.style.pointerEvents = "none";
})



















// funzione che genera un elemento, gli assegna una classe "square"
function createSquare(text , numeroColonne) {

    // creare un elemento
    // dargli una classe
    let newElement = document.createElement('div');
    newElement.classList.add("square");
    newElement.style.width = `calc(100% / ${numeroColonne})`;
    newElement.style.height = `calc(100% / ${numeroColonne})`;

    newElement.innerText = text;
  
    return newElement;
  
}





function generateGrid(numberCells, numberColumns){
    for(let i = 1; i < numberCells + 1; i++){
    
           
        // creo varibile nuovo elemento che sarà uguale alle alla funzione per creare  l'elemento
        let newSquareElement = createSquare(i, numberColumns);

        
    
        // al click dell'utente su una cassella
        newSquareElement.addEventListener("click", function() {

            

            //se l'utente clicca su una cella corrispondete a un numero dell'arrey con numeri casuali
            if (numeroBombe.includes(i)){
                let allSquare = document.querySelectorAll(".square");

                for (let x = 1 ; x < allSquare.length ; x++) {
                    if(numeroBombe.includes(parseInt(allSquare[x].innerText))){
                        allSquare[x].classList.add("black");

                    }
                    //al click di una cella corrispondente a un numero dell 'array interrompi il gioco e compare un messagio relativo
                }
                finishedGameEl.classList.add("finished-text");
                finishedGameEl.innerText = `Mi dispiace hai perso; hai ottenuto ${count} punti , ricarica la pagina `;
                containerGridEl.style.pointerEvents =  "none";            
            }else if(count == numberCells - 17){
                //quando l'utente clicca tutte le celle compare messaggio vittoria
                finishedGameEl.classList.add("finished-text");
                finishedGameEl.innerText = `Complimenti hai vinto; hai ottenuto ${count} punti  su ${count} punti , ricarica la pagina `;
                containerGridEl.style.pointerEvents =  "none"; 
            }else{
                // aggiungo classe che colora l'elemento di azzurro
                newSquareElement.classList.add("azzurro");
                //se la cella è già stata cliccata leva la possibilità di ricliccarla
                newSquareElement.style.pointerEvents = "none";
                // scrivi un messagio in cosole relativo al numero di cella cliccata
                
                console.log(i);
            }
            
            
           
            //ogni click la variabiile contatore aumenta di uno
            count++;
            
        })
    
        //appendo nuovo elemento nel contenitore griglia
        containerGridEl.append(newSquareElement);

        
        
    }
}



//creo funzione che genera numeri casualli in base al livello scelto 
function arrayBombs(numBombs){
    //creo variabile per array di numeri casuali
    let cellBombs = [];
    
    
    //finche l'array non arriva a 16 aggiunge i numeri casuali all'array
    while(cellBombs.length < 16) {
        let randomNum = Math.floor(Math.random () * numBombs + 1);
        
        //verifico se il numero è presente nell'array
        if(!cellBombs.includes(randomNum)) {
            cellBombs.push(randomNum);
        }
    }

    return cellBombs;


}

