
var bg, backgroundImg;
var ironman, ironimg;
var diamond, diaimg, diagroup;
var spike,spikeimg, spikegroup;
var stone, stoneimg, stonegroup;
var score = 0;
var play = "T";

function preload() {
  backgroundImg = loadImage("images/bg.jpg");
  ironimg= loadImage("images/iron.png");
  diaimg= loadImage("images/diamond.png");
  spikeimg=loadImage("images/spikes.png");
  stoneimg=loadImage("images/stone.png");
}

function setup() {
  createCanvas(1000, 600);

  //bg create
  bg = createSprite(580,300,1000,600);
  bg.addImage(backgroundImg);
  bg.scale=1.5;
  bg.velocityY=5;

  //iron man create
  ironman=createSprite(480,500,40,20);
  ironman.addImage(ironimg);
  ironman.scale=0.3;
  ironman.debug= false;

  //groups
  diagroup=new Group();
  spikegroup=new Group();
  stonegroup=new Group();
}

//create diamonds
function diaGen() {
  if (frameCount%75===0) {
      diamond=createSprite(random(20,980),0,10,10);
      diamond.addImage(diaimg);
      diamond.velocityY=5;
      diamond.scale=0.55;
      diagroup.add(diamond);
      diamond.lifetime=250;
  }
}

//create stone
function stoneGen() {
  if (frameCount%125===0) {
    stone=createSprite(random(200,800),0, 5,5);
    stone.addImage(stoneimg);
    stone.velocityY=5;
    stonegroup.add(stone);
    stone.lifetime=500;
    stone.setCollider("rectangle", 0, 19.5, 226, 10);
    stone.debug = false;
  }
}

//create spike
function spikeGen() {
  if (frameCount%100===0) {
    spike=createSprite(random(200,980),0, 5,5);
    spike.addImage(spikeimg);
    spike.velocityY=5;
    spikegroup.add(spike);
    spike.lifetime=500;
  }
}



function draw() {

  if (play === "T") {
  stoneGen();
  //stone pushes ironman down
  for (var i=0; i<(stonegroup.length);i++) {
    var temp=stonegroup.get(i);
    if (temp.isTouching(ironman)){
      ironman.y=ironman.y+5;
    }
    ironman.y=ironman.y;
  }

  diaGen();
  //collect diamonds
  for (var j=0;j<(diagroup.length);j++) {
    var temp2=diagroup.get(j);
    if (temp2.isTouching(ironman)) {
        score++;
        temp2.destroy();
        temp2=null;
    }
  }

  spikeGen();
  for (var k = 0 ; k<(spikegroup.length); k++) {
    var temp3= spikegroup.get(k);
    if (temp3.isTouching(ironman)) {
      ironman.destroy();
      score=score-5;
      play = "F";
    }
  }

  //scrolling bg
  if (bg.y>400) {
    bg.y=bg.width/16;
  }

  //movement
  if (keyDown("a")) {
    ironman.x=ironman.x-5;
  }
  if (keyDown("d")) {
    ironman.x=ironman.x+5;
  }
  if (keyDown("left_arrow")) {
    ironman.x=ironman.x-5;
  }
  if (keyDown("right_arrow")) {
    ironman.x=ironman.x+5;
  }

  //no out of bounds
  if (ironman.x<5) {
    ironman.x=5;
  }
  if (ironman.x>995) {
    ironman.x=995;
  }

  if (ironman.y>630) {
    play ="F"
  }

  //no diamond/stone overlap
  for (var a = 0; a<(stonegroup).length;a++) {
    var tempA = stonegroup.get(a);
    for (var b = 0 ; b<(diagroup).length; b++) {
      var tempB = diagroup.get(b);
      if (tempA.isTouching(tempB)) {
        tempB.destroy();
        tempB=null;
      }
    }
  }
  }

  // lose
  else if (play === "F") {
    bg.velocityY=0;
    ironman.velocityY=0;
    ironman.x=ironman.x;
    ironman.velocityX=0;
    stonegroup.setVelocityYEach(0);
    diagroup.setVelocityYEach(0);
    spikegroup.setVelocityYEach(0);
    stonegroup.setLifetimeEach(-1);
    diagroup.setLifetimeEach(-1);
    spikegroup.setLifetimeEach(-1);
  }

  drawSprites();
  //score
  if (play == "T"){
    textSize(30);
    fill("white");
    text("Score:"+ score,880,35);
  }
  else if (play == "F" ){
    textSize(100);
    fill("white");
    text("You lose!", 275,300);
    textSize(30);
    fill("white");
    text("Score:"+ score,880,35);
  }
}

