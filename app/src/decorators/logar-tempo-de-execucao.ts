//Estrutura de um Decorator
export function logarTempoDeExecucao(emSegundos: boolean = false) {
    return function (
        //target: Função construtora do decorators no método static, se coloca em um método que não é static, ele vai retornar o prototype da classe.
        //any: Pode ser um construtor ou um prototype da classe, pode ser qualquer coisa.
        target: any,
        //propertyKey: Da o nome do método como string que foi decorado
        propertyKey: string,
        //descriptor / PropertyDescriptor: Ele sabe tudo sobre o método que queremos executar/modificar, ele tem uma referência pro método original.  
        descriptor: PropertyDescriptor
    ) {
        //metodoOriginal: Tirado da instância da classe e esta inserido dentro de uma variavel que contem a referencia para o método.
        const metodoOriginal = descriptor.value;
        //Sobrescrevendo o comportamento
        //... pegando os parametros e transformando em array e vão ser passados como array
        //Array<any> ou any[] : Definindo o array do tipo any porque não sabemos quais são os parâmetros que foi passado.
        descriptor.value = function (...args: Array<any>) {
            let divisor = 1;
            let unidade = 'milisegundos'
            if (emSegundos) {
                divisor = 1000;
                unidade = 'segundos';
            }
            //Guardando o tempo
            const t1 = performance.now();
            //apply permite passar um contexto e um array de parâmetros.
            //apply precisa ser passado o contexto e quais os parâmetros.
            //this: Instancia que esta executando o metodo no momento.
            const retorno = metodoOriginal.apply(this, args);
            const t2 = performance.now();
            console.log(`${propertyKey}, tempo de execução: ${(t2 - t1) / divisor} ${unidade}.`);
            //Chamar o métoro original
            return retorno;
        };
        return descriptor;
    }
}