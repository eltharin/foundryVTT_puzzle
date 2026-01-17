import { ExempleCreator } from "./ExempleCreator.js"

export class Exemple1 extends ExempleCreator{

    static formDataKey = "exemple1";

    static async _creation() {
        console.log("creation de l'exemple 1");

        //create new folder to put items inside
        const rootFolder = game.folders.find(e => e.type== "Item" && e.name == "Puzzle - Exemples") || await Folder.create({name: "Puzzle - Exemples", type: "Item"});

        const folder = await Folder.create({name: "Exemple 1", type: "Item", folder : rootFolder});

        // creation de l'objet 1
        const item1 = await Item.create({name: "Indice 1.1", type: "puzzle.tornPaper", folder: folder, system : {img: "modules/puzzle/assets/exemples/ex1/img-tl.png", width: 45, height: 32}});

        // creation de l'objet 2
        const item2 = await Item.create({name: "Indice 1.2", type: "puzzle.tornPaper", folder: folder, system : {img: "modules/puzzle/assets/exemples/ex1/img-ml.png", width: 42, height: 35}});

        // creation de l'objet 3
        const item3 = await Item.create({name: "Indice 1.3", type: "puzzle.tornPaper", folder: folder, system : {img: "modules/puzzle/assets/exemples/ex1/img-bl.png", width: 44, height: 42}});

        // creation de l'objet 4
        const item4 = await Item.create({name: "Indice 1.4", type: "puzzle.tornPaper", folder: folder, system : {img: "modules/puzzle/assets/exemples/ex1/img-tr.png", width: 46, height: 34}});

        // creation de l'objet 5
        const item5 = await Item.create({name: "Indice 1.5", type: "puzzle.tornPaper", folder: folder, system : {img: "modules/puzzle/assets/exemples/ex1/img-mr.png", width: 47, height: 34}});

        // creation de l'objet 6
        const item6 = await Item.create({name: "Indice 1.6", type: "puzzle.tornPaper", folder: folder, system : {img: "modules/puzzle/assets/exemples/ex1/img-br.png", width: 50, height: 42}});
    }
}