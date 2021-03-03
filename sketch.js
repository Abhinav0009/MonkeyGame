
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage

var score;
var gameState = END;
var time;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(450,400);
  
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale = 0.1;
 
  ground = createSprite(400,350,900,10);
  ground.velocityX = -4;
  ground.x = ground.width/2;
  
  bananaGroup = new Group();
  stoneGroup = new Group();
  
  score = 0;
  time = 0;
}


function draw() {

  background("white");
  
  fill("red");
  textSize(20);
  text("Score: "+ score, 350,50);
  score = score + Math.round(getFrameRate()/120);
  text("Survival Time : " +time,100,50);
time = time + Math.round(frameCount % 25 === 0);

  
  
  if(keyDown("space") && monkey.y > 290){
    monkey.velocityY = -12;
  }
  
  monkey.velocityY = monkey.velocityY + 0.8;
  
  if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
  monkey.collide(ground); 
  
  if(bananaGroup.isTouching(monkey)){
    bananaGroup.destroyEach();
    score = score + 2;
  }
  
  if(stoneGroup.isTouching(monkey)){
  
    gameState = END;
    
    
    
    stoneGroup.setLifetimeEach(-1);
    stoneGroup.setVelocityXEach(0);
    bananaGroup.setLifetimeEach(-1);
    bananaGroup.setVelocityXEach(0);
  }
  
  if(frameCount % 80 === 0){
    fruit();
  }
  
  if(frameCount % 150 === 0){
    obstacle();
  }
  
  drawSprites();
}
  

function obstacle(){
  var stone = createSprite(580,330,50,50);
  stone.velocityX = -(5 + score/4);
  stone.addImage(obstacleImage);
  stone.scale=0.1;
  stone.lifetime=300;
  stoneGroup.add(stone);
}

function fruit(){
  var banana = createSprite(580,200,50,50)
  banana.velocityX = -(7 + score/4);
  banana.addImage(bananaImage);
  banana.scale = 0.1;
  banana.lifetime = 300;
  bananaGroup.add(banana);
}


