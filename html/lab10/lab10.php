
<?php
$json = $_REQUEST["arr"];

$arr = json_decode($json);

$avg = 0;
$median = 0;
$stdev = 0;

//set maximum and minimum of array
$min = min($arr);
$max = max($arr);

//size of array
$n = sizeof($arr);


//get average of array
function get_average($arr){
    $sum = 0;
    foreach($arr as $i){
        $sum += $i;
    }

    return $sum/sizeof($arr);
}
    
//get standard deviation of array
function get_stdev($arr, $avg){
    $sum = 0;
    foreach($arr as $i){
        $sum = $i - $avg;
    }

    return sqrt(pow($sum, 2) / sizeof($arr));
}

$avg = get_average($arr);
$stdev = get_stdev($arr, $avg);
sort($arr);
$median = $arr[floor(sizeof($arr)/2)];


echo json_encode(array("avg"=>$avg, "median"=>$median, "stdev"=>$stdev, "min"=>$min, "max"=>$max));

?>
