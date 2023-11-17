function loadLoseScene(){
    // Lose Scene
    scene("lose", (score) => {
        add([
            sprite("player"),
            pos(width() / 2, height() / 2 - 80),
            scale(2),
            anchor("center"),
        ]);
    
        // display score
        add([
            text(score),
            pos(width() / 2, height() / 2 + 80),
            scale(2),
            anchor("center"),
        ]);
    
        // go back to game with space is pressed
        onKeyPress("space", () => go("game"));
        onClick(() => go("game"));
    });
}

export {loadLoseScene};