
Q.Sprite.extend("Player",{
  init: function(p) {
    this._super(p, { sheet: "player", 
        x: 60, 
        y: 60,
        sprite: "player",
        collisionMask: Q.SPRITE_ENEMY | Q.SPRITE_ACTIVE | Q.SPRITE_DEFAULT,
        type: Q.SPRITE_PLAYER,
        queue: 0,
        ele1: 0,
        ele2: 0,
        hp: 5,
        coins: 5,
        shield: 2,
        direction: "right"});
    
    this.add('2d, platformerControls,animation');
    
    Q.input.on("left", this, "checkMovement");
    Q.input.on("right", this, "checkMovement");
    Q.input.on("up", this, "checkMovement");
    Q.input.on("down", this, "checkMovement");
    Q.input.on("fireEle", this, "fireEle");
    Q.input.on("waterEle", this, "waterEle");
    Q.input.on("earthEle", this, "earthEle");
    Q.input.on("windEle", this, "windEle");
    Q.input.on("cast", this, "cast");
    Q.input.on("restart", this, "restart");
    Q.input.on("clear", this, "clear");
    

    this.on("hit.sprite",function(collision) {
      if(collision.obj.isA("Tower")) {
        Q.stageScene("endGame",1, { label: "You Won!" }); 
        this.destroy();
      } 
      else if(collision.obj.isA("Coin")) {
        collision.obj.destroy();
        this.p.coins += 5;
        Q.stageScene('hud', 3, this.p);
      } else if(collision.obj.isA("Door")) {
        
        window.location = "initialize.php?url=" + collision.obj.p.address;

      }
    });
    
  },
  fireEle: function(){    

    if (this.p.queue <2){
        if (this.p.queue == 0){
            this.p.ele1 = 1;
        }
        else{
            this.p.ele2 = 1;
        }
        Q.state.set("element" + this.p.queue, "Fire");
        this.p.queue++; 
        //Q.stage().insert(new Q.Fire({ x: 30*this.p.queue, y: -20 }));
    }
  },
  waterEle: function(){
    if (this.p.queue <2){
        if (this.p.queue == 0){
            this.p.ele1 = 2;
        }
        else{
            this.p.ele2 = 2;
        }
        Q.state.set("element" + this.p.queue, "Water");
        this.p.queue++;
        //Q.stage().insert(new Q.Water({ x: 30*this.p.queue, y: -20 }));
    }
  },
  earthEle: function(){
    if (this.p.queue <2){
        if (this.p.queue == 0){
            this.p.ele1 = 3;
        }
        else{
            this.p.ele2 = 3;
        }
        Q.state.set("element" + this.p.queue, "Earth");
        this.p.queue++;
        //Q.stage().insert(new Q.Earth({ x: 30*this.p.queue, y: -20 }));
    }
  },
  windEle: function(){
    if (this.p.queue <2){
        if (this.p.queue == 0){
            this.p.ele1 = 4;
        }
        else{
            this.p.ele2 = 4;
        }
        Q.state.set("element" + this.p.queue, "Wind");
        this.p.queue++;
        //Q.stage().insert(new Q.Wind({ x: 30*this.p.queue, y: -20 }));
    }
  },
  cast: function(){
    Q.state.set("element0", "Clear");
    Q.state.set("element1", "Clear");
    console.log(this.p.ele1+ " "+ this.p.ele2);

    //Fireball
    if (this.p.ele1 == 1 && this.p.ele2 == 1){
        if (this.p.coins >= 2) {
          if (this.p.direction =="left"){
            Q.stage().insert(new Q.Fireball({ x: this.p.x-35, y: this.p.y, flip: "x", defaultDirection: 'left', vx: -300}));
          }
          else{
             Q.stage().insert(new Q.Fireball({ x: this.p.x+35, y: this.p.y , vx: 300}));        
          }  
          this.p.coins -= 2;
          Q.stageScene('hud', 3, this.p);          
        }        
    } 
    //Shield
    if (this.p.ele1 == 3 && this.p.ele2 == 3){
      if (this.p.coins >= 2) {
        if (this.p.shield <= 5) {
          this.p.coins -= 2;
          Q.stageScene('hud', 3, this.p);
          this.p.shield++;
          Q.stageScene('ui', 1, this.p);
        }
      }
    };
    //SmallFire
    if (this.p.ele1 == 1 && this.p.ele2 == 0){
        if (this.p.direction =="left"){
          if (this.p.coins >= 1) {
            Q.stage().insert(new Q.SmallFire({ x: this.p.x-35, y: this.p.y, flip: "x", defaultDirection: 'left', vx: -300}));
            this.p.coins -= 1;
            Q.stageScene('hud', 3, this.p);
          };
        }
        else{
          if (this.p.coins >= 1) {
            Q.stage().insert(new Q.SmallFire({ x: this.p.x+35, y: this.p.y , vx: 300}));
            this.p.coins -= 1;
            Q.stageScene('hud', 3, this.p);
          };
        }
    }
    //Ice
    if (this.p.ele1 == 2 && this.p.ele2 == 4 || this.p.ele1 == 4 && this.p.ele2 == 2){
        if (this.p.direction =="left"){
          if (this.p.coins >= 2) {
            Q.stage().insert(new Q.Ice({ x: this.p.x-35, y: this.p.y, flip: "x", defaultDirection: 'left', vx: -400}));
            this.p.coins -= 2;
            Q.stageScene('hud', 3, this.p);
          };
        }
        else{
          if (this.p.coins >= 2) {
            Q.stage().insert(new Q.Ice({ x: this.p.x+35, y: this.p.y , vx: 400}));
            this.p.coins -= 2;
            Q.stageScene('hud', 3, this.p);
          };
        }
    }
    
    //Wave
    if (this.p.ele1 == 2 && this.p.ele2 == 2){
        if (this.p.coins >= 2) {
            if (this.p.direction =="left"){  
              if (this.p.coins >= 10) {
                Q.stage().insert(new Q.Wave({ x: this.p.x-35, y: this.p.y, flip: "x", defaultDirection: 'left', vx: -150}));
                this.p.coins -= 10;
                Q.stageScene('hud', 3, this.p);
              }
            }
            else{
              if (this.p.coins >= 10) {
                Q.stage().insert(new Q.Wave({ x: this.p.x+35, y: this.p.y ,defaultDirection: 'right', vx: 150}));
                this.p.coins -= 10;
                Q.stageScene('hud', 3, this.p);
              }
            }
        }
    }
    
    //Rock
    if (this.p.ele1 == 3 && this.p.ele2 == 0){
        if (this.p.direction =="left"){
          if (this.p.coins >= 1) {
            Q.stage().insert(new Q.Rock({ x: this.p.x-35, y: this.p.y, flip: "x", defaultDirection: 'left', vx: 0}));
            this.p.coins -= 1;
            Q.stageScene('hud', 3, this.p);
          };
        }
        else{
          if (this.p.coins >= 1) {
            Q.stage().insert(new Q.Rock({ x: this.p.x+35, y: this.p.y , vx: 0}));
            this.p.coins -= 1;
            Q.stageScene('hud', 3, this.p);
          };
        }
    }
    
    this.p.ele1 = 0;
    this.p.ele2 = 0;
    this.play("cast_magic");
    this.p.queue = 0;
    
  },
  checkMovement: function(){
    
    if (this.p.direction == "right"&&Q.inputs['left']){
      //  console.log(this.p.direction);
        this.p.flip="x";
        this.play("stand");
    }
    if (this.p.direction == "left"&&Q.inputs['right']){
     //   console.log(this.p.direction );
        this.p.flip=false;
        this.play("stand");
    }
    if (Q.inputs['down']){
     //   console.log(this.p.direction );
       // this.p.flip=false;
        this.play("duck");
    }
    if (Q.inputs['up']){
     //   console.log(this.p.direction );
       // this.p.flip=false;
        this.play("jump");
    }
  },
  restart: function(){
    Q.clearStages();
    Q.state.set("player_health", 100);
    Q.stageScene("level1", 0);
    Q.stageScene("ui", 1, Q('Player').first().p);
    Q.stageScene("hud", 3, Q('Player').first().p);
  },
  clear: function(){
    Q.state.set("element0", "Clear");
    Q.state.set("element1", "Clear");
    this.p.ele1 = 0;
    this.p.ele2 = 0;
    this.p.queue = 0;
  }
});

