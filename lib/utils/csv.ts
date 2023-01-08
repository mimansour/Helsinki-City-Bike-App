import * as fs from 'fs'
import path from 'path'
import { parse } from 'csv-parse/sync'
import Validator from 'fastest-validator'
import { BikeStation } from '../types/station'
import { BikeJourney } from '../types/journey'

export const getCsvFile = (dir: string, filePath: string) => {
  const dirPath = path.join(process.cwd(), dir)
  return fs.readFileSync(`${dirPath}/${filePath}`, 'utf8')
}

export const parseCsv = (headers: string[], csvFile: string) =>
  parse(csvFile, {
    delimiter: ',',
    columns: headers,
  })

export const parseJournies = () => {
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
  stationId: { type: 'number', convert: true },
  nameInFinnish: { type: 'string' },
  nameInSwedish: { type: 'string' },
  nameInEnglish: { type: 'string' },
  addressInFinnish: { type: 'string' },
  addressInSwedish: { type: 'string' },
  cityInFinnish: { type: 'string' },
  cityInSwedish: { type: 'string' },
  operator: { type: 'string' },
  capacity: { type: 'number', convert: true },
  x: { type: 'number', convert: true },
  y: { type: 'number', convert: true },
}

const validateJourney = v.compile(journeySchema)
const validateStation = v.compile(stationSchema)

const journeyIsValid = (journey: BikeJourney) =>
  typeof validateJourney(journey) === 'boolean'

const stationIsValid = (station: BikeStation) =>
  typeof validateStation(station) === 'boolean'

export const parseStations = () => {
  const headers = [
    'fid',
    'stationId',
    'nameInFinnish',
    'nameInSwedish',
    'nameInEnglish',
    'addressInFinnish',
    'addressInSwedish',
    'cityInFinnish',
    'cityInSwedish',
    'operator',
    'capacity',
    'x',
    'y',
  ]
  const file = getCsvFile('data/stations', 'helsinki-espoo-stations.csv')
  const result: BikeStation[] = parseCsv(headers, file)

  return result.filter(stationIsValid)
}
