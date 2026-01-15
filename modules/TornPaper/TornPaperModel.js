export class TornPaperModel extends foundry.abstract.TypeDataModel {

  constructor(data, options) {
    options.parent.img = "modules/puzzle/assets/puzzle-piece.svg"
    super(data, options);
  }

  static defineSchema() {
    const fields = foundry.data.fields;
    return {
        name: new fields.StringField({blank: true}),
        img: new fields.FilePathField({required: false, categories: ["IMAGE"]}),
        width: new fields.StringField({blank: true}),
        height: new fields.StringField({blank: true}),
        tokenId: new fields.StringField({blank: true}),
    };
  }
}