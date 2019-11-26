function setup() {
    createCanvas(400, 400);
    x = 0;
    left = true;
}

function draw() {

    if (left) {
        if (x > 40) {
            left = false;
        }
        x++;
    } else {
        if (x < 0) {
            left = true;
        }
        x--;
    }

    background(220);
    fill(247, 199, 56);
    noStroke();
    ellipse(width / 2, height / 2, 300, 300);
    fill(109, 75, 3);
    ellipse(150, 150, 30, 40);
    ellipse(250, 160, 30, 40);
    noFill();
    stroke(109, 75, 3);
    strokeWeight(15);
    arc(250, 150, 50, 20, 13 * PI / 12, 23 * PI / 12);
    arc(150, 120, 50, 20, 13 * PI / 12, 23 * PI / 12);
    arc(200, 240, 60, 30, 15 * PI / 12, 24 * PI / 12);

    fill(255, 174, 0);
    stroke(255, 174, 0);
    strokeWeight(30);
    line(130 + x, 300, 260 + x, 260);
    line(140 + x, 320, 220 + x, 300);
    line(150 + x, 340, 210 + x, 330);
    line(150 + x, 360, 200 + x, 360);
    ellipse(150 + x, 325, 70, 70);
    noFill();
    arc(105 + x, 270, 60, 80, 22 * PI / 12, 3 * PI / 12);


    textSize(30);
    textAlign(CENTER);
    stroke(0);
    strokeWeight(1);
}
