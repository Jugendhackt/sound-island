// A basic example
var tmap, s, stagIndex;
var x = 0, y = 0;
var showCoords = false;

function preload() {
  tmap = loadTiledMap('map');
}

function setup() {
  preload();
  createCanvas(800, 600);
  ellipseMode(CENTER);
  s = tmap.getMapSize();
  fill(0);
}

function draw() {
  background(tmap.getBackgroundColor());
  tmap.draw(x, y);
  if(showCoords) {
    textSize(8);
    for (var nx = 0; nx < s.x; nx++)
    for (var ny = 0; ny < s.y; ny++){
      var p = tmap.mapToCam(createVector(nx, ny));
      ellipse(p.x, p.y, 4, 4);
      text(nx + "," + ny, p.x, p.y);
    }
  }
  textSize(24);
  text("ADWS to move, Z to toogle Map Coordinates", 10, 50);
  text("Corner: Canvas coordinates: " + x + ", " + y, 10, 100);
  text("Corner: Map coordinates: " + tmap.canvasToMap(x, y).x + ", " + tmap.canvasToMap(x, y).y, 10, 150);
  text("Map Name: " + tmap.getName(), 10, 200);
  text("Map Orientation: " + tmap.getOrientation(), 10, 250);
  if(tmap.getOrientation() == "staggered" || tmap.getOrientation() == "hexagonal") {
    stagIndex = tmap.staggerindex == 0 ? "odd" : "even";
    text("Stagger Info: " + tmap.staggeraxis + "," + stagIndex, 410, 250);
  }
  text("Map Size: " + tmap.getMapSize(), 10, 300);
  text("Layer 0 Type: " + tmap.getType(0), 10, 350);



  if (keyIsPressed) {
    if(key == 'a' || key == 'A') x -= tmap.getTileSize().x / 2;
    if(key == 'd' || key == 'D') x += tmap.getTileSize().x / 2;
    if(key == 'w' || key == 'W') y -= tmap.getTileSize().y / 2;
    if(key == 's' || key == 'S') y += tmap.getTileSize().y / 2;
  }
}

function keyPressed(){
  if(key == 'z' || key == 'Z') showCoords = !showCoords;
}

function mapLoaded(newMap) {
  tmap = newMap;
  s = tmap.getMapSize();
}
