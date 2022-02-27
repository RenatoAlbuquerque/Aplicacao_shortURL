describe("Create user", () => {
  it("Visits the Home", () => {
    cy.visit("http://localhost:3000");
    cy.get("img");
    cy.get("button").contains("Criar Conta").click();

    //Completar Cadastro
    cy.get("#name").should("be.visible").type("Teste e2e");
    cy.get("#email_register").should("be.visible").type("testee2e@exemplo.com");
    cy.get("#current-password").should("be.visible").type("teste");
    cy.get('button[type="submit"]').should("be.visible").click();
    //Fazer Login
    cy.get("#closeModalLogin").should("be.visible").click();
    cy.get("#btnLogin").should("be.visible").click();

    cy.get("#email").should("be.visible").type("testee2e@exemplo.com");
    cy.get("#password").should("be.visible").type("teste");
    cy.get('button[type="submit"]').should("be.visible").click();

    //Cadastrar
    cy.get("#shortUrl").should("be.visible").type("https://www.google.com");
    cy.get('button[type="submit"]').should("be.visible").click();
    cy.get('input[type="text"]').clear();
    cy.get("#shortUrl").should("be.visible").type("https://www.facebook.com");
    cy.get('button[type="submit"]').should("be.visible").click();

    //Abrir link e ir a página de Ranking Url
    cy.get("#linkShortURL").should("be.visible").click();
    cy.visit("http://localhost:3000/topurl");

    //Sair da conta
    cy.get("#logout").should("be.visible").click();
    cy.visit("http://localhost:3000/topurl");
  });
});
