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
  nombre: string;
  email: string;
  password: string;
  roles?: Role[];
  accountNonExpired?: boolean;
  accountNonLocked?: boolean;
  credentialsNonExpired?: boolean;
  enabled?: boolean;
  username?: string;
  authorities?: Authority[];
}

export interface Role {
  id: number;
  role: string;
}

export interface Authority {
  authority: string;
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