Q.Sprite.extend("Door",{
	init: function(p) {
    address: "http://www.umbc.edu",
		this._super(p, { sheet: 'door', gravity : 0});
		this.add('2d'); 
	}

});

Q.Sprite.extend("Fireball",{
  init: function(p) {
    this._super(p, { damage: 1000, sheet: 'fireball', gravity : 0});
    this.add('2d');
    
    this.on("bump.left,bump.right,bump.top,bump.down",function(collision) {
      if(collision.obj.isA("Enemy")) {
		 collision.obj.destroy();
         Q.stage().insert(new Q.Coin({ x: this.p.x+10, y: this.p.y}));
      } 
      if(collision.obj.isA("Rock")) {
		 collision.obj.destroy();
      } 
      this.destroy();
    });
	}
});

Q.Sprite.extend("Wave",{
  init: function(p) {
    this._super(p, { damage: 1000, sheet: 'wave'});
    this.add('2d');
    
    this.on("bump.left,bump.right,bump.top,bump.down",function(collision) {
      if(collision.obj.isA("Enemy")) {
		    collision.obj.destroy();
      } 
      else if(collision.obj.isA("Rock")) {
		    collision.obj.destroy();
      } 
      else if(collision.obj.isA("Coin")) {
        collision.obj.destroy();
      }
      else{
        this.destroy();
      }
      if (this.p.defaultDirection=="right"){
          this.p.vx = 100;
      }
      else{
          this.p.vx = -100;
      }
    });
	}
});

