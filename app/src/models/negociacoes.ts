import { Modelo } from "../interfaces/modelo.js";
import { Negociacao } from "./negociacao.js";

//implements herda ou garante que a minha classe assine o contrato de imprimível para que ela seja obrigada a implementar o método paratexto
//Guarda uma lista de negociações
export class Negociacoes implements Modelo<Negociacoes> {
    //A mesma coisa Array<Negociacao> do Negociacao[], Negociacao[] é apenas um atalho
    private negociacoes: Negociacao[] = [];

    //Recebe a negociação e adiciona essa negociação na lista de negociacoes.
    // public: Um método public pode ser acessado por outras classes
    public adiciona(negociacao: Negociacao) {
        this.negociacoes.push(negociacao);
    }

    //Retornando lista de negociações somente leitura(ReadonlyArray)
    // A mesma coisa ReadonlyArray<Negociacao> do readonly Negociacao[], readonly Negociacao[] é apenas um atalho
    // public: Um método public pode ser acessado por outras classes
    public lista(): readonly Negociacao[] {
        return this.negociacoes;
    }

    public paraTexto(): string {
        // console.table(this.negociacoes);
        return JSON.stringify(this.negociacoes, null, 2);
    }

    //Serealizando os dois itens para saber se são iguais.
    public ehIgual(negociacoes: Negociacoes): boolean {
        return JSON.stringify(this.negociacoes) === JSON.stringify(negociacoes.lista());
    }
}