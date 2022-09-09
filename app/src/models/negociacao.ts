import { Modelo } from "../interfaces/modelo.js";

//implements herda ou garante que a minha classe assine o contrato de imprimível para que ela seja obrigada a implementar o método paratexto
export class Negociacao implements Modelo<Negociacao> {
    constructor(
        //Propriedades publicas
        //Logo apos a negociação criada, as propriedades são publicas, mas ninguem pode atribuir valor a elas pq são readonly(somente leitura)
        private _data: Date, // Colocando _ na frente pq o get abaixo não pode ter o mesmo nome da propriedade data.
        //Quantidade e valor são tipos literais do javascript, só é possivel modificar atribuindo.
        public readonly quantidade: number,
        public readonly valor: number
    ) { }

    //criaDe é um método da classe Negociacao, que se for passado dataString, quantidadeString e valorString, vai realizar a conversão e no final vai ser retornado uma negociação com os valores convertidos.
    //static: todo método static, é um método que pode ser chamado diretamente na classe.
    //Método static sempre tem que ser public.
    //Métodos estáticos podem ser acessados diretamente pela classe sem precisarmos de uma instância desta mesma classe.
    public static criaDe(dateString: string, quantidadeString: string, valorString: string): Negociacao {
        //Expressão regular, encontrar todos os (-)  
        const exp = /-/g;
        //Pegando a data que o usuario inserir no campo data no formulario
        const date = new Date(dateString.replace(exp, ','));
        const quantidade = parseInt(quantidadeString);
        const valor = parseFloat(valorString);
        return new Negociacao(date, quantidade, valor);
    }

    //Retorna apenas a multiplicação de quantidade * valor
    get volume(): number {
        return this.quantidade * this.valor;
    }

    //Retorna apenas data
    get data(): Date {
        //getTime() retorna a data em milissegundos em um numego grande e o construtor de Date cria uma data atraves desse numero grande
        const data = new Date(this._data.getTime());
        return data;
    }

    public paraTexto(): string {
        return `Data: ${this.data} Quantidade: ${this.quantidade} Valor: ${this.valor}`;
    }

    //Comparar a própria negociação com as outras
    public ehIgual(negociacao: Negociacao): boolean {
        return this.data.getDate() === negociacao.data.getDate()
            && this.data.getMonth() === negociacao.data.getMonth()
            && this.data.getFullYear() === negociacao.data.getFullYear();
    }
}