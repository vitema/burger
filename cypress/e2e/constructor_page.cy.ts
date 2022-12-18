/// <reference types="cypress" />

describe("constructor page works correctly", () => {
  beforeEach(function () {
    cy.visit("http://localhost:3000");
  });

  it("should open constructor page by default", function () {
    cy.contains("Соберите бургер");
  });

  it("should open modal after component click", function () {
    cy.get('a[href*="ingredients"]').first().click();
    cy.contains("Детали ингридиента");
  });

  it("should open ingredient page by route", function () {
    cy.visit("http://localhost:3000/ingredients/60d3b41abdacab0026a733c6");
    cy.contains("булка");
  });

  it("should create order successfully", function () {
    const dataTransfer = new DataTransfer();
    cy.get("li[draggable=true]").first().trigger("dragstart", {
      dataTransfer,
    });
    cy.get("[class^=burger-constructor_box]").trigger("drop", {
      dataTransfer,
    });
    cy.contains("верх");
    cy.contains("низ");

    cy.get("button").contains("Оформить").click();
    cy.contains("Вход");

    cy.get("input[name=email]").type("manapov-vm@yandex.ru");
    cy.get("input[name=password]").type("qwerty");
    cy.get("button[type=submit]").click();

    cy.get("button").contains("Оформить").click();

    cy.wait(1000 * 20);
    cy.contains("Ваш заказ начали готовить");
  });
});
