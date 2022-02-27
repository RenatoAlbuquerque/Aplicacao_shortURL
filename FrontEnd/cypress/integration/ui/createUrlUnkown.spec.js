describe("Create user", () => {
  it("Visits the Home", () => {
    cy.visit("http://localhost:3000");
    cy.get("#addUrlUnkown").should("be.visible").click();

    //Cadastrar
    cy.get("#shortUrl").should("be.visible").type("https://www.instagram.com");
    cy.get('button[type="submit"]').should("be.visible").click();

    //Abrir link e ir a página de Ranking Url
    cy.get("#linkShortURL").should("be.visible").click();
    cy.visit("http://localhost:3000/topurl");
  });
});
