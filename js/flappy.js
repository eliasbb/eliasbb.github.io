// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };

// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)
var game = new Phaser.Game(790, 400, Phaser.AUTO, 'game', stateActions);
var score=0;
var labelScore;
var player;
var gapStart = game.rnd.integerInRange(1, 5);
var pipes = [];
var gapSize=150;
var gapMargin=50;
var blockHeight=50;
var height= 400;
var width = 790;
var pipeEndHeight=25;
var pipeEndExtraWidth=10;
var startdisplay;
var bg2 =1;
/*
 * Loads all resources for the game and gives them names.
 */
function preload() {
game.load.image("playerImg", "../assets/flappy_superman.png");
game.load.audio("score", "../assets/point.ogg");
game.load.image("pipeBlock","../assets/pipe.png");
game.load.image("pipeEnd","../assets/pipe-end.png");
game.load.image("bg1","../assets/nightskybackground.jpeg");
game.load.image("bg2","../assets/morningsky.jpg");
game.load.image("bg3","../assets/daytimesky.jpeg");
game.load.image("bg4","../assets/cloudbackground.jpeg");
}

/*
 * Initialises the game. This function is only called once.
*/


function start(){
  var pipeInterval = 1.50 * Phaser.Timer.SECOND;
  game.time.events.loop(
  pipeInterval,
  generatePipe
  );
    player.body.gravity.y = 400;
    player.body.velocity.x = 5;
    splashDisplay.destroy();
}


function create() {
    // set the background colour of the scene
    var backgroungVelocity = 400 / 10;
  var backgroundSprite = game.add.tileSprite(0, 0, 790, 400, "bg1");
  backgroundSprite.autoScroll(-backgroungVelocity, 0);
    player = game.add.sprite(50, 200, "playerImg");
    //player = game.add.sprite (100,200, "playerImg");
  player.scale.x = 0.9;
    player.scale.y = 0.9;
  //  player.width = 50;
    player.x = 50;
    player.y = 200;
  //  game.input.onDown.add(clickHandler);
  //  game.input
  //  .keyboard.addKey(Phaser.Keyboard.SPACEBAR)
    //.onDown.add(spaceHandler);
    labelScore= game.add.text(20,20,"0",{fill:"#FFFFFF"});
    game.input.keyboard.addKey(Phaser.Keyboard.RIGHT)
    .onDown.add(moveRight);
    game.input.keyboard.addKey(Phaser.Keyboard.LEFT)
    .onDown.add(moveLeft);
    game.input.keyboard.addKey(Phaser.Keyboard.UP)
    .onDown.add(moveUp);
    game.input.keyboard.addKey(Phaser.Keyboard.DOWN)
    .onDown.add(moveDown);
    //generatePipe();
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.enable(player);

    //player.body.velocity.y = -500;
    game.input.keyboard
    .addKey(Phaser.Keyboard.SPACEBAR)
    .onDown
    .add(playerJump);
    game.input.keyboard
    .addKey(Phaser.Keyboard.ENTER)
    .onDown
    .add(start);
player.anchor.setTo(0.5, 0.5);
splashDisplay = game.add.text(100,200, "Press ENTER to start, SPACEBAR to jump");
}



/*
 * This function updates the scene. It is called for every new frame.
 */

function update() {
game.physics.arcade.overlap(
player,
pipes,
gameOver);

if(player.y<0){gameOver()}
if(player.y>400){gameOver()}
player.rotation += 0.1;
player.rotation = Math.atan(player.body.velocity.y / 200);

if(score==2 && bg2==1){
 console.log("restart");
  bg2 = 0;
  pipes = [];
  xpos = player.x;
  ypos = player.y;
  player.kill();
 backgroundSprite = game.add.tileSprite(0, 0, 790, 400, "bg2");
 backgroundSprite.autoScroll(-300, 0);

player = game.add.sprite(xpos, ypos, "playerImg");
game.physics.arcade.enable(player);
//player.scale.x = 0.9;
//player.scale.y = 0.9;
player.width = 50;
player.body.gravity.y = 400;
player.body.velocity.x = 5;
player.anchor.setTo(0.5, 0.5);
labelScore= game.add.text(20,20,"0", {fill:"#FFFFFF"});
labelScore.setText(score.toString());


}
}


function clickHandler(event) {
var s = game.add.sprite(event.x, event.y, "playerImg");
s.length = 100;
s.width = 100;
}

function spaceHandler() {
  game.sound.play("score");

}


function moveRight() {
  player.x = player.x + 10;
}
function moveUp() {
  player.y = player.y - 10;
}
function moveLeft() {
  player.x = player.x - 10;
}
function moveDown() {
  player.y = player.y + 10;
}


function generatePipe() {
var gapStart = game.rnd.integerInRange(gapMargin, height - gapSize - gapMargin);

addPipeEnd(width - (pipeEndExtraWidth / 2), gapStart);
for(var y = gapStart; y > 0; y -= blockHeight){
addPipeBlock(width, y - blockHeight);
}
addPipeEnd(width - (pipeEndExtraWidth / 2), gapStart + gapSize-25);
for(var y = gapStart + gapSize; y < height; y += blockHeight){
  addPipeBlock(width, y);
}
changeScore();
}

function addPipeEnd(x, y) {
var block = game.add.sprite(x, y, "pipeEnd");
pipes.push(block);
game.physics.arcade.enable(block);
block.body.velocity.x =-175;
}


function playerJump() {
player.body.velocity.y = -167;
}

function addPipeBlock(x, y) {
  var pipeBlock = game.add.sprite(x,y,"pipeBlock");
  pipes.push(pipeBlock);
  game.physics.arcade.enable(pipeBlock);
  pipeBlock.body.velocity.x = -175;
}


function changeScore() {
  score = score + 1;
  labelScore.setText(score.toString());
}

function gameOver(){
game.destroy();
}

function gameOver() {
location.reload();
}
