// //  creation des paires de carte

const board_game_container = document.getElementById("board_game_container");
const rules = document.getElementById('instruction');
const player_input = document.getElementsByName('player_input');
const span_error = document.getElementById('span_error_name');
const btn_start = document.getElementById('start_game');
const game_score_area = document.getElementById('gs');
const new_game = document.getElementById('new_game'); 
const timer_area = document.getElementById('timer_area');
game_score_area.classList.add('hidden');
timer_area.classList.add('hidden');


// /*  ont génére le palteau de jeu */
const images_links = Array(2)
  .fill([
    /* .fill ahoute les tableau Array
     / .flat les combines pour en former q'un seul */
    "../image/desktop/abricot.png",
    "../image/desktop/banane.png",
    "../image/desktop/citronJaune.png",
    "../image/desktop/citronVert.png",
    "../image/desktop/fraise.png",
    "../image/desktop/grenade.png",
    "../image/desktop/orange.png",
    "../image/desktop/redapple.png",
  ])
  .flat();
//  ont vérifie que les liens marche bien *
console.table(images_links);

//  ====================
 /*  Début partie mise en place du BTN start  */
 
 btn_start.addEventListener('click', function (){
   
   rules.classList.add('hidden');
   btn_start.classList.add('hidden');
   
   if (board_game_container.classList.contains('hidden')){
    board_game_container.classList.remove('hidden');
    timer_area.classList.remove('hidden');
   }

 })

//  ==================================================
/* récupération des elements data */

const attemps_count_paragraph = document.querySelector("p[data-attemps-count]");
const pairs_found_paragraph = document.querySelector("P[data-pairs-found]");
const score_paragraph = document.querySelector("p[data-score]");
const timer_paragraph = document.querySelector("p[data-timer]");

// console.log("log3",attemps_count_paragraph,pairs_found_paragraph,score_paragraph,timer_paragraph );
function shuffleAnArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// /* ont crée la class memory game */

class MemoryGames {
  constructor({
    board_game_container,
    images_links,
    attemps_count_paragraph,
    pairs_found_paragraph,
    score_paragraph,
    timer_paragraph,
  }) {
    this.board_game_container = board_game_container;
    this.imagesSource = images_links;
    this.attemps_count_paragraph = attemps_count_paragraph;
    this.pairs_found_paragraph = pairs_found_paragraph;
    this.score_paragraph = score_paragraph;
    this.timer_paragraph = timer_paragraph;
    this.cards_selected = [];
    this.cards_matched = [];
    this.attemps_count = 0;
    this.pairs_found = 0;
    this.timer_started = false;
    this.timer_reference = null;
    this.minutes = 0;
    this.seconds = 0;
    this.init();
    // console.log(MemoryGames);
  }
  
  init() {
    this.fillBoardGameContainer();
    // console.log("hello 3");
    // console.log(this.score_paragraph.getAttribute('data-score'));
  }
  
  fillBoardGameContainer() {
    /* creation de la const image +
    fonction shuffle an array */
    
    console.log("hello array");
    /* function pour shuffle les tableaux  */
    const images_links_shuffled = shuffleAnArray(images_links);
    
    //     // console.log(images_links_shuffled, "log4");
    console.log("sortie shuffle");
    
    //     // console.log(this.image_links);
    images_links_shuffled.forEach((image_link) => {
      // console.log(image_link);
      const li_Tag = document.createElement("li");
      li_Tag.classList.add("card");
      // li_Tag.currentTarget.classList.remove("card");

      li_Tag.addEventListener("click", ({ currentTarget }) => {
        if (this.timer_started === false) {
          this.timer_started = true;
          this.timer();
        }
         this.flipCard(currentTarget);
            currentTarget.classList.add('no-click')
      });

      console.log("hello img");
      const image = document.createElement("img");
      image.setAttribute("class", "card");
      image.setAttribute("src", image_link);
      image.setAttribute("draggable", "false");
      image.setAttribute("alt", "Fruix Cards");

      li_Tag.append(image);
      this.board_game_container.append(li_Tag);
    });
  }

  // creation de la methode timer 
  timer() {
    this.timer_reference = setInterval(() => {
      this.seconds += 1;

      if (this.seconds === 60) {
        this.minutes += 1;
        this.seconds = 0;
      }
      const time_content =
        (this.minutes < 10 ? "0" + this.minutes : this.minutes) +
        ":" +
        (this.seconds < 10 ? "0" + this.seconds : this.seconds);
        this.timer_paragraph.setAttribute('data-timer',time_content);
        // console.log(time_content);
      //  console.log(typeof(time_content));
       rules.style.display = "none"
    },1000);
  }

