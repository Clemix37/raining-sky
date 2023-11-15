import { DEF_AIR_DRAG, DEF_ANGULAR_VELOCITY, DEF_COUNT, DEF_FADE, DEF_GRAVITY, DEF_LIGHTNESS, DEF_SATURATION, DEF_SPIN, DEF_SPREAD, DEF_VELOCITY, MARGINS, SPEED_RAIN } from "./constants/constants.js";

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
        "power", // add a tag here
    ]);
    wait(rand(2, 5), () => {
        spawnPowerUp();
    });
}
function addConfetti(opt = {}) {
	const sample = (s) => typeof s === "function" ? s() : s;
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
		]);
		const spin = rand(DEF_SPIN[0], DEF_SPIN[1]);
		const gravity = opt.gravity ?? DEF_GRAVITY;
		const airDrag = opt.airDrag ?? DEF_AIR_DRAG;
		const heading = sample(opt.heading ?? 0) - 90;
		const spread = opt.spread ?? DEF_SPREAD;
		const head = heading + rand(-spread / 2, spread / 2);
		const fade = opt.fade ?? DEF_FADE;
		const vel = sample(opt.velocity ?? rand(DEF_VELOCITY[0], DEF_VELOCITY[1]));
		let velX = Math.cos(deg2rad(head)) * vel;
		let velY = Math.sin(deg2rad(head)) * vel;
		const velA = sample(opt.angularVelocity ?? rand(DEF_ANGULAR_VELOCITY[0], DEF_ANGULAR_VELOCITY[1]));
		p.onUpdate(() => {
			velY += gravity * dt();
			p.pos.x += velX * dt();
			p.pos.y += velY * dt();
			p.angle += velA * dt();
			p.opacity -= fade * dt();
			velX *= airDrag;
			velY *= airDrag;
			p.scale.x = wave(-1, 1, time() * spin);
		})
	}
}

export { spawnStar, spawnPowerUp, addConfetti };
