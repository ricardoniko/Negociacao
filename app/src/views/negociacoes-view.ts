import { escapar } from "../decorators/escapar.js";
import { Negociacoes } from "../models/negociacoes.js";
import { View } from "./view.js";

//<Negociacoes> significa que o tipo que vai entrar nessa classe vai ser o tipo Negociacoes
export class NegociacoesView extends View<Negociacoes> {

    //Chamando função decorators
    @escapar
    //map: converte cada negociação em uma string
    //join: Pega a lista, converte cada modelo que é um objeto javascript em uma string, junta tudo em uma unica string e o separador entre eles vai ser o espaço/vazio.
    protected template(model: Negociacoes): string {
        return `
        <table class="table table-hover table-bordered">
            <thead>
                <tr>
                    <th>DATA</th>
                    <th>QUANTIDADE</th>
                    <th>VALOR</th>
                </tr>
            <tbody>
             ${model.lista().map(negociacao => {
            return `
                    <tr>
                        <td>${this.formatar(negociacao.data)}</td>
                        <td>${negociacao.quantidade}</td>
                        <td>${negociacao.valor}</td>
                    </tr>
                `;
        }).join('')}
            </tbody>
            </thead>
        </table>
        `;
    }

    //Intl: Uma classe que possui varios métodos static, criando uma nova instancia de DateTimeFormat(), se não passar nada por parametro, vai adotar a localidade padrão do navegador que o usuario esta.
    // .format() : passar por parametro oque deseja ser formatado
    // private: Um método privado só pode ser acessado pela propria classe
    private formatar(data: Date): string {
        return new Intl.DateTimeFormat().format(data)
    }

}