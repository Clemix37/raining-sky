import { MARGINS, SPEED_RAIN } from "./constants/constants.js";

function spawnStar() {
    // add star
    add([
        rect(20, 20, {radius:50}),
        area(),
        outline(2, Color.fromArray([255,255,255])),
        pos(rand(0, width() - MARGINS), 5),
        anchor("topleft"),
        color(0, 255, 0),
        move(DOWN, SPEED_RAIN),
        offscreen({ destroy: true }),
        "star", // add a tag here
    ]);
    wait(rand(0.2, 0.5), () => {
        spawnStar();
    });
}

function spawnPowerUp(){
    // add star
    add([
        rect(20, 20, {radius:50}),
        area(),
        outline(2, Color.fromArray([255,255,255])),
        pos(rand(0, width() - MARGINS), 5),
        anchor("topleft"),
        color(0, 0, 255),
        move(DOWN, SPEED_RAIN),
        offscreen({ destroy: true }),
        "POWER", // add a tag here
    ]);
    wait(rand(2, 5), () => {
        spawnPowerUp();
    });
}

export { spawnStar? spawnPowerUp };
