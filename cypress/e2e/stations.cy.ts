describe('Stations page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/stations')
  })
  const namesPage1 = [
    'Hanasaari',
    'Keilalahti',
    'Westendinasema',
    'Golfpolku',
    'Revontulentie',
    'Sateentie',
    'Hakalehto',
    'Oravannahkatori',
    'Länsituuli',
    'Tuulimäki',
  ]

  const namesPage2 = [
    'Tapionaukio',
    'Kulttuuriaukio',
    'Ahertajantie',
    'Mäntyviita',
    'Otsolahti',
    'Keilaniemi (M)',
    'Keilaranta',
    'Betonimies',
    'Tekniikantie',
    'Innopoli',
  ]

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
    const orderedDescNames = [
      'A.I. Virtasen aukio',
      'Aalto-yliopisto (M), Korkea',
      'Aalto-yliopisto (M), Tietot',
      'Abraham Wetterin tie',
      'Agnetankuja',
      'Agronominkatu',
      'Ahertajantie',
      'Ajomiehentie',
      'Ala-Malmin tori',
      'Alakiventie',
    ]

    const orderedAscNames = [
      'Ympyrätalo',
      'Yhdyskunnankuja',
      'Westendintie',
      'Westendinasema',
      'Väärämäentie',
      'Välimerenkatu',
      'Vähäntuvantie',
      'Vuosaaren puistopolku',
      'Vuosaaren liikuntapuisto',
      'Von Daehnin katu',
    ]

    namesPage1.map((name) => cy.contains(name))
    cy.get('[aria-label="order by column nameFi"]').click()
    orderedDescNames.map((name) => cy.contains(name))
    cy.get('[aria-label="order by column nameFi"]').click()
    orderedAscNames.map((name) => cy.contains(name))
  })

  it('search input works', () => {
    const searchedList = ['Linnakepolku', 'Linnanmäki', 'Hämeenlinnanväylä']

    namesPage1.map((name) => cy.contains(name))
    cy.get('[id="nameFi"]').type('Linna')
    searchedList.map((name) => cy.contains(name))
  })

  it('clicking station name navigates to single station view page', () => {
    cy.contains('Golfpolku').click()
    cy.get('h1').contains('Golfpolku')
    cy.get('h2').contains('Journeys starting from Golfpolku')
  })
})

export {}
