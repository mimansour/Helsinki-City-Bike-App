describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('should render home page and footer', () => {
    cy.get('h1').contains('Helsinki City Bike App')
    cy.get('footer').contains('Copyright ©2023.')
  })

  it('navbar links work', () => {
    cy.contains('Stations').click()
    cy.get('h1').contains('Stations')
    cy.contains('Name')
    cy.contains('Address')

    cy.contains('Journeys').click()
    cy.get('h1').contains('Journeys')

    cy.contains('Home').click()
    cy.get('h1').contains('Helsinki City Bike App')
  })

  it('clicking Get started link renders stations table', () => {
    cy.contains('Get started').click()
    cy.get('h1').contains('Stations')
    cy.contains('Name')
    cy.contains('Address')
  })

  it('clicking the logo navigates back to home page', () => {
    cy.contains('Get started').click()
    cy.get('h1').contains('Stations')

    cy.get('[data-test-id="logo"]').click()
    cy.get('h1').contains('Helsinki City Bike App')
  })
})

export {}
