describe( 'Form Test', () => {

    beforeEach(() => {
    cy.visit('http://localhost:3000/')});

    // sanity test
    it('Testing true is true', function() {
      expect(true).to.equal(true);
    });

    const inputName = () => cy.get('input[name="name"]');
    const inputEmail = () => cy.get('input[name="email"]');
    const inputPsswrd = () => cy.get('input[name="password"]');
    const termsChkBox = () => cy.get('input[name="terms"]');
    const submitButton = () => cy.get('button');
    const submitForm = () => cy.get('form');


    it('Testing the inputs', () => {

        inputName()
        .should("have.value", "")
        .type("Tommy Capello")
        .should("have.value","Tommy Capello")

        inputEmail()
        .should("have.value", "")
        .type("tommy@capello.com")
        .should("have.value","tommy@capello.com")

        inputPsswrd()
        .should("have.value", "")
        .type("ilovesecrets!")
        .should("have.value","ilovesecrets!")

        termsChkBox()
        .should('not.be.checked')
        .check()
        .should('be.checked')
    })

    it('Testing the form submission', () => {
        inputName()
        .type("Tommy Capello")

        inputEmail()
        .type("tommy@capello.com")

        inputPsswrd()
        .type("ilovesecrets!")

        termsChkBox()
        .check()

        submitForm()
        .submit()
    });

    it('Testing the form validation', () => {

        inputName()
        .type("Tommy Capello");

        inputEmail()
        .clear();
        termsChkBox()
        .check();

        submitButton()
        .should('have.attr', 'disabled');

    });
});