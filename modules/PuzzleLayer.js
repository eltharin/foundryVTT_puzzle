import { createNewScene } from "./PuzzleHelpers.js";

export class PuzzleLayer extends foundry.canvas.layers.InteractionLayer{
    
  /** @inheritdoc */
  static get layerOptions() {
    return foundry.utils.mergeObject(super.layerOptions, {
      name: "puzzle",
      controllableObjects: false,
      rotatableObjects: false,
      zIndex: -2
    });
  }

  /** @override */
  static prepareSceneControls() {
    const sc = foundry.applications.ui.SceneControls;
    return {
      name: "puzzle",
      order: 100,
      title: "puzzle.CONTROLS.groupPuzzle",
      layer: "puzzle",
      icon: "fa-solid fa-puzzle-piece",
      visible: game.user.isGM,
      onChange: (event, active) => {
        if ( active ) canvas.puzzle.activate();
      },
      activeTool: "help",
      tools: {
        help: {
          name: "help",
          order: 1,
          visible: true,
          active: false,
          title: "puzzle.CONTROLS.help",
          icon: "fa-solid fa-question",
          button: true,
          toolclip: {
            heading: "puzzle.CONTROLS.helpToolclip",
          }
        },
        addScene: {
          name: "addScene",
          order: 2,
          visible: true,
          active: false,
          title: "puzzle.CONTROLS.addScene",
          icon: "fa-solid fa-map",
          button: true,
          onChange: () => createNewScene()
        }
      }
    };
  }
}