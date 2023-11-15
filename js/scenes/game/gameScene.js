import { GRAVITY, MARGINS, SPEED_USER } from "../../utils/constants/constants.js";
import { spawnStar, spawnPowerUp } from "../../utils/utils.js";

// @todo move to constants
const DEF_COUNT = 80
const DEF_GRAVITY = 800
const DEF_AIR_DRAG = 0.9
const DEF_VELOCITY = [1000, 4000]
const DEF_ANGULAR_VELOCITY = [-200, 200]
const DEF_FADE = 0.3
const DEF_SPREAD = 60
const DEF_SPIN = [2, 8]
const DEF_SATURATION = 0.7
const DEF_LIGHTNESS = 0.6

// @todo move to utils
function addConfetti(opt = {}) {
	const sample = (s) => typeof s === "function" ? s() : s
	for (let i = 0; i < (opt.count ?? DEF_COUNT); i++) {
		const p = add([
			pos(sample(opt.pos ?? vec2(0, 0))),
			choose([
				rect(rand(5, 20), rand(5, 20)),
				circle(rand(3, 10)),
			]),
			color(sample(opt.color ?? hsl2rgb(rand(0, 1), DEF_SATURATION, DEF_LIGHTNESS))),
			opacity(1),
			lifespan(4),
			scale(1),
			anchor("center"),
			rotate(rand(0, 360)),
		])
		const spin = rand(DEF_SPIN[0], DEF_SPIN[1])
		const gravity = opt.gravity ?? DEF_GRAVITY
		const airDrag = opt.airDrag ?? DEF_AIR_DRAG
		const heading = sample(opt.heading ?? 0) - 90
		const spread = opt.spread ?? DEF_SPREAD
		const head = heading + rand(-spread / 2, spread / 2)
		const fade = opt.fade ?? DEF_FADE
		const vel = sample(opt.velocity ?? rand(DEF_VELOCITY[0], DEF_VELOCITY[1]))
		let velX = Math.cos(deg2rad(head)) * vel
		let velY = Math.sin(deg2rad(head)) * vel
		const velA = sample(opt.angularVelocity ?? rand(DEF_ANGULAR_VELOCITY[0], DEF_ANGULAR_VELOCITY[1]))
		p.onUpdate(() => {
			velY += gravity * dt()
			p.pos.x += velX * dt()
			p.pos.y += velY * dt()
			p.angle += velA * dt()
			p.opacity -= fade * dt()
			velX *= airDrag
			velY *= airDrag
			p.scale.x = wave(-1, 1, time() * spin)
		})
	}
}

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

        // When colliding with a powerUp, we want to add confettis, 100 to the score and destroy the power
        bean.onCollide("power", (powerUp) => {
            addConfetti({ pos: bean.pos });
            score += 100;
            destroy(power);
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
