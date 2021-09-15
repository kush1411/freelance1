const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var bg;
var ice = [];
var maxSnow = 100;

function preload() {
    bg = loadImage("snow3.jpg");
}

function setup() {
    createCanvas(1300, 600);
    engine = Engine.create();
    world = engine.world;
    for (var i = 0; i < maxSnow; i++) {
        ice.push(new Snow(random(0, 1350), random(0, 50)));
    }
}

function draw() {
    background(bg);
    engine.timeScale = 0.3;
    Engine.update(engine);
//add gravity
    for (var i = 0; i < maxSnow; i++) {
        ice[i].display();
        ice[i].changePosition();
    }
   drawSprites();
}

class Snow {
    constructor(x, y) {
        var options = {
            'restitution': 0.00001,
            'friction': 0.0000001,
            'density': 0.00001

        }
        this.image = loadImage("snow5.webp");
        this.body = Bodies.circle(x, y, 40, 40, 20, options);
        this.radius = 45;
        this.lifetime = 10;
        World.add(world, this.body);
    }

    changePosition() {
        if (this.body.position.y > height) {
            Matter.Body.setPosition(this.body, {x: random(0, 1400), y: random(0, 50)});
        }
    }
    display() {
        push();
        var pos = this.body.position;
        imageMode(CENTER);
        image(this.image, pos.x, pos.y, this.radius, this.radius);
        pop();
    }
}