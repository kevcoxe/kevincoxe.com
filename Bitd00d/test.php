<url = http://www.googl.com>
<?php

include('simple_html_dom.php');

// Create DOM from URL or file
    //$url = $_GET['url'];
    //print($url."\n");
    $html = file_get_html($url);
    $count = 0;
    $x = 150;
    $y = 100;
    //$file = 'level1.json';
    //$dir = 'data';
    //$current = file_get_contents("$dir/$file");

    $levelArr = array_fill(0, 15, array_fill(0, 10, 1));
    
    //$current .= "[\n";

    //for($j = 0; $j < 150; $j++) {
    //    // Find all images
    //    $current .= "[";
    //    foreach($html->find('div') as $element) {
    //        //print("found div tag"."\n");
    //        $current .= "1,";
    //        $count++;
    //    }
    //    if($j == 149) 
    //        $current .= "1]\n";
    //    else
    //        $current .= "1],\n";
    //    
    //}
    //$current .= "]\n";
    //
    //file_put_contents("$dir/$file", $current); 
    
    
    //// Find all links
    //foreach($html->find('script') as $element) {
    //    //print("found script tag"."\n");
    //    $count++;
    //}
    //
    //foreach($html->find('html') as $element) {
    //    //print("found html tag"."\n");
    //    $count++;
    //}
    //
    //foreach($html->find('body') as $element) {
    //    //print("found body tag"."\n");
    //    $count++;
    //}
    //
    //foreach($html->find('a') as $element) {
    //    //print("found a link!!!"."\n");
    //    $count++;
    //}
    
    //print($count."\n");
	$data = array("NUMBER", $levelArr);
	echo json_encode($data);
?>

