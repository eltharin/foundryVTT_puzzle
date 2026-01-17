import { ExempleCreator } from "./ExempleCreator.js"

export class Exemple2 extends ExempleCreator{

    static formDataKey = "exemple2";

    static async _creation() {
        console.log("creation de l'exemple 2") 
        
        //create new folder to put items inside
        const rootFolder = game.folders.find(e => e.type== "Item" && e.name == "Puzzle - Exemples") || await Folder.create({name: "Puzzle - Exemples", type: "Item"});

        const folder = await Folder.create({name: "Exemple 2", type: "Item", folder : rootFolder});

        // creation de l'objet 1
        const item1 = await Item.create({name: "Symbols", type: "puzzle.tornPaper", folder: folder, system : {img: "modules/puzzle/assets/exemples/ex2/symbols.png", width: 192, height: 109}});

        // creation de l'objet 2
        const item2 = await Item.create({name: "Mask", type: "puzzle.tornPaper", folder: folder, system : {img: "modules/puzzle/assets/exemples/ex2/mask.png", width: 71, height: 45}});
    }
}