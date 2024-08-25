describe('sidemenuComponent Tests', () => {
  beforeEach(() => {
    // Visita la página que contiene tu componente
    cy.visit('http://localhost:4200/menu');
  });
  it('should render the sidemenu component correctly', () => {
    // Verifica que el componente de barra lateral existe
    cy.get('nav').should('exist');
    cy.get('div').should('have.class', 'bg-slate-500');
  });
  it('should display menu items correctly', () => {
    // Primero, asegúrate de que la barra lateral esté visible
    cy.get('button').click(); // Abre el menú si está cerrado

    // Verifica que los ítems del menú se muestran
    cy.get('a').should('have.length.greaterThan', 0);

    // Verifica la presencia de iconos y títulos
    cy.get('a').first().within(() => {
      cy.get('i').should('exist'); // Verifica que el ícono está presente
      cy.get('span').should('exist').and('not.be.empty'); // Verifica que el título está presente y no está vacío
    });
  });
});
