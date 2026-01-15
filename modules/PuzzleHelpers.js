export function createNewScene() {
    return  Scene.create({
        name: "puzzle scene", 
        active: true, 
        grid: {size: 20}, 
        height: 3000, 
        width: 4000, 
        ownership: {default: 2}, 
        tokenVision: false,
        flags: {
            puzzle: {
                puzzleScene: true
            }
        }
    });
}