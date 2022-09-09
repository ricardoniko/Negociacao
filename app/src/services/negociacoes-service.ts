import { NegociacoesDoDia } from "../interfaces/negociacao-do-dia.js";
import { Negociacao } from "../models/negociacao.js";

export class NegociacoesService {

    //Vai retornar uma Promise.
    //Convertendo as negociações do dia para um array de negociação
    public obterNegociacoesDoDia(): Promise<Negociacao[]> {
        //fetch: Api fetch está globalmente disponivel no navegador, ela recebe como parâmetro o endereço da api.
        //Quando a api fetch() vai buscar, é uma operação assincrona, quando o resultado chega, é pego através de uma chamada encadeada a .then(). o then() vai retornar uma resposta do backend.
        return fetch('http://localhost:8080/dados')
            //Convertendo a resposta que esta recebendo como um texto grande no formato json, para um objeto javascript json.
            //Retorna uma Promise
            .then(res => res.json())
            //Lista de dados, array de dados do tipo any
            .then((dados: Array<NegociacoesDoDia>) => {
                return dados.map(dadosDeHoje => {
                    //Quando retornar o map, os dados vão ser convertidos para uma instância de negociação pro dia de hoje.
                    return new Negociacao(new Date(), dadosDeHoje.vezes, dadosDeHoje.montante);
                });
            })
    }
}