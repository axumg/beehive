<?php

try {
    //Instantiate a database object
    $hostname = 'localhost';
    $database_name = 'axum_bee_database';
    $username = 'axum_bee';
    $password = '1q1q1q';
    $db= new PDO("mysql:host=$hostname;dbname=$database_name", $username, $password);
    echo 'Connected to database';
}
catch(PDOException $e) {
    echo $e->getMessage();
}
  include 'models/observationmodel.php';
  
  $obsModel = new ObservationModel($db);
  
    //public function getAllObservations 
  $observation_list = $obsModel->getAllObservation();
    
    include 'views/observation-list.php';
    
    $db= null;

?>
