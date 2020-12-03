var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var jungleImage
var score=0;
var survivalTime = 0;
var PLAY=1
var END=0
var gameState=PLAY

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png")
  jungleImage = loadImage("jungle.jpg")
}
function setup() {
  background("blue");
  createCanvas(500,400)
    jungle = createSprite(250,200,400,500)
  jungle.addImage(jungleImage)
  
  monkey1 = createSprite(60,335,20,20)
  monkey1.addAnimation("monkey",monkey_running);
  monkey1.scale = 0.1
  
  ground = createSprite(400,370,1000,10)
  ground.velocityX=-5
  ground.x=ground.width/2
  ground.visible=false
  
  bananagroup=new Group();
  obstaclegroup=new Group();
}


function draw() {
  background("lightblue")
  if(gameState===PLAY){
  
  stroke("black")
  textSize(20)
 survivalTime=Math.ceil(frameCount/frameRate());
  monkey1.collide(ground)
    if (ground.x < 0){
    ground.x = ground.width/2;
  } 
  if(keyDown("space") && monkey1.y>= 200){
    monkey1.velocityY=-12
  }
  if(monkey1.isTouching(bananagroup)){
    bananagroup.destroyEach();
    score+=2
    monkey1.scale+=0.02
  }
    if(monkey1.isTouching(obstaclegroup)){
      gameState=END
    }
  monkey1.velocityY+=0.5
  food();
  obstacle();
  }
  if(gameState=== END){
    monkey1.velocityX=0
    ground.velocityX=0
    monkey1.collide(ground)
    monkey1.scale=0.1
  }
  drawSprites();
    fill("black")
  textSize(20)
  text("Score:"+score,300,50)
    text("Survival Time:"+survivalTime,100,50)
}
  function food(){
    if(World.frameCount%80===0){
      var bananas=createSprite(300,200,20,20);
      bananas.y=random(100,200);
      bananas.addAnimation("banana",bananaImage);
      bananas.scale=0.1;
      bananas.velocityX=-5;
      bananas.lifetime=80;
      bananagroup.add(bananas);
    }
      
  }
  function obstacle(){
    if(World.frameCount%300===0){
      var obstacles=createSprite(300,320,20,20);
      obstacles.scale=0.2;
      obstacles.addAnimation("obstacle",obstacleImage);
      obstacles.lifetime=80;
      obstacles.velocityX=-5;
      obstaclegroup.add(obstacles);
    }
  }






