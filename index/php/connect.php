<?php
try{

   // connection a la Db
     $user = "root";
    $pass = "";
    
    $db = new PDO('mysql:host=localhost;dbname=memory_games', $user , $pass, [
        PDO::ATTR_ERRMODE , PDO:: ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_OBJ
    ]);

    $error =null;

}catch(PDOException $e ){
        $error = $e -> getMessage();
    }

?>

<?php if ($error): ?>
    <div class =" alert alert-danger"> <?= $error ?> </div>

    <?php else : ?>
    <p> Vous etes connecter a la db </p>

<?php endif ?>