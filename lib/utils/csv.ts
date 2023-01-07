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

export const parseCsv = (headers: string[], csvFile: string) =>
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
  const result: BikeJourney[] = parseCsv(headers, file)

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

const stationSchema = {
  fid: { type: 'number', convert: true },
  id: { type: 'number', convert: true },
  nameInFinnish: { type: 'string' },
  nameInSwedish: { type: 'string' },
  nameInEnglish: { type: 'string' },
  addressInFinnish: { type: 'string' },
  addressInSwedish: { type: 'string' },
  cityInFinnish: { type: 'string' },
  cityInSwedish: { type: 'string' },
  operator: { type: 'string' },
  capasity: { type: 'number', convert: true },
  x: { type: 'number', convert: true },
  y: { type: 'number', convert: true },
}

const validateJourney = v.compile(journeySchema)
const validateStation = v.compile(stationSchema)

const journeyIsValid = (journey: BikeJourney) =>
  typeof validateJourney(journey) === 'boolean'

const stationIsValid = (station: StationInfo) =>
  typeof validateStation(station) === 'boolean'

export type StationInfo = {
  fid: number
  id: number
  nameInFinnish: string
  nameInSwedish: string
  nameInEnglish: string
  addressInFinnish: string
  addressInSwedish: string
  cityInFinnish: string
  cityInSwedish: string
  operator: string
  capasity: number
  x: number
  y: number
}

export const parseStations = () => {
  const headers = [
    'fid',
    'id',
    'nameInFinnish',
    'nameInSwedish',
    'nameInEnglish',
    'addressInFinnish',
    'addressInSwedish',
    'cityInFinnish',
    'cityInSwedish',
    'operator',
    'capasity',
    'x',
    'y',
  ]
  const file = getCsvFile('data/stations', 'helsinki-espoo-stations.csv')
  const result: StationInfo[] = parseCsv(headers, file)

  return result.filter(stationIsValid)
}
