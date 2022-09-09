//enum : Garante que os valores sejam somente leitura e aplica um valor em cada dia automaticamente começando pelo 0.
//Permite que em um unico lugar constantes que pode reutilizar no sistema o nome dos valores listados pelo enum.
//As enum começam de 0, porém, se modificarmos o valor de alguma das enum, os próximos valores passarão a contar a partir do novo valor.
export enum DiasDaSemana {
    DOMINGO = 0,
    SEGUNDA = 1,
    TERCA = 2,
    QUARTA = 3,
    QUINTA = 4,
    SEXTA = 5,
    SABADO = 6
}