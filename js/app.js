import { loadScenes } from "./scenes/scenes.js";
import { kaboom } from "./utils/kaboom.js";

// Game
kaboom({
    background: [0,0,0],
    scale: 1,
});

loadBean();
loadScenes();

go("menu");