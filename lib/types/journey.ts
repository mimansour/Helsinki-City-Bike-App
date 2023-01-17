import { Journey } from '@prisma/client'

export type BikeJourney = {
  departureDate: string
  returnDate: string
  departureStationId: string
  departureStationName: string
  returnStationId: string
  returnStationName: string
  distance: number // in meters
  duration: number // in seconds
}

export type BikeJourneyPage = {
  journies: Journey[]
  params: {
    skip?: number
    sortByHeader?: string
    filterBy?: string
  }
}
