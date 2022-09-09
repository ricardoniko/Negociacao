import { Imprimivel } from "../utils/imprimivel.js";
import { Comparavel } from "./comparavel.js";

//Todos que implementar a interface modelo, vai automaticamente ter a obrigação de implementar os métodos Imprimivel e o método Comparavel
export interface Modelo<T> extends Imprimivel, Comparavel<T> {

}