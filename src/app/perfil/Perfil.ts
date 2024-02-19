import { Aplication } from "../aplicacion/aplicacion/Aplication";

export interface Perfil {
    id: number,
    nombre: string,
    aplicacion: Aplication
}