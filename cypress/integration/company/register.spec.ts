import 'cypress-file-upload';
import companyUrls from '../../../src/services/urls/company';
const image = 'images/skillAlexa.png';

const baseUrl = Cypress.env('CYPRESS_API');
const token = Cypress.env('CYPRESS_TOKEN');

before(() => {
    window.localStorage.setItem('@Mands:token', token);
});

describe('Register a new company', () => {
    it('Should visit the page', () => {
        cy.visit('/cadastrar-empresa');
    });

    it('Should fill the Inputs', () => {
        cy.get('[ data-cy="company-name"]').type('Facebook');
        cy.get('[data-cy=company-username]').type('Face');
        cy.get('[data-cy=company-email]').type('oi@Facebook.com');
        cy.get('[data-cy=company-phone]').type('71995187312');
        cy.get('[data-cy=company-cnpj]').type('94365130000171');
    });

    it("Should upload the company's image", () => {
        cy.get('[data-cy="image-input"]').attachFile(image);
        cy.get('[data-cy="crop-image-button"]').click();
    });

    it('Should register a new company', () => {
        cy.intercept('POST', `${baseUrl}/${companyUrls.base}`).as(
            'registerCompany'
        );

        cy.get('form').submit();

        cy.wait('@registerCompany').then(({ request, response }) => {
            cy.log(JSON.stringify(response, null, 2));
            expect(response.statusCode).be.greaterThan(199).below(300);
        });
    });
});
