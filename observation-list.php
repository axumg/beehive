<!DOCTYPE html>

<html>
<head>
    <title>Beehive Prototype Home</title>
    <meta charset="UTF-8">
</head>

<body>
    
<table>
    
<?php
    foreach ($observation_list as $row) {
        
        echo'<tr>';
        echo '<td>' ,  $row['hive_name'], '</td>';
        echo '<td>' ,  $row['observation_date'], '</td>';
        echo '<td>' ,  $row['duration'], '</td>';
        echo '<td>' ,  $row['mite_count'], '</td>';
    
        echo '</tr>';
    }
?>
</table>
    
</body>
</html>
