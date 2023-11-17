import { loadScenes } from "./scenes/scenes.js";
import { loadSprites } from "./sprites/sprites.js";
import { kaboom } from "./utils/kaboom.js";

// Game
kaboom({
    background: [0,0,0],
    scale: 1,
});

loadSprites();
loadScenes();

go("menu");