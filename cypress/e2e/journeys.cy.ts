describe('Journeys page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/journeys')
  })

  const page1Data = [
    ['Laajalahden aukio', 'Teljäntie', '2.04', '8.33'],
    ['Töölöntulli', 'Pasilan asema', '1.87', '10.18'],
    ['Näkinsilta', 'Vilhonvuorenkatu', '1.02', '6.65'],
  ]

  it('renders data', () => {
    page1Data.map((arr) => arr.map((item) => cy.contains(item)))
  })

  it('loading more results works', () => {
    const page2Data = [
      ['Käpylän asema', 'Oulunkylän asema', '1.63', '11.2'],
      ['Kalevankatu', 'Välimerenkatu', '1.13', '5.75'],
      ['Käpylän asema', 'Oulunkylän asema', '1.7', '9.82'],
    ]

    cy.contains('Load more results').click()
    page2Data.map((arr) => arr.map((item) => cy.contains(item)))
  })

  it('ordering per column works', () => {
    const orderedPage = [
      ['A.I. Virtasen aukio', 'Katariina Saksilaisen katu', '2.53', '11.63'],
      ['A.I. Virtasen aukio', 'Rapakiventie', '5.78', '23.95'],
      ['A.I. Virtasen aukio', 'Brahen puistikko', '2.15', '10.08'],
      ['A.I. Virtasen aukio', 'Rautatientori / itä', '4.55', '27.17'],
    ]

    cy.get('[aria-label="order by column departureStationName"]').click()
    orderedPage.map((arr) => arr.map((item) => cy.contains(item)))

    cy.get('[aria-label="order by column departureStationName"]').click()
    page1Data.map((arr) => arr.map((item) => cy.contains(item)))
  })

  it('search input works', () => {
    const searchedPage = [
      ['Linnanmäki', 'Brahen puistikko', '3.34', '23.22'],
      ['Linnanmäki', 'Pohjolankatu', '3.25', '15.58'],
      ['Venttiilikuja', 'Linnanmäki', '4.35', '17.83'],
      ['Linnanmäki', 'Sörnäinen (M)', '2.37', '13.18'],
    ]

    cy.get('[id="table-search"]').type('Linna')
    searchedPage.map((arr) => arr.map((item) => cy.contains(item)))
  })
})

export {}
