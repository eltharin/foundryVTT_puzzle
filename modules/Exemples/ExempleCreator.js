export class ExempleCreator {
    static formDataKey = "nokey";

    static haveToCreate(formData)
    {
        return formData[this.formDataKey] == 1;
    }

    static _creation() {
        console.log("have to dev that")
    }
}