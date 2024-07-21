export interface Curso {
  id:number;
  nombre: string;
  cursoUsuarios:cursoUsuarios[];
}
export interface Usuario {
  id: number;
  nombre:string;
  email:string;
  password:string;
}
export interface cursoUsuarios {
  "id": number,
  "usuarioId": number
}
export interface Response<TEntity> {
  Data: TEntity;
  DataList: TEntity[];
  Success: boolean;
  ErrorMessage: string;
  SuccessMessage: string;
}
