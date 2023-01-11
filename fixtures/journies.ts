import { Journey } from '@prisma/client'

export const testStats = {
  averageDistance: '111',
  totalJournies: 111,
  topPopularStations: [
    { departureStationName: 'Test' },
    { departureStationName: 'Test' },
    { departureStationName: 'Test' },
    { departureStationName: 'Test' },
    { departureStationName: 'Test' },
  ],
}

export const testJournies: Journey[] = [
  {
    id: '63bd6fb093149a28d7ab57e2',
    departureDate: new Date('2021-05-31T20:57:25.000Z'),
    returnDate: new Date('2021-05-31T21:05:46.000Z'),
    departureStationId: '094',
    departureStationName: 'Test1',
    returnStationId: '100',
    returnStationName: 'Test1',
    duration: 500,
    distance: 2043,
  },
  {
    id: '63bd6fb093149a28d7ab57e3',
    departureDate: new Date('2021-05-31T20:56:59.000Z'),
    returnDate: new Date('2021-05-31T21:07:14.000Z'),
    departureStationId: '082',
    departureStationName: 'Test2',
    returnStationId: '113',
    returnStationName: 'Test2',
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
