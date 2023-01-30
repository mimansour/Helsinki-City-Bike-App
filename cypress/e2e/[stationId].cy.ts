describe('Single Station Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/stations/505')
  })

  it('statistics rendered', () => {
    const startList = [
      'Total journies: 6316',
      'The average distance: 2.88 km',
      'Five most popular stations where journey ended:',
      'Mellstenintie',
      'Tuulimäki',
      'Westendintie',
      'Suomenlahdentie',
      'Linnakepolku',
    ]

    const endList = [
      'Total journies: 6292',
      'The average distance: 2.93 km',
      'Five most popular stations where journey ended:',
      'Mellstenintie',
      'Tuulimäki',
      'Westendintie',
      'Suomenlahdentie',
      'Linnakepolku',
    ]
    cy.get('h2').contains('Westendinasema')
    cy.contains('Station address: Westendintie 1')
    startList.map((item) => cy.contains(item))
    endList.map((item) => cy.contains(item))
  })
})

export {}
