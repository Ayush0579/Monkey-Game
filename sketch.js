var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var survivalT;
var PLAY,END,gameState;

function preload(){
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
  groundI = loadImage("ground2.png");
 
}

function setup() {
  createCanvas(600,400);
  
  PLAY = 0;
  
  END = 1;
  
  gameState = PLAY;
  
  FoodGroup = new Group();
  
  obstacleGroup = new Group();

  ground = createSprite(300,390,600,20);
  ground.addImage(groundI);
  ground.velocityX = -5;
  ground.x = ground.width/2;
  
  monkeySprite = createSprite(80,330);
  monkeySprite.addAnimation("Monkey",monkey_running);
  monkeySprite.collide(obstacleGroup);
  monkeySprite.velocityY = 5;
  monkeySprite.scale = 0.15;
}

function draw() {
  background(0,181,226);
  
  if (gameState === PLAY){ 
    monkeySprite.lifetime = -1;
    ground.lifetime = -1;
    
    survivalT = Math.round(frameCount/100);
    
    fill(0,0,0);
    textSize(20);
    text("Survival Time: " + survivalT, 200,20);
    
    monkeySprite.velocityX = 0;
    FoodGroup.setVelocityXEach(-5);
    obstacleGroup.setVelocityXEach(-5);
    ground.velocityX = -5;
    
    if(monkeySprite.isTouching(FoodGroup)){
      fruit.destroy();
      monkeySprite.velocityX = 0;
      monkeySprite.x = 80;
    }
  
    if (keyDown("space") && monkeySprite.collide(ground)){
        monkeySprite.velocityY = -17;
      }
    
    if(monkeySprite.collide(obstacleGroup)){
      reset();
      gameState = END;
    }
    
  }
  
  monkeySprite.velocityY = monkeySprite.velocityY + 0.8;
  
  monkeySprite.collide(ground);
  
  bananaForever();
  
  Rocks();
  
  if(ground.x < 0) {
      ground.x = ground.width / 2;
  }
  
  drawSprites();
  
  if(gameState === END){
    FoodGroup.setLifetimeEach(0);
    obstacleGroup.setLifetimeEach(0);
    
    background(0,0,0);
    
    fill("white");
    textSize(30);
    text("Press enter to play again",130,height/2);
    
    if(keyWentDown("enter")){
      gameState = PLAY;
      frameCount = 0;
    }
  }
  
}

function bananaForever(){
  if(frameCount%80 === 0){
    fruit = createSprite(700,0,10,10);
    fruit.y = Math.round(random(120,200));
    fruit.setCollider("rectangle",0,15,50,1,0);
    fruit.addImage(bananaImage);
    fruit.scale = 0.1;
    fruit.velocityX = -5;
    fruit.lifetime = 120;
    
    FoodGroup.add(fruit);
  }
}

function Rocks(){
  if(frameCount%150 === 0){
    obstacle = createSprite(700,370);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1;
    obstacle.velocityX = -5;
    
    if(obstacle.x < 0){
      obstacle.lifetime = 0;
    }
    
    obstacleGroup.add(obstacle);
  }
}

function reset(){
  monkeySprite.velocityX = 0;
  FoodGroup.setVelocityXEach(0);
  obstacleGroup.setVelocityXEach(0);
  ground.velocityX = 0;
}