/// <reference types="cypress" />

describe('constructor page works correctly', () => {

  beforeEach(function() {
    cy.visit('http://localhost:3000');
  });

  it('should open constructor page by default', function() {
    cy.contains('Соберите бургер');
  });
  
  it('should open modal after component click', function() {

    cy.get('a[href*="ingredients"]').first().click()
    cy.contains('Детали ингридиента');
  });

  it('should open ingredient page by route', function() {
    cy.visit('http://localhost:3000/ingredients/60d3b41abdacab0026a733c6');
    cy.contains('булка');
  });



})