//<T> : T de type, não sabe qual é o tipo, pode ser qualquer tipo
//Pode indicar mais de um tipo genérico. No caso T, será o tipo da classe e K, o tipo do ID.
// Quem vai decidir o tipo, será a classe filha.

//abstract: Uma classe abstrata não pode criar uma instancia diretamente dela, não pode ser criado uma instancia da classe View, pode somente que a classe filha herda essa classe e cria uma instancia da classe filha.

//View é uma classe abstrata generica, abstrata porque não faz sentido criar instancia de view e eu quero forçar todos que herdar dessa classe View, forçar que eles implementem o método abstract template.
// Porque esse método, a classe pai não é capaz de definir, a classe filha que precisa definir.
// A classe pai(View) é responsavel por cuidar do método update, constructor e protected.

export abstract class View<T> {
    //Propriedade da classe
    // modificador protected, quando estamos desenvolvendo com herança e utiliza o modificador protected, significa que somente a View tem acesso a esse elemento da propriedade protected, mas as subclasses(classes que estão herdando a classe View) podem ter acesso.
    protected elemento: HTMLElement;
    //Método template que retorna uma string
    // escapar?: Quando colocar o ? na frente do parametro, quer dizer que esse parametro é opcional
    //O parametro opcional precisa ser passado por ultimo porque um parâmetro obrigatório não pode seguir um parâmetro opcional.

    constructor(seletor: string) {
        const elemento = document.querySelector(seletor);
        if (elemento) {
            //as HTMLInputElement: Diz que o retorno do querySelector vai ser convertido para um tipo que garante que não vai dar problema, vai retornar o tipo HTMLInputElement
            this.elemento = elemento as HTMLElement;
        } else {
            throw Error(`Seletor ${seletor} não existe no DOM. Verifique.`);
        }
    }


    //Renderizar o template no elemento que foi capturado atraves do constructor passando o seletor e integrando com querySelector;
    // public: Um método public pode ser acessado por outras classes
    public update(model: T): void {
        let template = this.template(model);
        this.elemento.innerHTML = template;
    }

    //Se na classe filha, não sobrescrever o template, vai ser mostrado no console do navegador.
    // Método abstrato, é um método que a classe pai não sabe como vai ser implementado, vai ser responsabilidade da classe filha.
    protected abstract template(model: T): string;

}