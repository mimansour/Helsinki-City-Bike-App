describe('Stations page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/stations')
  })

  it('renders data', async () => {
    cy.get('div').contains('10 Rows')
    cy.contains('1 of 46')
  })

  it('pagination works', () => {
    cy.get('button').contains('>').click()
    cy.contains('2 of 46')

    cy.get('button').contains('<').click()
    cy.contains('1 of 46')
  })
})

export {}