  flipCard(card){
    card.classList.add('flip-card');
    card.classList.add('no-click');
   

    this.fillCardSelectedArray(card);
  }
  fillCardSelectedArray(card){
    if(this.cards_selected.length === 2){
      
     
      return;
    }
    this.cards_selected.push(card.firstElementChild);
   
    
    this.compareCards();

    card.classList.remove('no-click');
   
    
  }

  compareCards()   {
    if(this.cards_selected.length !== 2){
      
      
      return;
    }
    console.log("log compare cards");
    this.board_game_container.classList.add('no-click');
    
    console.log(board_game_container);
    
    if(this.cards_selected[0].src === this.cards_selected[1].src){
      
      
      // console.log(this.cards_selected[0], this.cards_selected[1]);
      
      this.match();
    }else {
      this.noMatch();
      //  this.cards_selected[0].src.classList.remove('no-click');
      //  this.cards_selected[0].src.classList.add('card');
      
      // this.cards_selected.classList.remove('no-click');
    }
   
    
  };
  
  match(){
    this.pairs_found += 1;
    
    this.cards_matched.push(...this.cards_selected);
    
    
    console.table(this.cards_selected);
    // li_Tag.classList.add('no-click');
   

    this.cards_selected.length = 0;

    this.board_game_container.classList.remove('no-click');

    this.incrementAttempsCounter();

    this.updatePairsFoundContent();

    this.isWinner();


   }
   incrementAttempsCounter(){
    this.attemps_count += 1;

    this.attemps_count_paragraph.setAttribute('data-attemps-count', this.attemps_count.toString());
  }
  
  updatePairsFoundContent(){
    const pairs_found_content = this.pairs_found.toString() + ' /8';

    this.pairs_found_paragraph.setAttribute('data-pairs-found', pairs_found_content);
    // console.log('data-pairs-found', pairs_found_content)
   }
   isWinner(){
    if(this.cards_matched.length !==16){
      return;
    }

    clearInterval(this.timer_reference);

    this.board_game_container.classList.add('no-click');
    this.board_game_container.classList.add('hidden');
    game_score_area.classList.remove('hidden');
    // game_score_area.classList.add('visible');
    
   }

   displayScore(){
   
     

    if (this.attemps_count < 8){
      return;
    }
    if (this.attemps_count === 8){
      this.score_paragraph.setAttribute('data-score','★★★★★')
    }

    else if (this.attemps_count > 8 && this.attemps_count <= 10){
      this.score_paragraph.setAttribute('data-score','★★★★☆');
    }
   else if (this.attemps_count > 10 && this.attemps_count <=12){
    this.score_paragraph.setAttribute('data-score','★★★☆☆' );

   } else if (this.attemps_count >12 && this.attemps_count >= 14){
    this.score_paragraph.setAttribute('data-score','★★☆☆☆');
   }else {
    this.score_paragraph.setAttribute('data-score', '★☆☆☆☆')
   }

  //  game_score_area.classList.add('visible');
  // game_score_area.classList.remove('hidden');
  // console.log(game_score_area);
  


  };

  noMatch(){
    this.incrementAttempsCounter();
   
    setTimeout(() => {
      this.cards_selected[0].classList.add('no-click')
      this.cards_selected[0].parentElement.classList.remove("flip-card");

      this.cards_selected[1].classList.add('no-click')
      this.cards_selected[1].parentElement.classList.remove('flip-card');

      this.board_game_container.classList.remove('no-click');
      this.cards_selected[0].classList.remove('no-click')
      this.cards_selected[0].parentElement.classList.remove("no-click");

      this.cards_selected[1].classList.remove('no-click')
      this.cards_selected[1].parentElement.classList.remove("no-click");

      this.cards_selected.length = 0;
      // this.cards_selected.parentElement.classList.remove('no-click');
      
    } ,1500);
  
  };
  
}

new_game.addEventListener('click', function(){
  window.location.reload();
})

// console.log("test init");

// //  // ==== ont instancie la classe memory game

new MemoryGames({
  board_game_container,
  images_links,
  attemps_count_paragraph,
  pairs_found_paragraph,
  score_paragraph,
  timer_paragraph,
});

// console.log("final", MemoryGames);
