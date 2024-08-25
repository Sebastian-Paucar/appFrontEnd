describe('Curso Component Tests', () => {
  beforeEach(() => {
    // Visita la página que contiene tu componente
    cy.visit('http://localhost:4200/menu/cursos');
  });

  it('should render the "Nuevo Curso" button and click it', () => {
    // Verifica que el botón "Nuevo Curso" se renderiza
    cy.get('button').contains('Nuevo Curso').should('exist');

    // Simula un clic en el botón "Nuevo Curso"
    cy.get('button').contains('Nuevo Curso').click();

  });

  it('should filter courses based on search input', () => {
    // Escribe en el campo de búsqueda
    cy.get('input[matInput]').type('Fisica');

  });

  it('should render table and perform actions', () => {
    // Verifica que la tabla está visible
    cy.get('table').should('be.visible');

  });

  it('should paginate correctly', () => {
    // Verifica que el paginador está visible
    cy.get('mat-paginator').should('be.visible');

  });
});
