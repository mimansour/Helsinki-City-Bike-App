import { Journey } from '@prisma/client'

export const testStats = {
  returnStationsStats: {
    averageDistance: 111,
    totalJourneys: 111,
    topStationsNames: ['Test1', 'Test2', 'Test3', 'Test4', 'Test5'],
  },
  departureStationsStats: {
    averageDistance: 222,
    totalJourneys: 113,
    topStationsNames: ['Test6', 'Test7', 'Test8', 'Test9', 'Test10'],
  },
}

export const testJourneys = [
  {
    id: 1,
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
    id: 2,
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

const journeysToJsonData = (testJourneys: Journey[]) =>
  testJourneys.map((journey) => ({
    ...journey,
    departureDate: journey.departureDate.toISOString(),
    returnDate: journey.returnDate.toISOString(),
  }))

export const testJourneysJsonData = journeysToJsonData(testJourneys)
