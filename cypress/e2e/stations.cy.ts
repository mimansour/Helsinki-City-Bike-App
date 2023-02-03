import {
  namesPage1,
  namesPage2,
  orderedAscNames,
  orderedDescNames,
} from 'fixtures/stations'

describe('Stations page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/stations')
  })

  it('renders data', async () => {
    cy.contains('1 of 46')
    namesPage1.map((name) => cy.contains(name))
  })

  it('pagination works', () => {
    cy.get(`[aria-label="next page"]`).click()
    cy.contains('2 of 46')
    namesPage2.map((name) => cy.contains(name))

    cy.get(`[aria-label="previous page"]`).click()
    cy.contains('1 of 46')
    namesPage1.map((name) => cy.contains(name))
  })

  it('ordering by column works', () => {
    namesPage1.map((name) => cy.contains(name))
    cy.get('[aria-label="order by column nameFi"]').click()
    orderedDescNames.map((name) => cy.contains(name))
    cy.get('[aria-label="order by column nameFi"]').click()
    orderedAscNames.map((name) => cy.contains(name))
  })

  it('search input works', () => {
    const searchedList = ['Linnakepolku', 'Linnanmäki', 'Hämeenlinnanväylä']

    namesPage1.map((name) => cy.contains(name))
    cy.get('[aria-label="search nameFi"]').type('Linna')
    searchedList.map((name) => cy.contains(name))
  })

  it('clicking station name navigates to single station view page', () => {
    cy.contains('Golfpolku').click()
    cy.get('h1').contains('Golfpolku')
    cy.get('h2').contains('Journeys starting from Golfpolku')
  })
})

export {}