Q.Sprite.extend("SmallFire",{
  init: function(p) {
    this._super(p, { damage:100,sheet: 'smallfire' , gravity : 0});
    this.add('2d');
    
    this.on("bump.left,bump.right,bump.top,bump.down",function(collision) {
       // console.log(collision.obj);
       // console.log(this.p.x+ " "+this.p.y);
       // collision.obj.setTile(this.p.x/32,this.p.y/32,0);
        /*if(collision.obj.p.sheet=="tiles") { 
            console.log("ASDASD");
            console.log(collision.obj);
            console.log(collision.obj.getTilePropertiesAt());
            collision.obj.setTile(0,0,0);
        } */
        
      if(collision.obj.isA("Enemy")) { 
		collision.obj.destroy();
        Q.stage().insert(new Q.Coin({ x: this.p.x+10, y: this.p.y}));
      } 
      this.destroy();
	});
  }
});

Q.Sprite.extend("Ice",{
  init: function(p) {
    this._super(p, { damage: 1000, sheet: 'ice' , gravity : 0});
    this.add('2d');
    
    this.on("hit",function(collision) {
      if(collision.obj.isA("Enemy")) { 
        //console.log(collision.obj);
        //console.log(collision.obj.vx);
        //collision.obj.vx = 0;
        //console.log(collision.obj.vx);
		    //collision.obj.p.play("freeze");
        collision.obj.freeze();
        //collision.obj.p.vx = 0;

      } 
      this.destroy();
    });
   }
});

Q.Sprite.extend("Rock",{
    init: function(p) {
    this._super(p, { damage: 1000, sheet: 'rock' , gravity : 1, vx: 0});
    this.add('2d');
    
    }
});

Q.Sprite.extend("Enemy",{
  init: function(p) {
    this._super(p, { sheet: 'enemy', vx: 100 });
    
    this.add('2d, aiBounce');
    
    
    this.on("bump.top", function(collision){
      if(collision.obj.isA("Player")) { 

        if (collision.obj.p.shield > 0) {
          collision.obj.p.shield -= 1;
          Q.stageScene('ui', 1, collision.obj.p);
          Q.state.dec("player_shield", 1);
        } 
        else {
          collision.obj.p.hp -= 1;
          Q.stageScene('ui', 1, collision.obj.p);
          Q.state.dec("player_health", 1);
          if(collision.obj.p.hp <= 0){
            collision.obj.play("die");
            Q.stageScene("endGame",2, { label: "You Died" }); 
            collision.obj.destroy();
          } 
          else {
            collision.obj.p.x -= 15 * Math.cos(TO_RAD * (this.p.angle+90));
            collision.obj.p.y -= 15 * Math.sin(TO_RAD * (this.p.angle+90));
          }
        };
      } else if (collision.obj.isA("Rock")) {
        this.destroy();
      };
    });
    
    this.on("bump.left,bump.right,bump.bottom",function(collision) {
           
      if(collision.obj.isA("Player")) { 

        if (collision.obj.p.shield > 0) {
          collision.obj.p.shield -= 1;
          Q.stageScene('ui', 1, collision.obj.p);
          Q.state.dec("player_shield", 1);
        } 
        else {
          collision.obj.p.hp -= 1;
          Q.stageScene('ui', 1, collision.obj.p);
          Q.state.dec("player_health", 1);
          if(collision.obj.p.hp <= 0){
            collision.obj.play("die");
            Q.stageScene("endGame",2, { label: "You Died" }); 
            collision.obj.destroy();
          } 
          else {
            collision.obj.p.x -= 15 * Math.cos(TO_RAD * (this.p.angle+90));
            collision.obj.p.y -= 15 * Math.sin(TO_RAD * (this.p.angle+90));
          }
        };
      }
    });
  }, 
  freeze: function(p) {
    this.add('animation');
  //  this.play("blue");
    for (var i = 100; i >= 0; i--) {
      this.p.vx = i;
    };
  }
});