export interface Curso {
  id:number;
  nombre: string;
  cursoUsuarios:cursoUsuarios[];
}
export interface CursoRequest {
  idcurso:number,
  usuarios:[]
}
export interface Usuario {
  id: number;
  nombre:string;
  email:string;
  password:string;
}
export interface cursoUsuarios {
  "id": number,
  "usuarioId": number,
  'nombre': string,
}
export interface Response<TEntity> {
  Data: TEntity;
  DataList: TEntity[];
  Success: boolean;
  ErrorMessage: string;
  SuccessMessage: string;
}
