Q.scene("ui", function(stage){

  //--------------------------------------

  var health_cont = stage.insert(new Q.UI.Container({
    border: 2,
    fill: "#fff",
    opacity: .5,
    w: 200,
    h: 60,
    x: 150,
    y: Q.height - 40,
  }));

  for (var i = stage.options.hp; i > 0; i--) {
      stage.insert(new Q.Heart({ x: 50 + (30 * i), y: health_cont.p.y }));  
  };
 
  // health label
  var health_label = stage.insert(new Q.UI.Text({
   color: "#f00",
   size: 40,
    x: 0,
    w: 200,
    //label: "Health: " + Q.state.get("hp"),
    label: " ",
  }), health_cont); 

  // Update player_health label.
  Q.state.on("change.player_health", function(){
    health_label.p.label = " "  
    for (var i = 5; i > 0; i--) {
      stage.insert(new Q.Clear({ x: 50 + (30 * i), y: health_cont.p.y }));  
    };
    for (var i = stage.options.hp; i > 0; i--) {
      stage.insert(new Q.Heart({ x: 50 + (30 * i), y: health_cont.p.y }));  
    };
  });
  
  health_cont.fit(20,100);

  //--------------------------------------

  var shield_cont = stage.insert(new Q.UI.Container({
    border: 2,
    fill: "#fff",
    opacity: .5,
    w: 200,
    h: 60,
    x: 450,
    y: Q.height - 40,
  }));

  for (var i = stage.options.shield; i > 0; i--) {
      stage.insert(new Q.Shield({ x: shield_cont.p.x - 100 + (30 * i), y: shield_cont.p.y }));  
  };
 
  // shield label
  var shield_label = stage.insert(new Q.UI.Text({
   color: "#00f",
   size: 40,
    x: 0,
    w: 200,
    //label: "Shield: " + stage.options.shield,
    label: " ",
  }), shield_cont); 

  // Update player_shield label.
  Q.state.on("change.player_shield", function(){
    //shield_label.p.label = "Shield: " + stage.options.shield
    shield_label.p.label = " "
    for (var i = 2; i > 0; i--) {
      stage.insert(new Q.Clear({ x: shield_cont.p.x - 100 + (30 * i), y: shield_cont.p.y }));  
    };
    for (var i = stage.options.shield; i > 0; i--) {
      stage.insert(new Q.Shield({ x: shield_cont.p.x - 100 + (30 * i), y: shield_cont.p.y }));  
    };
  });
  
  shield_cont.fit(20,100);


});

//--------------------------------------

Q.scene("hud", function(stage){

  var element_cont = stage.insert(new Q.UI.Container({
    border: 2,
    fill: "#fff",
    opacity: .5,
    w: 200,
    h: 60,
    x: 150,
    y: 40,
  }));

  // element label
  var element_label = stage.insert(new Q.UI.Text({
   color: "#000",
   size: 20,
    x: -10,
    w:200,
    label: "Element: ",
  }), element_cont);

  // Update element label.
  Q.state.on("change.element0", function(){

    if (Q.state.get("element0") == "Fire") {
      stage.insert(new Q.Fire({ x: element_cont.p.x + (element_label.p.x + 60), y: element_cont.p.y }));  
    } else if (Q.state.get("element0") == "Water") {
      stage.insert(new Q.Water({ x: element_cont.p.x + (element_label.p.x + 60), y: element_cont.p.y }));  
    } else if (Q.state.get("element0") == "Earth") {
      stage.insert(new Q.Earth({ x: element_cont.p.x + (element_label.p.x + 60), y: element_cont.p.y }));  
    } else if (Q.state.get("element0") == "Wind") {
      stage.insert(new Q.Wind({ x: element_cont.p.x + (element_label.p.x + 60), y: element_cont.p.y }));  
    } else {
      stage.insert(new Q.Clear({ x: element_cont.p.x + (element_label.p.x + 60), y: element_cont.p.y }));  
    };

    element_label.p.label = "Element: "
    
  });

  Q.state.on("change.element1", function(){

    if (Q.state.get("element1") == "Fire") {
      stage.insert(new Q.Fire({ x: element_cont.p.x + (element_label.p.x + 90), y: element_cont.p.y }));  
    } else if (Q.state.get("element1") == "Water") {
      stage.insert(new Q.Water({ x: element_cont.p.x + (element_label.p.x + 90), y: element_cont.p.y }));  
    } else if (Q.state.get("element1") == "Earth") {
      stage.insert(new Q.Earth({ x: element_cont.p.x + (element_label.p.x + 90), y: element_cont.p.y }));  
    } else if (Q.state.get("element1") == "Wind") {
      stage.insert(new Q.Wind({ x: element_cont.p.x + (element_label.p.x + 90), y: element_cont.p.y }));  
    } else {
      stage.insert(new Q.Clear({ x: element_cont.p.x + (element_label.p.x + 90), y: element_cont.p.y }));  
    };

    element_label.p.label = "Element: "
    
  });

  //------------------------------

  var coin_cont = stage.insert(new Q.UI.Container({
    border: 2,
    fill: "#fff",
    opacity: .5,
    w: 200,
    h: 60,
    x: element_cont.p.x + element_cont.p.w + 20,
    y: 40,
  }));

  // coin label
  var coin_label = stage.insert(new Q.UI.Text({
   color: "#000",
   size: 20,
    x: 20,
    w:200,
    label: " " + stage.options.coins,
  }), coin_cont);

  Q.state.on("change.player_shield", function(){
    coin_label.p.label = " " + stage.options.coins;
  });

  stage.insert(new Q.Coin({ x: element_cont.p.x + element_cont.p.w - 20 , y: coin_cont.p.y }));


});

//--------------------------------------