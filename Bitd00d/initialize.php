<html>
  <head>
    <!-- Pull the engine from the Quintus CDN or load it locally -->
<?php

    include('simple_html_dom.php');
    
    function genEmptyLevelArray($text) {
		
		//$width = substr_count($text, "div");
		$width = count($text->find('<div'));
        $height = 15;
		return array_fill(0, $height, array_fill(0, $width, '0'));
	}
    
    function genFloor($levelArray, $text) {
		for($i = 0; $i < count($levelArray); $i++) {
            
            for ($j = 0; $j < count($levelArray[$i]); $j++) {
                if ($i == 0 or $j == 0 or $i+1==count($levelArray) or $j+1==count($levelArray[$i])) {
					$levelArray[$i][$j] = 2;
				}
                //if ($i + 1 == count($levelArray)) {
				//	$levelArray[$i][$j] = 1;
				//}
			}
		}
        return $levelArray;
	}
    
    function genDivs(&$levelArray, $text, $xdiv, $ydiv) {
        for( $i = 1; $i < count($levelArray) - 1; $i++) {
            
            for( $j = 1; $j < count($levelArray[$i]) - 1; $j++) {
                
                if( $j >= $xdiv and $j <= $xdiv +4 and $i >= $ydiv and $i <= $ydiv +1) {
                    $levelArray[$i][$j] = 1;
                }
            }
        }
        
        return $levelArray;
	}
    
    function genDoors($levelArray, $text, $xdoor, $ydoor) {
        for( $i = 0; $i < count($levelArray); $i++) {
            
            for( $j = 0; $j < count($levelArray[$i]); $j++) {
                
                if( $j == $xdoor and $i >= $ydoor and $i <= $ydoor +1) {
                    $levelArray[$i][$j] = 3;
                }
            }
        }
        
        return $levelArray;
	
	}
    
    function genTreasure($levelArray, $text) {
	
	}
    
    function genMonsters($levelArray, $text) {
	
	}
	function getAsString($levelArray) {
		///*
		$str = "[\n";
		for($i = 0; $i < count($levelArray); $i++) {
			$str .= " [ ";
            
            for ($j = 0; $j < count($levelArray[$i]); $j++) {	
				$str .= $levelArray[$i][$j];
                
                if ($j + 1 == count($levelArray[$i])) {
                
                } else {
                    $str .= ",";
                }
            }
            
            if ($i + 1 == count($levelArray)) {
				$str .= "]";
			} else {
				$str .= "],\n";
			}
			
		}
		$str .= "\n]\n";
		return $str;
	}
	function genColors($levelArray, $text) {
		//$pattern = "[0-9a-fA-F]{6}";
		//preg_match_all($pattern, $text, $matches);
	}
	
    // Create DOM from URL or file
    //if(isset($_GET['url'])) {
    //    $url = $_GET['url'];
    //print($url."\n");
    $url = NULL;
    if(isset($_GET['url'])) { //"http://www.google.com";
        $url = $_GET['url'];
    }
    
    if ($url == NULL) $url = "http://www.google.com";
        $html = file_get_html($url);
		$text = $html;
        $count = 0;
        $height = 15;
        $y = 100;
        $file = 'level1.json';
        $dir = 'data';
        $dataFile = fopen("$dir/$file", 'wb');

        //$levelArr = array_fill(0, 15, array_fill(0, 10, 0));
        
        //$current = "[\n";
		
		$levelArray = genEmptyLevelArray($text);
		$levelArray = genFloor($levelArray, $text);
		$doors = array();
		
		//genTreasure($levelArray, $text);
		//genMonsters($levelArray, $text);
		$width = count($text->find("<div"));
        $height = 15;
        $links = count($text->find('<a href='));
		$linkAdresses = array();
        $numbreaks = count($text->find('<br'));
		$seed = 3145;
		srand($seed);
        for( $i = 1; $i < $width - 1; $i++) {
            $var1 = ($i * $i * rand(1, $numbreaks * $links)) % $width;
            $var2 = ($i * $i * rand(1, $numbreaks * $links)) % $height;
            $levelArray = genDivs($levelArray, $text, $var1, $var2);
        }
		//$numDoors = 1;
		$matches = array();
		$numDoors = 0;
		foreach($text->find('a') as $element) 
			if (substr($element->href, 0, 7) ==  'http://') {
				$matches[$numDoors] = $element->href;
				$numDoors++;
			}
		for ( $i = 0; $i < $numDoors && $i < 8; $i++) {
            $doorX =  ($i * $i * rand(1, $numbreaks * $links)) % $width;
            $doorY =  ($i * $i * rand(1, $numbreaks * $links)) % $height;
			//$levelArray = genDoors($levelArray, $text, $var1, $var2);
			
			if ($levelArray[$doorY][$doorX] == 0) {
				$doors[$i] = array((int)$doorX * 32, (int)$doorY * 32);
				$linkAdresses[$i] = $matches[$i];
				
			} else {
				$doorX =  ($i * $i * rand(1, $numbreaks * $links)) % $width;
            	$doorY =  ($i * $i * rand(1, $numbreaks * $links)) % $height;
            	if ($levelArray[$doorY][$doorX] == 0) {
					$doors[$i] = array((int)$doorX * 32, (int)$doorY * 32);
					$linkAdresses[$i] = $matches[$i];
					break;
				}
				
			}
        }
		

		file_put_contents("$dir/$file", getAsString($levelArray));
		//$doors = array(
		//	array(0,0),
		//	array(1,1),
		//	array(3,2)
		//);
		//$colors = genColors($levelArray, $text);
		$levelData = array(
			'width' => count($levelArray[0]),
			'height' => $height,
			'doors' => $doors,
			'addresses' => $linkAdresses
			//'colors' => $colors
		);
		file_put_contents("data/levelData.json", json_encode($levelData));
		//$file = fopen('data/levelData.json', 'w+');
		//fwrite($file, json_encode($levelData));
		fclose($file);
		
		
		
    ?>

    
    
    
    
    
    
    
    <!-- (use quintus-all.min.js for production) -->
    <script src='http://cdn.html5quintus.com/v0.2.0/quintus-all.js'></script>
	<script type="text/javascript" src="http://code.jquery.com/jquery-1.7.1.min.js"></script>
  </head>
   <body>
   <script type="text/javascript" src='js/game.js'></script>
   <script type="text/javascript" src='js/components.js'></script>
   <script type="text/javascript" src='js/entities.js'></script>
   <script type="text/javascript" src='js/scenes.js'></script>
   <script type="text/javascript" src='js/ui.js'></script>
  <!--<canvas id='testGame' width='100%' height='100%'></canvas>-->

   </body>
</html>
