<?php
    //SERVER SIDE EW
    //NEEDS TO READ TEXT FILE AND SEND WORD TO CLIENT SIDE
    //ALSO VALIDATE IF WORD IS INSIDE WORD LIST

    function request_type(){
        //If the request is to get a word
        if ($_GET['req'] == "word"){
            get_word();
        }
        //If the request is to check a word
        else if ($_GET['req'] == "check"){
            check_word();
        }
    }

    function get_word(){
        $wordsfile = new SplFileObject("wordlist/5-letters.txt");

        //go to chosen random line from file, random 5 letter word
        $wordsfile->seek(rand(0, 5507));
        $chosenword = $wordsfile->current();
        //remove all whitespace
        $chosenword = preg_replace('/\s+/', '', $chosenword);
        $wordsfile = null;
        //send chosen word to js
        echo json_encode($chosenword);
    }

    function check_word(){
        $inlist = FALSE;
        $userword = json_decode($_GET['word']);
        $wordsfile = fopen("wordlist/5-letters.txt", 'r');

        while(($line = fgets($wordsfile)) !== false){
            if (strpos($line, $userword) !== false){
                $inlist = TRUE;
                break;
            }
        }

        echo json_encode($inlist);
    }
    //exit script and return requested object
    request_type();
?>