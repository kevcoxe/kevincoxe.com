/*var Q = Quintus()
        .include("Sprites, Scenes, Input, 2D, Touch, UI")
        .setup({ maximize:true })
        .controls().touch();*/
var Q = window.Q = Quintus()
        .include("Sprites, Scenes, Input, 2D, Anim, Touch, UI")
        .setup({ maximize: true })
        .controls().touch();
        
// Define custom key mappings
Q.KEY_NAMES.Q = 81;
Q.KEY_NAMES.E = 69;
Q.KEY_NAMES.W = 87;
Q.KEY_NAMES.A = 65;
Q.KEY_NAMES.S = 83;
Q.KEY_NAMES.R = 82;
Q.KEY_NAMES.D = 68;
Q.KEY_NAMES.E = 69;
Q.KEY_NAMES.F = 70;
Q.KEY_NAMES.T = 84;
Q.KEY_NAMES.ESC = 27;
Q.KEY_NAMES.SPACE = 32;
Q.KEY_NAMES.ONE   = 49;
Q.KEY_NAMES.TWO   = 50;
Q.KEY_NAMES.THREE = 51;
Q.KEY_NAMES.FOUR  = 52;
Q.KEY_NAMES.FIVE  = 53;
Q.KEY_NAMES.SIX   = 54;
Q.KEY_NAMES.SEVEN = 55;
Q.KEY_NAMES.BACKSPACE = 8;

// Key actions
Q.input.keyboardControls({
  UP:     'up',  
  LEFT:   'left',   A: 'left',
  DOWN:   'down',   S: 'down',
  RIGHT:  'right',  D: 'right',
  SPACE:  'cast',
  SHIFT:  'enter', 
  ESC:    'restart',
  Q:      'fireEle',
  W:      'waterEle',
  E:      'earthEle',
  R:      'windEle',
  F:      'sword',
  T:      'clear',
  ONE:    'wep1',
  TWO:    'wep2',
  THREE:  'wep3',
  FOUR:   'wep4',
  FIVE:   'wep5',
  SIX:    'wep6',
  SEVEN:  'wep7',
  BACKSPACE:  'pause',
});

// Some useful constants for speeding things up.
var TO_RAD = Math.PI / 180;
var TO_DEG = 180 / Math.PI;

// Set initial game state.
Q.state.set({ 
  player_health: 3,
  element0: "none",
  element1: "none",
});

Q.load("player.json, player.png,"+ 
        "enemy.json, enemy.png,"+
        "tower.json, tower.png,"+
        "fire.json, fire.png,"+
        "water.json, water.png,"+
        "earth.json, earth.png,"+
        "wind.json,wind.png,"+
        "ice.json,ice.png,"+
        "wave.json,wave.png,"+
        "rock.json,rock.png,"+
        "smallfire.json,smallfire.png,"+
        "fireball.json,fireball.png,"+
        "clear.json,clear.png, tiles.png,"+
        "level1.json, heart.png, heart.json,"+
        "shield.png, shield.json,"+
        "coin.png, coin.json, door.png, door.json", function() {
        
    Q.sheet("tiles","tiles.png", { tilew: 32, tileh: 32 });
    Q.compileSheets("player.png","player.json");
    Q.compileSheets("enemy.png","enemy.json");
    Q.compileSheets("tower.png","tower.json");
    Q.compileSheets("fire.png","fire.json");
    Q.compileSheets("water.png","water.json");
    Q.compileSheets("earth.png","earth.json");
    Q.compileSheets("wind.png","wind.json");
    Q.compileSheets("clear.png","clear.json");
    Q.compileSheets("fireball.png","fireball.json");
    Q.compileSheets("heart.png","heart.json");
    Q.compileSheets("shield.png","shield.json");
    Q.compileSheets("rock.png","rock.json");
    Q.compileSheets("coin.png","coin.json");
    Q.compileSheets("ice.png","ice.json");
    Q.compileSheets("smallfire.png","smallfire.json");
	Q.compileSheets("door.png", "door.json");
    Q.compileSheets("wave.png", "wave.json");
    Q.animations("enemy", {   
      blue: { frames: [1], rate: 1/10 },
      stand: { frames: [0], rate: 1/10 },
    });
    Q.animations("player", {   
      cast_magic: { frames: [0,1,0], rate: 1/10, loop :false },
      stand: { frames: [0], rate: 1/10 },
      duck: { frames: [2,0], rate: 1/5, loop :false },
      jump: { frames: [3,0], rate: 3/4, loop :false },
      die: { frames: [4], rate: 1/4, loop :false },
    });
    
    Q.stageScene("level1", 0);
    Q.stageScene("ui", 1, Q('Player').first().p);
    Q.stageScene("hud", 3, Q('Player').first().p);
});
