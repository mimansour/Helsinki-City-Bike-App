import * as fs from 'fs'
import path from 'path'
import { parse, Callback } from 'csv-parse'

export const getCsvFile = (dir: string, filePath: string) => {
  const dirPath = path.join(process.cwd(), dir)
  return fs.readFileSync(`${dirPath}/${filePath}`, 'utf8')
}

type BikeJourney = {
  departureDate: string
  returnDate: string
  departureStationId: string
  departureStationName: string
  returnStationId: string
  returnStationName: string
  distance: number // in meters
  duration: number // in seconds
}

export const parseCsv = (
  headers: string[],
  csvFile: string,
  parseCallback: Callback
) => {
  parse(
    csvFile,
    {
      delimiter: ',',
      columns: headers,
    },
    parseCallback
  )
}

export const parseJournies = () => {
  const headers = [
    'departureDate',
    'returnDate',
    'departureStationId',
    'departureStationName',
    'returnStationId',
    'returnStationName',
    'distance',
    'duration',
  ]

  const file = getCsvFile('data/journies', '2021-05.csv')
  parseCsv(headers, file, (error, result: BikeJourney[]) => {
    if (error) {
      console.error(error)
    }
    console.log(result)
  })
}
