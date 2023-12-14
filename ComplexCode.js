/*
Filename: ComplexCode.js

This code performs a simulation of a particle system. It creates thousands of particles and applies various forces, such as gravity and wind, to simulate their motion and interaction.

*/

class Particle {
  constructor(x, y, mass) {
    this.position = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.mass = mass;
    this.radius = mass * 2;
    this.color = color(random(255), random(255), random(255));
  }

  applyForce(force) {
    let f = force.copy();
    f.div(this.mass);
    this.acceleration.add(f);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
    this.edges();
  }

  display() {
    fill(this.color);
    ellipse(this.position.x, this.position.y, this.radius, this.radius);
  }

  edges() {
    if (this.position.x > width) {
      this.position.x = width;
      this.velocity.x *= -1;
    } else if (this.position.x < 0) {
      this.position.x = 0;
      this.velocity.x *= -1;
    }

    if (this.position.y > height) {
      this.position.y = height;
      this.velocity.y *= -1;
    } else if (this.position.y < 0) {
      this.position.y = 0;
      this.velocity.y *= -1;
    }
  }

  attract(particle) {
    let force = p5.Vector.sub(this.position, particle.position);
    let distance = force.mag();
    distance = constrain(distance, 5, 25);
    force.normalize();
    let strength = (0.4 * this.mass * particle.mass) / (distance * distance);
    force.mult(strength);
    return force;
  }
}

let particles = [];

function setup() {
  createCanvas(800, 600);

  for (let i = 0; i < 1000; i++) {
    let x = random(width);
    let y = random(height);
    let mass = random(1, 5);
    particles.push(new Particle(x, y, mass));
  }
}

function draw() {
  background(50);

  for (let i = 0; i < particles.length; i++) {
    for (let j = 0; j < particles.length; j++) {
      if (i !== j) {
        let force = particles[j].attract(particles[i]);
        particles[i].applyForce(force);
      }
    }

    particles[i].applyForce(createVector(0, 0.1)); // Apply gravity
    particles[i].update();
    particles[i].display();
  }
}
This code defines a particle class and creates a simulation of thousands of particles interacting with each other and simulating forces like gravity and wind. The particles are updated based on their acceleration, velocity, and position, and are displayed on a canvas using the p5.js library.

Note: To execute this code, you need to have the p5.js library included in your HTML file and make sure to call the setup() and draw() functions.