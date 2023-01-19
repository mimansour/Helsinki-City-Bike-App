describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('should render home page', () => {
    cy.get('h1').contains('Welcome to Helsinki City Bike App!')
  })

  it('clicking Stations link renders stations table', () => {
    cy.contains('Stations').click()
    cy.contains('Name')
    cy.contains('Address')
  })
  it('clicking Journies link renders journies table', () => {
    cy.contains('Journies').click()
    cy.contains('Departure station')
    cy.contains('Return station')
    cy.contains('Covered distance (km)')
    cy.contains('Duration (min)')
  })
})

export {}
