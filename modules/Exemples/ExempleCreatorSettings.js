import { Exemple1 } from "./Exemple1.js"
import { Exemple2 } from "./Exemple2.js"
import { Exemple3 } from "./Exemple3.js"

export class ExempleCreatorSettings extends foundry.applications.api.HandlebarsApplicationMixin(foundry.applications.api.ApplicationV2) {

    static get DEFAULT_OPTIONS() {
        return {
            tag: "form",
            id: "puzzle-exemple",
            //classes: ["settings-window"],
            window: {
                title: "puzzle.settings.menus.exemple_creation",
                resizable: false,
                controls: []
            },
            position: {
                width: 500,
                height: "auto"
            },
            form: {
                handler: ExempleCreatorSettings.submitSettings,
                closeOnSubmit: true
            }
        };
    }

    static PARTS = {
        form: {
            template: `modules/puzzle/templates/settings_exemples.hbs`,
            scrollable: [".sheet-body"]
        }
    };

    static registredExemples = [
        Exemple1,
        Exemple2,
        Exemple3
    ]

    static async submitSettings(event, form, formData) {
        const data = formData.object;

        ExempleCreatorSettings.registredExemples.forEach((exempleCreator) => {
            if(exempleCreator.haveToCreate(data)) {
                exempleCreator._creation(data);
            }
        });
    }
}