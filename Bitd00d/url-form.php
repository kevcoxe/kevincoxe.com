<?php
 
$url = $_POST['url'];


$parsed = parse_url($url);
if(!isset($parsed['scheme']))
{
	$url = "http://$url";
}
if(filter_var($url, FILTER_VALIDATE_URL))
{
	header("location: initialize.php?url=" . $url);
	exit();
} else {
	header("location: index.html");
	exit();
}


?>