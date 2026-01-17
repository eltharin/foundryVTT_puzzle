import { TornPaperModel } from "./TornPaper/TornPaperModel.js";
import { TornPaperSheet } from "./TornPaper/TornPaperSheet.js";
import { PuzzleLayer } from "./PuzzleLayer.js";
import { ExempleCreatorSettings } from "./Exemples/ExempleCreatorSettings.js";

Hooks.on("init", () => {
    
    CONFIG.Canvas.layers.puzzle = {
        layerClass: PuzzleLayer,
        group: "interface"
    };


	Object.assign(CONFIG.Item.dataModels, {
        "puzzle.tornPaper": TornPaperModel,
    });


    foundry.documents.collections.Items.registerSheet("puzzle", TornPaperSheet, {
        types: ["puzzle.tornPaper"],
        makeDefault: true,
        label: "Morceau de papier"
    });

    game.settings.registerMenu('puzzle', 'exemples', { 
        name: game.i18n.localize("puzzle.settings.menus.exemple_creation"), 
        label: game.i18n.localize("puzzle.settings.exemple_creation"), 
        icon: "fas fa-sitemap", type: ExempleCreatorSettings, restricted: true 
    });
    
});


Hooks.on("dropCanvasData", (canvas, data) => { 
    if (canvas.scene.flags?.puzzle?.puzzleScene == true) {
        if (data.type === "Item") { 
            fromUuid(data.uuid).then(function(item) {
                if(item.type == "puzzle.tornPaper") {
                    canvas.scene.createEmbeddedDocuments("Token", [{
                        texture: {src: item.system.img}, 
                        rotation: 0, 
                        locked: false, 
                        movementAction: "displace",
                        x: data.x, 
                        y: data.y, 
                        width: item.system.width ,
                        height: item.system.height,
                        flags: {puzzle: {puzzleToken: true}}
                    }]); 
                }
                else
                {
                    console.debug("can't drop this item's type on this scene");
                }
            });        
        } 
    }
    else
    {
        console.debug("scene was not created by puzzle");
    }
});


Hooks.on('preUpdateToken', (token, changes, data, ...args) => {
    
    if (canvas.scene.flags?.puzzle?.puzzleScene != true) return;
    if (!(changes.x || changes.y) || data.animate === false) return;

    changes.movementAction = "displace";
    data._movement[token._id].autoRotate = false;
    data._movement[token._id].showRuler = false;
    
    changes.rotation = token.rotation;
});


