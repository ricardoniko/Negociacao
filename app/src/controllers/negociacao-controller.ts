import { inspect } from "../decorators/inspect.js";
import { domInjector } from "../decorators/dom-injector.js";
import { logarTempoDeExecucao } from "../decorators/logar-tempo-de-execucao.js";
import { DiasDaSemana } from "../enums/dias-da-semana.js";
import { Negociacao } from "../models/negociacao.js";
import { Negociacoes } from "../models/negociacoes.js";
import { MensagemView } from "../views/mensagem-view.js";
import { NegociacoesView } from "../views/negociacoes-view.js";
import { NegociacoesService } from "../services/negociacoes-service.js";
import { imprimir } from "../utils/imprimir.js";

export class NegociacaoController {
    //Propriedades da classe
    //Propriedade do o tipo HTMLInputElement ou null
    //@domInject: Criando decorator para ir no elemento do DOM, buscar o elemento do DOM referente ao ID para o valor ser inserido no input.
    //domInjector é um derorator de de propriedade que recebe como parametro o id do elemento do DOM que busca e atribua a atribui nas propriedades inputData, inputQuantidade e inputValor.
    @domInjector('#data')
    private inputData: HTMLInputElement;
    @domInjector('#quantidade')
    private inputQuantidade: HTMLInputElement;
    @domInjector('#valor')
    private inputValor: HTMLInputElement;
    private negociacoesView = new NegociacoesView('#negociacoesView');
    private mensagemView = new MensagemView('#mensagemView');
    private negociacoes = new Negociacoes(); //Propriedade do o tipo Negociacoes
    private negociacaoService = new NegociacoesService();

    constructor() {
        this.negociacoesView.update(this.negociacoes);
    }

    //Chamando funções decorators de método
    //Passando a função direta do decorators, sem passar parametros, utilizar os () somente em caso de passar parametros.
    @inspect
    @logarTempoDeExecucao()
    //void : não retorna nada
    //public: Um método public pode ser acessado por outras classes
    public adiciona(): void {
        //Criando negociação
        const negociacao = Negociacao.criaDe(
            this.inputData.value,
            this.inputQuantidade.value,
            this.inputValor.value
        );
        if (!this.ehDiaUtil(negociacao.data)) {
            this.mensagemView.update("Apenas negociações em dias úteis são aceitas.");
            return;
        } else {
            this.negociacoes.adiciona(negociacao);
            imprimir(negociacao, this.negociacoes);
            this.atualizaView();
            this.limparFormulario();
        }
    }

    //Método para importar os dados da API
    public importaDados(): void {
        //Array de negociações, recebeu negociações do dia
        this.negociacaoService.obterNegociacoesDoDia()
            //Lista de negociações convertidas    
            .then(negociacoesDeHoje => {
                //filter: Filtrar negociação, não pode ter negociações que já existem na lista de negociações.
                //Para cada iteração do filter, retorna true ou false, se retornar true o item vai pra lista, se retornar false o item não vai pra lista.
                return negociacoesDeHoje.filter(negociacoesDeHoje => {
                    return !this.negociacoes
                        .lista()
                        //some: Se ele encontra, ele para e retorna true
                        .some(negociacao => negociacao.ehIgual(negociacoesDeHoje))
                });
            })
            .then(negociacoesDeHoje => {
                for (let negociacao of negociacoesDeHoje) {
                    this.negociacoes.adiciona(negociacao);
                }
                this.negociacoesView.update(this.negociacoes);
            });
    }

    // private: Um método privado só pode ser acessado pela propria classe
    private ehDiaUtil(data: Date) {
        //getDay() Retorna o dia da semana, os dias da semana são representados por número que vão de 0 (domingo) a 6 (sábado).
        //Verificando se a data da negociação é no dia útil
        // 0-domingo|1-segunda|2-terça|3-quarta|4-quinta|5-sexta|6-sabado
        return data.getDay() > DiasDaSemana.DOMINGO
            && data.getDay() < DiasDaSemana.SABADO;
    }

    // private: Um método privado só pode ser acessado pela propria classe
    private limparFormulario(): void {
        this.inputData.value = "";
        this.inputQuantidade.value = "";
        this.inputValor.value = "";
        this.inputData.focus();
    }

    // private: Um método privado só pode ser acessado pela propria classe
    private atualizaView(): void {
        this.negociacoesView.update(this.negociacoes);
        this.mensagemView.update("Negociação adicionada com sucesso");
    }
}