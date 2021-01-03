//Game States
var PLAY=1;
var END=0;
var gameState=1;
//for creating variables
var sword,fruit ,monster,fruitGroup,enemyGroup, score,r,randomFruit, position;
var swordImage , fruit1, fruit2 ,fruit3,fruit4, monsterImage, gameOverImage
var gameOverSound ,knifeSwoosh
//preload images ,sound and animation
function preload(){
  
  swordImage = loadImage("knife.png");
  monsterImage = loadAnimation("alien1.png","alien2.png")
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  gameOverImage = loadImage("gameover.png")
  
  gameOverSound = loadSound("gameover.mp3")
  knifeSwooshSound = loadSound("knifeSwoosh.mp3")
}


//function setup
function setup() {
  createCanvas(600, 600);
  
  //creating sword
   sword=createSprite(40,200,20,20);
   sword.addImage(swordImage);
   sword.scale=0.7
  
  
  
  //set collider for sword
  sword.setCollider("rectangle",0,0,40,40);

  // Score variables and Groups
  score=0;
  fruitGroup=createGroup();
  enemyGroup=createGroup();
  
}
//function draw
function draw() {
  background("lightblue");
  knifeSwooshSound.play()
  
  if(gameState===PLAY){
    
    //Call fruits and Enemy function
    fruits();
    Enemy();
    
    // Move sword with mouse
    sword.y=World.mouseY;
    sword.x=World.mouseX;
  
    // Increase score if sword touching fruit
    if(fruitGroup.isTouching(sword)){
      fruitGroup.destroyEach();
      
      knifeSwooshSound.play();
      score=score+2;
    }
    else
    {
      // Go to end state if sword touching enemy
      if(enemyGroup.isTouching(sword)){
        gameState=END;
        //gameover sound
        gameOverSound.play()
        
        fruitGroup.destroyEach();
        enemyGroup.destroyEach();
        fruitGroup.setVelocityXEach(0);
        enemyGroup.setVelocityXEach(0);
        
        // Change the animation of sword to gameover and reset its position
        sword.addImage(gameOverImage);
        sword.x=200;
        sword.y=200;
      }
    }
  }
  //draw sprites
  drawSprites();
  
  //Display score
  text("Score : "+ score,300,30);
}

//function enemy
function Enemy(){
  if(World.frameCount%200===0){
    monster=createSprite(400,200,20,20);
    monster.addAnimation("moving", monsterImage);
    monster.y=Math.round(random(100,300));
    monster.velocityX=-(8+(score/10));
    monster.setLifetime=50;
    
    enemyGroup.add(monster);
  }
}
//function fruits
function fruits(){
  if(World.frameCount%80===0){
    position = Math.round(random(1,2));
    fruit=createSprite(400,200,20,20);
    console.log(position)
     //using random variable change the position of fruit, to make it more challenging
    
    if(position==1)
    {
    fruit.x=400;
    fruit.velocityX=-(7+(score/4));
    }
    else
    {
      if(position==2){
      fruit.x=0;
      
  //Increase the velocity of fruit after score 4 or 10
      fruit.velocityX= (7+(score/4));
      }
    }
    
    fruit.scale=0.2;
     //fruit.debug=true;
     r=Math.round(random(1,4));
    if (r == 1) {
      fruit.addImage(fruit1);
    } else if (r == 2) {
      fruit.addImage(fruit2);
    } else if (r == 3) {
      fruit.addImage(fruit3);
    } else  if (r===4){
      fruit.addImage(fruit4);
    }
    
    fruit.y=Math.round(random(50,340));
   
    //set lifetime
    fruit.setLifetime=100;
    //to make a grp
    fruitGroup.add(fruit);
  }
}