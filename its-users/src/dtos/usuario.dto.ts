export class CreateUsuarioDto{
    nombre: string;
    apellido:string;
    email: string;
    contraseña:string;
    rol?: 'USUARIO'| 'ADMIN'
}