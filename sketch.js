var PLAY = 1;
var END = 0;
var gameState = PLAY;

var spaceship1, spaceship;
var ground1, invisibleGround, ground;

var obstaclesGroup, obstacle, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score=0;

var gameOver, gameOverImg, restart, restartImg;


function preload(){
  spaceship1=loadImage("Images/spaceship.jpeg");
  ground1=loadImage("Images/space.jpeg");
  gameOverImg=loadImage("Images/gameOver.png");
  restartImg=loadImage("Images/restart.png");
  obstacle1=loadImage("Images/meteor.jpeg");
  obstacle2=loadImage("Images/asteroid.png");
  obstacle3=loadImage("Images/blackHole.png");
  obstacle4=loadImage("Images/burningStar.jpeg");
  obstacle5=loadImage("Images/Comet.png");
  obstacle6=loadImage("Images/sun.png");
}

function setup() {
  createCanvas(600, 200);
  
  spaceship = createSprite(50,180,20,50);
  spaceship.addImage("spaceship",spaceship1);
  spaceship.scale = 0.5;

  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",ground1);
  ground.x = ground.width /2;
  ground.velocityX = -(6 + 3*score/100);
  
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {
  background(255);
  text("Score: "+ score, 500,50);
  
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(6 + 3*score/100);
    
    
    if(keyDown("space") && spaceship.y >= 159) {
      spaceship.velocityY = -12;
    }
  
    spaceship.velocityY = spaceship.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
    spaceship.collide(invisibleGround);
    spawnObstacles();
  
    if(obstaclesGroup.isTouching(spaceship)){
        gameState = END;
    }
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    
    ground.velocityX = 0;
    spaceship.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    
    
    
    
    
    
    obstaclesGroup.setLifetimeEach(-1);
    
    
    if(mousePressedOver(restart)) {
      reset();
    }
  }
  
  
  drawSprites();
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  score = 0;
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    
    obstacle.velocityX = -(6 + 3*score/100);
    
    
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
    
           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    
    obstaclesGroup.add(obstacle);
  }
}

