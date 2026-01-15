
export class TornPaperSheet extends foundry.applications.api.HandlebarsApplicationMixin(
  foundry.applications.sheets.ItemSheetV2
) {
  
  /** @override */
  _onRender(context, options) {
    super._onRender(context, options);
    
    // Activer le changement d'image
    this._activateImageEditor();  
  }

  /** @override */
  async _prepareContext(options) {
    const context = await super._prepareContext(options);
    
    // Ajouter les données de l'item au contexte
    context.system = this.document.system;
    context.item = this.document;

    return context;
  }

  
  _configureRenderParts() {
    return {
      template: { template: 
          (game.user.hasRole("GAMEMASTER") || game.user.hasRole("ASSISTANT")) ? 
            "modules/puzzle/templates/tornPaper/tornPaperSheet_edit.hbs" : 
            "modules/puzzle/templates/tornPaper/tornPaperSheet_view.hbs"
      }
    }
  }

  /**
   * Activer l'édition de l'image au clic
   * @private
   */
  _activateImageEditor() {
    this.element.querySelectorAll('[data-edit="img"]').forEach(imgElement => {
      imgElement.style.cursor = 'pointer';
      imgElement.addEventListener('click', async (event) => {
      event.preventDefault();

      const fp = new foundry.applications.apps.FilePicker.implementation({
        type: "image",
        current: this.document[event.target.dataset.prop],
        callback: async (path) => {
          let updates = {};
          updates[event.target.dataset.prop] = path;

          imgElement.src = path;

          setTimeout(() => {
            updates = this._onUpdateImage(updates, path, imgElement);
            this.document.update(updates);
          }, 100);
        }
      });
      
      return fp.browse();
      });
    });
  }

  _onUpdateImage(updates, path, imgElement) {
    updates["system.width"] = imgElement.naturalWidth / 10;
    updates["system.height"] = imgElement.naturalHeight / 10;

    console.log(imgElement.naturalWidth);
    console.log(imgElement.naturalHeight);

    return updates;
  }


  /** @override */
  _attachPartListeners(partId, htmlElement, options) {
    super._attachPartListeners(partId, htmlElement, options);
    
    const form = htmlElement.closest('form') || htmlElement;

    if (form && form.tagName === 'FORM') {
      // Auto-save sur changement
      form.addEventListener('change', async (event) => {
        const formData = new foundry.applications.ux.FormDataExtended(form);
        const submitData = foundry.utils.expandObject(formData.object);
        
        try {
          await this.document.update(submitData, { render: false });
        } catch(error) {
          Logger.error(`${this.document.type} Sheet | Erreur update`, error);
        }
      });
      
      // Soumission manuelle du formulaire
      form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new foundry.applications.ux.FormDataExtended(form);
        const submitData = foundry.utils.expandObject(formData.object);
        await this.document.update(submitData, { render: false });
      });
    } else {
      console.error("unable to find parent form.");
    }
  }
}