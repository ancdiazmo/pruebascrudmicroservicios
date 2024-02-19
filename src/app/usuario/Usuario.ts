import { Perfil } from "../perfil/Perfil"

export interface Usuario {
    id: number,
    nombre: string,
    perfil: Perfil
}