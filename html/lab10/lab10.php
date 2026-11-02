<?php
//$json = $_GET[];

//$arr = json_decode($json);

$avg = 0;
$sum = 0;
$median = 0;
$stdev = 0;
$min = min($_GET);
$max = max($_GET);
$n = 0;

foreach($_GET as $i){
    $sum += $i;
    $n += 1;
}
    
$avg = $sum/$n;
    
foreach($_GET as $i){
    $stdev = $i - $avg;
}

sort($_GET);
$median = $_GET[floor($n/2)];

$stdev = sqrt(pow($stdev, 2) / $n);

echo json_encode(array("avg"=>$avg, "median"=>$median, "stdev"=>$stdev, "min"=>$min, "max"=>$max));
?>