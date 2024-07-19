# Documentación de Microservicios

## Microservicio de Usuarios

Este microservicio está creado en Java y utiliza una base de datos MySQL. Está desarrollado en el IDE de IntelliJ.

### Entidad Usuario

- **`getId()`**: Retorna el identificador único del usuario.
- **`setId(Long id)`**: Establece el identificador único del usuario.
- **`getNombre()`**: Retorna el nombre del usuario.
- **`setNombre(String nombre)`**: Establece el nombre del usuario.
- **`getEmail()`**: Retorna el correo electrónico del usuario.
- **`setEmail(String email)`**: Establece el correo electrónico del usuario.
- **`getPassword()`**: Retorna la contraseña del usuario.
- **`setPassword(String password)`**: Establece la contraseña del usuario.

## Microservicio de Cursos

Este microservicio está creado con Spring Boot y utiliza una base de datos PostgreSQL. Está desarrollado en el IDE de IntelliJ.

### Entidad Curso

- **`getId()`**: Retorna el identificador único del curso.
- **`setId(long id)`**: Establece el identificador único del curso.
- **`getNombre()`**: Retorna el nombre del curso.
- **`setNombre(String nombre)`**: Establece el nombre del curso.
- **`getCursoUsuarios()`**: Retorna la lista de asociaciones entre cursos y usuarios.
- **`setCursoUsuarios(List<CursoUsuario> cursoUsuarios)`**: Establece la lista de asociaciones entre cursos y usuarios.
- **`addCursoUsuario(CursoUsuario cursoUsuario)`**: Añade una asociación entre un curso y un usuario.
- **`removeCursoUsuario(CursoUsuario cursoUsuario)`**: Elimina una asociación entre un curso y un usuario.

### Entidad CursoUsuario

- **`getId()`**: Retorna el identificador único de la asociación entre el curso y el usuario.
- **`setId(Long id)`**: Establece el identificador único de la asociación entre el curso y el usuario.
- **`getUsuarioId()`**: Retorna el identificador del usuario asociado.
- **`setUsuarioId(Long usuarioId)`**: Establece el identificador del usuario asociado.
