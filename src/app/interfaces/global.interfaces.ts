export interface Curso {
  id:number;
  nombre: string;
  CursoUsuario:cursoUsuarios[];
}
export interface Usuario {
  id: number;
  nombre:string;
  email:string;
  password:string;
}
export interface cursoUsuarios {
  id: number;
  usuarioId:number;
  cursoId:number;
}
export interface Response<TEntity> {
  Data: TEntity;
  DataList: TEntity[];
  Success: boolean;
  ErrorMessage: string;
  SuccessMessage: string;
}
