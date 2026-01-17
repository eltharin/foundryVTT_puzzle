import { ExempleCreator } from "./ExempleCreator.js"

export class Exemple3 extends ExempleCreator{

    static formDataKey = "exemple3";

    static async _creation() {
        console.log("creation de l'exemple 3")

        //create new folder to put items inside
        const rootFolder = game.folders.find(e => e.type== "Item" && e.name == "Puzzle - Exemples") || await Folder.create({name: "Puzzle - Exemples", type: "Item"});

        const folder = await Folder.create({name: "Exemple 3", type: "Item", folder : rootFolder});

        // creation de l'objet 1
        const item1 = await Item.create({name: "Fond", type: "puzzle.tornPaper", folder: folder, system : {img: "modules/puzzle/assets/exemples/ex3/fond.png", width: 96, height: 68}});

        // creation de l'objet 2
        const item2 = await Item.create({name: "Calc 1", type: "puzzle.tornPaper", folder: folder, system : {img: "modules/puzzle/assets/exemples/ex3/calc1.png", width: 96, height: 68}});

        // creation de l'objet 3
        const item3 = await Item.create({name: "Calc 2", type: "puzzle.tornPaper", folder: folder, system : {img: "modules/puzzle/assets/exemples/ex3/calc2.png", width: 96, height: 68}});

        // creation de l'objet 4
        const item4 = await Item.create({name: "Calc 3", type: "puzzle.tornPaper", folder: folder, system : {img: "modules/puzzle/assets/exemples/ex3/calc3.png", width: 96, height: 68}});

        // creation de l'objet 5
        const item5 = await Item.create({name: "Calc 4", type: "puzzle.tornPaper", folder: folder, system : {img: "modules/puzzle/assets/exemples/ex3/calc4.png", width: 96, height: 68}});
    }
}