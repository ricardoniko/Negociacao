import { NegociacaoController } from "./controllers/negociacao-controller.js";
import { NegociacoesView } from "./views/negociacoes-view.js";

const controller = new NegociacaoController();

//StrictNullChecks não está ativo, o typescript considera null como um valor possivel para todos os tipos que foram criados.
//form pode ser HTMLInputElement ou null.
const form = document.querySelector(".form");
//Se form não for null e nem undefined, adiciona o addEventListener
if (form) {
    form.addEventListener('submit', (event: Event) => {
        //Não recarrega a página quando faz o submit
        event.preventDefault();
        controller.adiciona();
    });
} else {
    throw Error("Não foi possivel inicializar a aplicação. Verifique se o form existe");
}

const botaoImporta = document.querySelector("#botao-importa");
if (botaoImporta) {
    botaoImporta.addEventListener('click', () => {
        controller.importaDados();
    })
} else {
    throw Error("Botão importa não foi encontrado");
}


const x: string | number | boolean = 10;