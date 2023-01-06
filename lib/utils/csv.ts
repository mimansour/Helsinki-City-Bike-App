import * as fs from 'fs'
import path from 'path'
import { parse } from 'csv-parse/sync'
import Validator from 'fastest-validator'

export const getCsvFile = (dir: string, filePath: string) => {
  const dirPath = path.join(process.cwd(), dir)
  return fs.readFileSync(`${dirPath}/${filePath}`, 'utf8')
}

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

export const parseCsv = (headers: string[], csvFile: string): BikeJourney[] =>
  parse(csvFile, {
    delimiter: ',',
    columns: headers,
  })

export const parseJourniesFromCsv = () => {
  const files = ['2021-05.csv', '2021-06.csv', '2021-07.csv']

  return files.reduce(
    (journies, file) => [...journies, ...parseFileJournies(file)],
    [] as BikeJourney[]
  )
}

export const parseFileJournies = (fileName: string) => {
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

  const file = getCsvFile('data/journies', fileName)
  const result = parseCsv(headers, file)

  return result.filter(journeyIsValid)
}

const v = new Validator()

const journeySchema = {
  departureDate: { type: 'date', convert: true },
  returnDate: { type: 'date', convert: true },
  departureStationId: { type: 'string', min: 3 },
  departureStationName: { type: 'string' },
  returnStationId: { type: 'string', min: 3 },
  returnStationName: { type: 'string' },
  duration: { type: 'number', min: 10, convert: true },
  distance: { type: 'number', min: 10, convert: true },
}

const validateJourney = v.compile(journeySchema)

const journeyIsValid = (journey: BikeJourney) =>
  typeof validateJourney(journey) === 'boolean'
