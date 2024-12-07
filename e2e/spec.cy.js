describe('TODOMvc App', () => {
    it('Verifica se a aplicação abre corretamente', () => {
      cy.visit('')
    })
  
    it('Adiciona uma nova tarefa', () => {
      cy.visit(''); 
  
      cy.get('[data-cy=todo-input]')
        .type('Estudo para Engenharia de Software{enter}');
  
      cy.get('[data-cy=todos-list]')
        .children()
        .should('have.length', 1) 
        .first()
        .should('have.text', 'Estudo para Engenharia de Software'); 
    });
  
    it('Adiciona e remove uma tarefa', () => {
      cy.visit('');
  
      cy.get('[data-cy=todo-input]')
        .type('Estudo para Engenharia de Software{enter}');
  
      cy.get('[data-cy=todos-list]')
        .children()
        .should('have.length', 1);
  
      cy.get('[data-cy=todos-list] > li [data-cy=remove-todo-btn]')
        .invoke('show')
        .click();
  
      cy.get('[data-cy=todos-list]')
        .children()
        .should('have.length', 0);
    });
  
    it('Filtra tarefas feitas e ativas', () => {
      cy.visit(''); 
  
      cy.get('[data-cy=todo-input]')
        .type('Estudo de ES{enter}')
        .type('Revisão de ES{enter}');
  
      cy.get('[data-cy=todos-list] > li [data-cy=toggle-todo-checkbox]')
        .first()
        .click();
  
      cy.get('[data-cy=filter-active-link]')
        .click();
      cy.get('[data-cy=todos-list]')
        .children()
        .should('have.length', 1)
        .first()
        .should('have.text', 'Revisão de ES');
  
      cy.get('[data-cy=filter-completed-link]')
        .click();
      cy.get('[data-cy=todos-list]')
        .children()
        .should('have.length', 1)
        .first()
        .should('have.text', 'Estudo de ES');
  
      cy.get('[data-cy=filter-all-link]')
        .click();
      cy.get('[data-cy=todos-list]')
        .children()
        .should('have.length', 2);
    });
  
    it('Testa a funcionalidade "clear completed"', () => {
      cy.visit('');
  
      cy.get('[data-cy=todo-input]')
        .type('Estudo de ES{enter}')
        .type('Revisão de ES{enter}');
  
      cy.get('[data-cy=todos-list] > li [data-cy=toggle-todo-checkbox]')
        .first()
        .click();
  
      cy.get('button.clear-completed')
        .click();
  
      cy.get('[data-cy=todos-list]')
        .children()
        .should('have.length', 1)
        .first()
        .should('have.text', 'Revisão de ES'); 
    });
  
    it('Edita uma tarefa existente', () => {
      cy.visit('');
  
      cy.get('[data-cy=todo-input]')
        .type('Estudo de ES{enter}');
  
      cy.get('[data-cy=todos-list] > li')
        .first()
        .dblclick();
  
      cy.get('input.edit')
        .first()
        .clear()
        .type('Trabalho Final de ES{enter}');
  
      cy.get('[data-cy=todos-list]')
        .children()
        .first()
        .should('have.text', 'Trabalho Final de ES');
    });
  
    it('Verifica a não persistência das tarefas após recarregar a página', () => {
      cy.visit('');
  
      cy.get('[data-cy=todo-input]')
        .type('Estudo de ES{enter}')
        .type('Revisão de ES{enter}');
  
      cy.reload();
  
      cy.get('[data-cy=todos-list]')
        .children()
        .should('have.length', 0)
    });
  
  });