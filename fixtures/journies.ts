import { Journey } from '@prisma/client'

export const testStats = {
  returnStations: {
    averageDistance: 110,
    totalJournies: 111,
    topPopularStations: [
      { departureStationName: 'Test1' },
      { departureStationName: 'Test2' },
      { departureStationName: 'Test3' },
      { departureStationName: 'Test4' },
      { departureStationName: 'Test5' },
    ],
  },
  departureStations: {
    averageDistance: 112,
    totalJournies: 113,
    topPopularStations: [
      { returnStationName: 'Test6' },
      { returnStationName: 'Test7' },
      { returnStationName: 'Test8' },
      { returnStationName: 'Test9' },
      { returnStationName: 'Test10' },
    ],
  },
}

export const testJournies = [
  {
    id: '63bd6fb093149a28d7ab57e2',
    departureDate: new Date('2021-05-31T20:57:25.000Z'),
    returnDate: new Date('2021-05-31T21:05:46.000Z'),
    departureStationId: '094',
    departureStationName: 'TestDepartureName',
    returnStationId: '100',
    returnStationName: 'TestReturnName',
    duration: 500,
    distance: 2043,
  },
  {
    id: '63bd6fb093149a28d7ab57e3',
    departureDate: new Date('2021-05-31T20:56:59.000Z'),
    returnDate: new Date('2021-05-31T21:07:14.000Z'),
    departureStationId: '082',
    departureStationName: 'Test2DepartureName',
    returnStationId: '113',
    returnStationName: 'Test2ReturnName',
    duration: 611,
    distance: 1870,
  },
]

const journiesToJsonData = (testJournies: Journey[]) =>
  testJournies.map((journey) => ({
    ...journey,
    departureDate: journey.departureDate.toISOString(),
    returnDate: journey.returnDate.toISOString(),
  }))

export const testJourniesJsonData = journiesToJsonData(testJournies)
