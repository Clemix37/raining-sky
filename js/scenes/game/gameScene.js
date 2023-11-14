import { GRAVITY, MARGINS, SPEED_USER } from "../../utils/constants/constants.js";
import { spawnStar } from "../../utils/utils.js";

let score = 0;

function goLeft(obj){
    obj.move(-SPEED_USER, 0);
}
function goRight(obj){
    obj.move(SPEED_USER, 0);
}

function loadGameScene(){
    // Game Scene
    scene("game", () => {
        score = 0;
        // We span 2 by 2 stars
        spawnStar();
        spawnStar();
        // We set the gravity
        setGravity(GRAVITY);

        //#region Components

        // Display Score
        const scoreLabel = add([
            text(score),
            pos(width() / 2, 0),
        ]);
        
        // Add platform
        add([
            rect(width() - (2*MARGINS), 50, { radius: 50 }),
            pos(MARGINS, height() - 100),
            outline(4), // border
            area(), // detect collision
            body({ isStatic: true }), // body can't move
            color(128,128,128),
        ]);

        // Add player
        const bean = add([
            sprite("bean"),
            pos(width() / 2, height() - 150),
            scale(2.5),
            area(),
            health(3),
            // move(RIGHT, SPEED_USER),
        ]);

        //#endregion

        //#region Events

        // LEFT
        onKeyDown("left", () => goLeft(bean));
        onKeyDown("q", () => goLeft(bean));
        // RIGHT
        onKeyDown("right", () => goRight(bean));
        onKeyDown("d", () => goRight(bean));
        
        /**
         * When colliding with a star,
         * We hurt bean, remove hp, display kaboom and shake screen
         * If no hp remains, go to the score scene
         */
        bean.onCollide("star", (tree) => {
            addKaboom(bean.pos);
            shake();
            bean.hurt(1);
            destroy(tree);
            if(bean.hp() <= 0) go("lose", score); // go to "lose" scene here
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