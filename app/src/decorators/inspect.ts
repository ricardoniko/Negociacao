//decorators para informar quais são os parametros, metodos e retorno
//decorators que não passa nenhum parâmetro
export function inspect(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
) {
    const metodoOriginal = descriptor.value;
    descriptor.value = function (...args: Array<any>) {
        console.log(`--- Método: ${propertyKey}`);
        console.log(`------ Parâmetros: ${JSON.stringify(args)}`);
        const retorno = metodoOriginal.apply(this, args);
        console.log(`----------- retorno: ${JSON.stringify(retorno)}`);
        return retorno;
    }
    return descriptor;
}