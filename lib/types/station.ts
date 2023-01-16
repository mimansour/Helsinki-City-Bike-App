export type BikeStation = {
  fid: number
  stationId: string
  nameFi: string
  nameSv: string
  nameEn: string
  addressFi: string
  addressSv: string
  cityFi: string
  citySv: string
  operator: string
  capacity: number
  x: number
  y: number
}

export type BikeStationStats = {
  station: BikeStation
  stats: {
    returnStations: {
      averageDistance: number
      totalJournies: number
      topPopularStations: {
        departureStationName: string
      }[]
    }
    departureStations: {
      averageDistance: number
      totalJournies: number
      topPopularStations: {
        returnStationName: string
      }[]
    }
  }
}
