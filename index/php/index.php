<?php
// on démare la séssion 
session_start();
if($_POST){
  if(isset($_POST ['player_input']) && !empty($_POST ['player_input'])){

    $player_name = $_POST['player_input'];
   
    // on inclula connexopn à la DB
    require_once('connect.php');

    // on vérifie si  le pseudo existe deja  dans la table 

    $sql = "SELECT COUNT(name_player) FROM `players` WHERE `name_player` = '" . $_POST['player_input'] . "'";
      // on prépare la requette 
    $req = $db -> prepare($sql);
      // on execute la requette 
    $req -> execute();

    // on stock le resultat dans un tableau 

    $name_already_exist = $req -> fetchAll(PDO::FETCH_ASSOC);
    /* on verrife si entré  existe déja dans la base ou pas 
     si $name_already_existe = 1  alors l'entré / le nom de joueur existe déja 
     sinon si  $name_already_existe = 0 l'entré / le nom de joueur est disponible  */ 
    
    print_r($name_already_exist);

     // $_SESSION ['erreur'] = "Ce nom de joueur éxiste déja" ;


     



    
    // on clean les data envoyé

    $player_name = strip_tags($_POST['player_input']);
    print_r($player_name);

    // on insert les données dans la DB 

    $sql = 'INSERT INTO `players`   (`name_player`) VALUES (:player_input); ';

    $query = $db -> prepare($sql);

     $query -> bindValue(':player_input',$player_name , PDO::PARAM_STR);

    $query ->execute();


    
    require_once('close.php');
    $_SESSION['message'] = " nom de joueur ajouté ";

    



   
  }else{
    $_SESSION ['erreur'] = "Le nom de joueur doit être remplis ,valide et inexistant . ";
  }
  
}
?>
<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Memory_game</title>
    <link rel="stylesheet" href="./style.css" />
  </head>
  <header >
    <h1>Memory Game </h1>
    <div class="data_container">
      <p data-attemps-count="0">Nombre de tentatives :</p>
      <p data-pairs-found="0 / 8 ">Nombre de paires trouvées :</p>
      
    </div>
    
  </header>
  <body>
    <main>
      <div id="instruction" >
        <div class="inner_container_img">
          <img src="../image/desktop/redapple.png" alt="redapple1" id="redapple1">
          
        </div>
        
        <p>
          Instruction : <br />
          trouvez une paire de carte identique pour poursuivre et finir la
          partie . chaque partie est chronometrer .
        </p>
        <div class="inner_container_img">
          <img src="../image/desktop/redapple.png" alt="redapple2" id="redapple2">
          
        </div>
        <section class = "form_section">
          <h1> Pour enregistré vos score entré un nom de joueur et cliquer sur envoyer. <br/>
            Sinon cilquer sur commencer une partie
          </h1>
          
         <?php
        if(!empty($_SESSION ['erreur'])){
            echo '<div class ="alert-alert-danger">' . $_SESSION['erreur'] . '</div>';
            $_SESSION['erreur'] ="";
          }
                   ?>

<?php 
          if(!empty($_SESSION ['message'])){
            echo  ' <div class = "alert-succes" >' . $_SESSION['message'] . '</div>';
            $_SESSION['message'] ="";
            
          }
          ?> 

          

<form method = "POST">
  
  <label for = "player_input">Nom de joueur </label>
  <input type ="text" name="player_input" placeholder="Entre votre nom de joueur ">
  <?php
  if(isset($_POST ['player_input']) && !empty($_POST ['player_input'])){
    //if(!($name_already_exist['name_player']  === $player_name )){
    if($name_already_exist  === 0){
       echo  ' <div class = "alert-succes" >' . $_SESSION['message'] . '</div>';
       $_SESSION['message'] ="";
      
    }elseif ($name_already_exist === 1){
      echo '<div class ="alert-alert-danger">' . $_SESSION['erreur'] . '</div>';
      $_SESSION['erreur'] ="";
    }
  }

  ?>
  <span id ="span_error_name"></span>
  
  <button class = "submit">envoyer </button>
  
</form>


</section>




</div>

<button  id="start_game" >Commencez votre partie</button>
<div id="btn-container"></div>  
<ul id="board_game_container" class="hidden"></ul>

<div id="gs">
  <figure>
    <img src="../image/desktop/couronne.png" alt="" />
    <figcaption>Tableau des scores</figcaption>
  </figure>
  <p data-score="&#9733; &#9733; &#9733;&#9733; &#9734;">Score</p>
  
  <button id="new_game">
    Cliquer ici pour commencer une nouvelle partie
  </button>
  <!-- <span id="span_counts"></span> -->
  <!-- <span id=""span_attemps></span> -->
  <!-- <div id="rank1" class="rank"></div> -->
  <!-- <div id="rank2" class="rank"></div>
  <div id="rank3" class="rank"></div>
  <div id="rank4" class="rank"></div>
  <div id="rank5" class="rank"></div> -->
</div>
</main>
<footer>
  <div id="timer_area">
    <p data-timer=" 00.00"></p>
  </div>
</footer>
<script src="../js/script.js"></script>
</body>
</html>
