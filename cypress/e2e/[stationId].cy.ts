describe('Single Station Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/stations/505')
  })

  it('statistics rendered', () => {
    const startList = [
      'Journeys count:',
      '6316',
      'Average distance:',
      '2.88 km',
      'Top arrival stations',
      'Mellstenintie',
      'Tuulimäki',
      'Westendintie',
      'Suomenlahdentie',
      'Linnakepolku',
    ]

    const endList = [
      'Journeys count:',
      '6292',
      'Average distance:',
      '2.93 km',
      'Top departure stations',
      'Mellstenintie',
      'Tuulimäki',
      'Westendintie',
      'Suomenlahdentie',
      'Linnakepolku',
    ]
    cy.get('h1').contains('Westendinasema')
    cy.contains('Westendintie 1')
    startList.map((item) => cy.contains(item))
    endList.map((item) => cy.contains(item))
  })
})

export {}
