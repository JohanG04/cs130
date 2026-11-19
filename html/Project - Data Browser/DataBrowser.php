<?php

/*
    $username = "";
    $password = "";
    
    // mysql
    $c = mysql_connect("example.com", "user", "password");
    mysql_select_db("database");
    $result = mysql_query("SELECT 'Hello, dear MySQL user!' AS _message FROM DUAL");
    $row = mysql_fetch_assoc($result);
    echo htmlentities($row['_message']);
*/
    function get_objects(){
        //Eventually get objects from the Database
        $villagerArr = [];
        $villagers = fopen("AC Villagers.csv", 'r');

        if ($villagers !== false){
            while($line = fgetcsv($villagers)){
                echo json_encode($line);
            }
        }

    }

    get_objects();
?>