<?php

class ObservationModel {
    var $db;
    
    public function __construct(PDO $db) {
        
        $this->db=$db;
    }   
    
   
    public function getAllObservation() {
   
       return $this->db->query('SELECT * FROM observation');
   
    }
}

?>
