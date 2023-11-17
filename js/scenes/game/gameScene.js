import { GRAVITY, MARGINS, SPEED_USER } from "../../utils/constants/constants.js";
import { spawnStar, spawnPowerUp, addConfetti } from "../../utils/utils.js";

let score = 0;

function goLeft(obj, relatedObj){
    // We don't want to go farther than left related object
    if(obj.pos.x <= relatedObj.pos.x) return;
    obj.move(-SPEED_USER, 0);
}
function goRight(obj, relatedObj){
    // We don't want to go farther than right related object
    if((obj.pos.x + obj.width) >= relatedObj.width) return;
    obj.move(SPEED_USER, 0);
}

function loadGameScene(){
    // Game Scene
    scene("game", () => {
        score = 0;
        // We span 2 by 2 stars
        spawnStar();
        spawnStar();
        // We spawn one power
        spawnPowerUp();
        // We set the gravity
        setGravity(GRAVITY);

        //#region Components

        // Display Score
        const scoreLabel = add([
            text(score),
            pos(width() / 2, 0),
        ]);
        
        // Add slider
        const slider = add([
            rect(width() - (2*MARGINS), 50, { radius: 50 }),
            pos(MARGINS, height() - 100),
            outline(4), // border
            area(), // detect collision
            body({ isStatic: true }), // body can't move
            color(128,128,128),
        ]);

        // Add player
        const player = add([
            sprite("player"),
            pos(width() / 2, height() - 150),
            scale(2.5),
            area(),
            health(3),
            // move(RIGHT, SPEED_USER),
        ]);

        //#endregion

        //#region Events

        // LEFT
        onKeyDown("left", () => goLeft(player, slider));
        onKeyDown("q", () => goLeft(player, slider));
        // RIGHT
        onKeyDown("right", () => goRight(player, slider));
        onKeyDown("d", () => goRight(player, slider));
        
        /**
         * When colliding with a star,
         * We hurt player, remove hp, display kaboom and shake screen
         * If no hp remains, go to the score scene
         */
        player.onCollide("star", (tree) => {
            addKaboom(player.pos);
            shake();
            player.hurt(1);
            destroy(tree);
            if(player.hp() <= 0) go("lose", score); // go to "lose" scene here
        });

        // When colliding with a powerUp, we want to add confettis, 100 to the score and destroy the power
        player.onCollide("power", (powerUp) => {
            addConfetti({ pos: player.pos });
            score += 100;
            destroy(powerUp);
        });

        // We change the score and display it
        onUpdate(() => {
            score++;
            scoreLabel.text = score;
        });

        //#endregion

    });
}

export {
    loadGameScene,
};
