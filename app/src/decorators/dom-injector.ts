// domInjector recebe como parametro o id do elemento que vai ser buscado no DOM e retorna um decorator de propriedade.
export function domInjector(seletor: string) {
    return function (target: any, propertyKey: string) {
        console.log(`Modificando prototype ${target.constructor.name} e adicionando getter para a propriedade ${propertyKey}.`);


        let elemento: HTMLElement;

        //Método que busca o elemento do DOM com base no seletor informado e retorna uma função que é a getter.
        const getter = function () {
            //Se existir elemento, não vai entrar no if, vai entrar somente a primeira vez quando a primeira negociação for criada.
            if (!elemento) {
                //Vai retornar html
                elemento = <HTMLElement>document.querySelector(seletor);
                console.log(`Buscando elemento do DOM com o seletor ${seletor} para injetar em ${propertyKey}`);
            }

            return elemento;
        }

        //Pegar esse prototype para essa propriedade e setar esse getter. passa por cima dela, define esse getter.
        //Isso significa que a propriedade agora lá inputData, inputQuantidade e inputValor, todas agora são getter e quando forem acessadas vão executar qual código
        Object.defineProperty(
            //Object.defineProperty: Pega o prototype/target para a propriedade propertyKey e seta o getter, definindo o getter.
            target,
            propertyKey, {
            //get vai receber como valor o getter
            get: getter
        });
    }
}