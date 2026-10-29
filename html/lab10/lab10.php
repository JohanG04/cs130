<!DOCTYPE html>

<html>
    <head>
        <meta charset="utf-8">
        <title>Lab 10 - CSCI 130</title>
    </head>

    <body>
        <?php
        if ($_POST["n_value"]){
            echo "N = ". $_POST["n_value"] ."";
        }
        ?>

        <div>
            <form action="<?php $_PHP_SELF?>" method="POST">n =
                <input name="n_value" id="n_value" type="text" value=0>
                <input type="submit" value="Enter" id="n_button">
            </form>
            <input type="button" value="Fill Random"  id="fill_button">
        </div>

        <div>
            <h3>Current Array:</h3>
            <p id="curr_arr">[]</p>
        </div>
        
        <script src="lab10.js"></script>
    </body>
</html>