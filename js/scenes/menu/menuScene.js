function loadMenu(){
    // Menu Scene
    scene("menu", () => {
        const btnPlay = add([
            rect(240, 80, { radius: 8 }),
            pos(center()),
            area(),
            scale(1),
            anchor("center"),
            outline(4),
        ]);

        // Child objet to display text
        btnPlay.add([
            text("Play"),
            anchor("center"),
            color(0, 0, 0),
        ]);

        // onHoverUpdate() comes from area() component
        // it runs every frame when the object is being hovered
        btnPlay.onHoverUpdate(() => {
            btnPlay.scale = vec2(1.2)
            setCursor("pointer")
        });

        // onHoverEnd() comes from area() component
        // it runs once when the object stopped being hovered
        btnPlay.onHoverEnd(() => {
            btnPlay.scale = vec2(1);
        })

        btnPlay.onClick(() => go("game"));
    });
}

export {loadMenu};