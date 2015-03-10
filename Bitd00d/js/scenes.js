
//---------------------------------
var thisStage;

var height_boundry;
var width_boundry;

Q.scene("level1",function(stage) {
  //getHtml("http://www.google.com");
  thisStage = stage;
  tilelayer = new Q.TileLayer({ dataAsset: 'level1.json', sheet: 'tiles' });
  stage.collisionLayer(tilelayer);
  var player = stage.insert(new Q.Player({x: 30, y: 90,}));
  
  
  $.getJSON('data/levelData.json', function(response){
       //JSON = response;
       var doorLoc = response.doors;
       var addressLoc = response.addresses;
       width_boundry = response.width * 30;
       height_boundry = response.height * 30;
       console.log(" width " + width_boundry);
	     for (i in response.doors) {
			 door = response.doors[i];
			 console.log(door[0] + " " + door[1]);
				stage.insert(new Q.Door({x: door[0], y: door[1], address: response.addresses[i]}));
       // window.location = "initialize.php?url=" + response.addresses[i];
        console.log(" width " + width_boundry);
        //stage.insert(new Q.Player({ x: width_boundry - 30, y: 30,}));
	    }
        for (var i = width_boundry - 30; i >= 60; i -= 90) {
          stage.insert(new Q.Enemy({ x: i, y: 60 }));
        };
	   //alert(doorLoc);
	   //alert(doorLoc.length);
	   
 });

  stage.add("viewport").follow(Q("Player").first());
  

});

//----------------------------------

Q.scene('endGame',function(stage) {
  var box = stage.insert(new Q.UI.Container({
    x: Q.width/2, y: Q.height/2, fill: "rgba(0,0,0,0.5)"
  }));
  
  var button = box.insert(new Q.UI.Button({ x: 0, y: 0, fill: "#CCCCCC",
                                           label: "Play Again" }))         
  var label = box.insert(new Q.UI.Text({x:10, y: -10 - button.p.h, 
                                        label: stage.options.label }));
  button.on("click",function() {
    Q.clearStages();
    Q.state.set("player_health", 100);
    Q.stageScene("level1", 0);
    Q.stageScene("ui", 1, Q('Player').first().p);
    Q.stageScene("hud", 3, Q('Player').first().p);
  });
  box.fit(20);
});

Q.scene('restart',function(stage) {
  var box = stage.insert(new Q.UI.Container({
    x: Q.width/2, y: Q.height/2, fill: "rgba(0,0,0,0.5)"
  }));
  
  var button = box.insert(new Q.UI.Button({ x: 0, y: 0, fill: "#CCCCCC",
                                           label: "Play Again" }))         
  var label = box.insert(new Q.UI.Text({x:10, y: -10 - button.p.h, 
                                        label: stage.options.label }));
  button.on("click",function() {
    Q.clearStages();
    Q.state.set("player_health", 100);
    Q.stageScene("level1", 0);
    Q.stageScene("ui", 1, Q('Player').first().p);
    Q.stageScene("hud", 3, Q('Player').first().p);
  });
  box.fit(20);
});