import { View } from "./view.js";

//<string> significa que o tipo que vai entrar nessa classe vai ser o tipo string
export class MensagemView extends View<string> {

   protected template(model: string): string {
        return `
            <p class="alert alert-info">${model}</p>
        `;
    }
}