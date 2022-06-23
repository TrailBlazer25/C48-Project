var PLAY = 1;
var END = 0;
var gameState = PLAY;

var bg, bgimg;

var rabbit, rabbitrunning;
var carrot, carrotimg;
var farmer, farmerimg;

var score=0;

var gameOver, restart;

localStorage["HighestScore"] = 0;

function preload(){ 
  bgimg = loadImage("bg.png");
  
  rabbitrunning = loadAnimation("C1.png", "C2.png", "C3.png", "C4.png", "C5.png", "C6.png", "C7.png");

  carrotimg = loadImage("carrot.jpg");

  farmerimg = loadImage("F1.png");

  //gameOverImg = loadImage("gameOver.png");
  //restartImg = loadImage("restart.png");
}

function setup() {
  createCanvas(600, 200);
  
  bg = createSprite(300,100,600,200);
  bg.addImage("bgimg",bgimg);
  bg.x = bg.width/2;
  bg.velocityX = -(6 + 3*score/100);
    
  rabbit = createSprite(50,200,20,50);
  
  rabbit.addAnimation("running", rabbitrunning);
  //rabbit.addAnimation("collided", rabbit_collided);
  rabbit.scale = 0.5;
  
  //gameOver = createSprite(300,100);
  //gameOver.addImage(gameOverImg);
  
  /*restart = createSprite(300,140);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
  */
  invisiblebg = createSprite(200,210,400,10);
  invisiblebg.visible = false;
  
  carrotsGroup = new Group();
  farmersGroup = new Group();
  
  score = 0;
}

function draw() {
  rabbit.debug = true;
  rabbit.setCollider("circle",0,0,125);

  camera.position.x = 250;
  camera.position.y = rabbit.y;

  background(255);
  text("Score: "+ score, 500,rabbit.y-75);
  
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    bg.velocityX = -(6 + 3*score/100);
  
    if(keyDown("space") && rabbit.y >= 159) {
      rabbit.velocityY = -12;
    }
  
    rabbit.velocityY = rabbit.velocityY + 0.8
  
    if (bg.x < 250){
      bg.x = bg.width/2;
    }
  
    rabbit.collide(invisiblebg);
    spawncarrot();
    spawnfarmers();
  
    if(farmersGroup.isTouching(rabbit)){
        gameState = END;
    }
  }
  else if (gameState === END) {
    //gameOver.visible = true;
    //restart.visible = true;
    
    bg.velocityX = 0;
    rabbit.velocityY = 0;
    farmersGroup.setVelocityXEach(0);
    carrotsGroup.setVelocityXEach(0);
    
    //rabbit.changeAnimation("collided",rabbit_collided);
   
    farmersGroup.setLifetimeEach(-1);
    carrotsGroup.setLifetimeEach(-1);
    
    /*if(mousePressedOver(restart) || keyDown("space")) {
      reset();
    }*/
  }
  
  
  drawSprites();
}

function spawncarrot() {
  if (frameCount % 60 === 0) {
    var carrot = createSprite(600,120,40,10);
    carrot.y = Math.round(random(80,120));
    carrot.addImage(carrotimg);
    carrot.scale = 0.1;
    carrot.velocityX = -3;
    
    carrot.lifetime = 200;
    
    carrot.depth = rabbit.depth;
    rabbit.depth = rabbit.depth + 1;
    
    carrotsGroup.add(carrot);
  }
  
}

function spawnfarmers() {
  if(frameCount % 60 === 0) {
    var farmer = createSprite(600,150,10,40);

    farmer.velocityX = -(6 + 3*score/100);
    farmer.addImage(farmerimg);

    /*
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: farmer.addImage(farmer1);
              break;
      case 2: farmer.addImage(farmer2);
              break;
      case 3: farmer.addImage(farmer3);
              break;
      case 4: farmer.addImage(farmer4);
              break;
      case 5: farmer.addImage(farmer5);
              break;
      case 6: farmer.addImage(farmer6);
              break;
      default: break;
    }
    */
    
    farmer.debug = true;
    farmer.scale = 0.4;
    farmer.lifetime = 300;
   
    farmersGroup.add(farmer);
  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  farmersGroup.destroyEach();
  carrotsGroup.destroyEach();
  
  rabbit.changeAnimation("running",rabbit_running);
  
  if(localStorage["HighestScore"]<score){
    localStorage["HighestScore"] = score;
  }
  console.log(localStorage["HighestScore"]);
  
  score = 0;
  
}