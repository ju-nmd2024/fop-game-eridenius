//setup

function setup() {
  createCanvas(300, 600);
  background(177, 207, 222);
}

//position variebles
let bombX = 30;
let bombY = -180;
let bombScale = 1.0;
let cityX = 20;
let cityY = 20;
let cloudsX = 30;
let cloudsY = 30;
let bombSpeed = 1;
let bombAcceleration = 1.02;
let bombCloudScale = 1.0;

//game state
let gameState = true;

//function for deathscreen
function deathScreen(bombCloudScale) {
  scale(bombCloudScale);

  //scale when small
  translate(50, 10);

  push();
  fill(100, 100, 100);
  rect(-290, 400, 250, 450);
  ellipse(-290, 300, 300, 300);
  ellipse(-100, 300, 250, 250);
  ellipse(-170, 180, 200, 150);
  fill(125, 125, 125);
  ellipse(-50, 345, 157, 220);
  pop();

  scale(0.75);
  translate(-50, 100);
  push();
  fill(125, 125, 125);
  rect(-290, 400, 250, 600);
  ellipse(-290, 350, 300, 300);
  ellipse(-100, 300, 250, 250);
  ellipse(-170, 180, 200, 150);
  ellipse(-50, 350, 157, 220);
  pop();

  rotate(PI);
  translate(305, -900);
  push();
  fill(55, 50, 50);
  arc(-150, 400, 350, 100, 0, PI);
  pop();
}

//function for background
function clouds(cloudsX, cloudsY) {
  noStroke();
  fill(255, 255, 255);
  translate(cloudsX, cloudsY);

  push();
  ellipse(40, 40, 70, 40);
  ellipse(10, 35, 70, 40);
  ellipse(40, 45, 50, 40);
  pop();

  translate(300, 20);

  push();
  ellipse(40, 40, 70, 40);
  ellipse(10, 35, 70, 40);
  ellipse(40, 45, 50, 40);
  pop();

  translate(-40, 150);
  scale(0.5);

  push();
  ellipse(40, 40, 70, 40);
  ellipse(10, 35, 70, 40);
  ellipse(40, 45, 50, 40);
  pop();
}

//bomb function
function bomb(bombX, bombY, bombScale) {
  push();
  translate(bombX, bombY);
  scale(bombScale);
  //wings of the bomb
  push();
  translate(0, -30, 0);
  fill(40, 40, 40);
  triangle(180, 125, 300, 250, 420, 125);

  pop();

  //bombshape
  push();
  fill(40, 40, 40);
  ellipse(300, 350, 150, 150);
  fill(0, 0, 0);
  ellipse(300, 200, 150, 150);
  rect(225, 200, 150, 150);
  pop();

  //stripe on the bomb
  push();
  translate(-75, 40);
  fill(70, 70, 70);
  rect(300, 300, 150, 10);
  pop();

  //wing in the middle
  push();
  fill(70, 70, 70);
  translate(-5, -205, 0);
  rect(300, 300, 15, 90);
  pop();

  //nuclear sign
  push();
  translate(0, -20, 0);
  fill(255, 255, 0);
  ellipse(300, 300, 100, 100);
  fill(0, 0, 0);
  ellipse(300, 300, 30, 30);
  pop();

  //triangles on the sign(1)
  fill(0, 0, 0);
  push();
  translate(300, 280);
  rotate();
  translate(-300, -280);
  triangle(300, 300, 330, 320, 270, 320);
  pop();

  //second triangle
  fill(0, 0, 0);
  push();
  translate(300, 280);
  rotate(4);
  translate(-300, -280);
  triangle(300, 300, 330, 320, 270, 320);
  pop();

  //third triangle
  fill(0, 0, 0);
  push();
  translate(300, 280);
  rotate(2.2);
  translate(-300, -280);
  triangle(300, 300, 330, 320, 270, 320);
  pop();

  pop();
}

//city background
function city(cityX, cityY) {
  translate(cityX, cityY);
  push();
  fill(0, 50, 100);
  rect(100, 450, 40, 150);
  fill(0, 50, 75);
  rect(0, 500, 30, 100);
  fill(0, 50, 75);
  rect(40, 430, 35, 170);
  fill(0, 40, 75);
  rect(20, 550, 75, 40);
  fill(0, 40, 100);
  rect(150, 550, 50, 40);
  fill(0, 50, 100);
  rect(100, 450, 40, 150);
  fill(0, 50, 75);
  rect(90, 500, 30, 100);
  fill(0, 50, 75);
  rect(240, 430, 35, 170);
  fill(0, 40, 75);
  rect(100, 550, 75, 40);
  fill(0, 40, 100);
  rect(250, 550, 50, 40);
  triangle(190, 475, 150, 575, 190, 580);

  pop();
}

function draw() {
  //checks gamestate and runs the code for the game
  if (gameState) {
    //bomb falling
    bombY += bombSpeed;

    //bomb accelartion
    bombSpeed += bombAcceleration;

    clear();

    //elements
    background(177, 207, 222);
    city(0, 20);
    bomb(50, bombY, 0.35, bombSpeed);
    clouds(-20, 10);

    //bomb slows while clicking
    if (keyIsPressed) {
      if (key === " ") {
        bombSpeed = -6;
      }
    } else {
      bombAcceleration = 1.05;
    }

    //losing conditions
    if (bombY > 450 && bombSpeed > 1.5) {
      console.log("You lose");
      console.log("Press R to restart");
      fill(0, 0, 0);
      textSize(70);
      text("You lose!", -290, 30);
      text("Press R to restart", -450, 125);

      deathScreen();
      gameState = false;
    }
    //winning conditions
    if (bombY > 450 && bombSpeed < 1.5) {
      console.log("You win");
      gameState = false;
      fill(50, 200, 50);
      textSize(70);
      text("You win!", -290, 30);
      text("Press R to restart", -450, 125);
    }
  }

  //restart option when winning/losing
  if (keyIsPressed) {
    if (key === "r") {
      console.log("Restarting");
      bombY = -180;
      gameState = true;
      bombAcceleration = 1;
    }
  }
}
