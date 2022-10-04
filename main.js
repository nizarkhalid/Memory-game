// accessing the cards
let card = document.querySelectorAll(".card");

// shuffling cards
function randomCards(){
    card.forEach(e=>{
        let rand = Math.floor(Math.random()* card.length);
        e.style.order = rand;
    })
}
// sounds
let click = new Audio("../sounds/click-sound.wav");
let right = new Audio("../sounds/right-answer.wav");
let wrong = new Audio("../sounds/wrong-answer.wav");
let flipping_sound = new Audio("../sounds/page-flipping.mp3");
let background_music = new Audio("../sounds/background-sound.mp3");
background_music.volume = 0.1;
let mutes =false;

// muting the background music
let btn = document.getElementById("mute");
btn.onclick = function(){
    if(mutes){
        background_music.pause();
        mutes = false;
        btn.textContent = "Play Song";
        return;
    }
    background_music.play();
    mutes = true;
    btn.textContent = "Mute";
}

randomCards();
start_game();
//showing the cards before playing
function start_game(){
    document.body.onload = function(){
        check();
        
    }
}

function check(){
    setTimeout(ShowCards,2000)
}

function ShowCards(){
    card.forEach((e)=>{
        flipping_sound.play();
        e.classList.add("flipcard");
    })
}


//////////// GAME LOGIC //////////

let flipped = false;
let lock_board = false;
let first_card,second_card;
let count = 0;

function flip(){
    
    // locking the board while checking for a match
    if (lock_board) return;
    // to avoid clicking the same card
    if (this === first_card) return;

    this.classList.remove("flipcard")
    if(!flipped){
        click.play();
        first_card = this;
        flipped =true
        return;
    }
    else{
        second_card = this
    }
    // check for matching
    (first_card.dataset.img === second_card.dataset.img) ? matched() : unmatched()

    //playing again
    if(count === (card.length/2)){
        again();
        randomCards();
        check();
        count = 0;
        reset();
        game();
        flipping_sound.play();
    }
    
}

function again(){
    card.forEach(card=>{
        card.classList.remove("flipcard")
    })
}

function matched(){
        right.play();
        first_card.removeEventListener("click", flip)
        second_card.removeEventListener("click", flip)
        ++count;
        reset();
}

function unmatched(){
    wrong.play();
    lock_board = true;
    setTimeout(()=>{
        first_card.classList.add("flipcard");
        second_card.classList.add("flipcard");
        reset();
    },500)
}

function reset(){
    [first_card,second_card] = [null,null];
    [flipped, lock_board] = [false, false]
}


//starting the game
function game(){
    card.forEach(card=>{
        card.addEventListener("click" , flip)
    })
}
game();
