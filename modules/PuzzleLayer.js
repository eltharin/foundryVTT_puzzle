import { createNewScene } from "./PuzzleHelpers.js";

export class PuzzleLayer extends foundry.canvas.layers.PlaceablesLayer{
    

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
      onToolChange: () => canvas.puzzle.setAllRenderFlags({refreshState: true}),
      activeTool: "",
      tools: {
        addScene: {
          name: "addScene",
          order: 1,
          active: false,
          title: "puzzle.CONTROLS.addScene",
          icon: "fa-solid fa-map",
          button: true,
          onChange: () => createNewScene()
        }
      }
    };
  }
  
  /** @inheritDoc */
  async _draw(options) {
    this.objects = this.addChild(new PIXI.Container());
  }
}