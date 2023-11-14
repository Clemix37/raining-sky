import { loadGameScene } from "./game/gameScene.js";
import { loadLoseScene } from "./lose/loseScene.js";
import { loadMenu } from "./menu/menuScene.js";

function loadScenes(){
    loadMenu();
    loadGameScene();
    loadLoseScene();
}

export {loadScenes};