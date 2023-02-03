import fs from 'fs'
import path from 'path'
import { parse } from 'csv-parse/sync'
import Validator from 'fastest-validator'
import { BikeStation } from '../types/station'
import { BikeJourney } from '../types/journey'

export const parseStations = () => {
  const headers = [
    'fid',
    'stationId',
    'nameFi',
    'nameSv',
    'nameEn',
    'addressFi',
    'addressSv',
    'cityFi',
    'citySv',
    'operator',
    'capacity',
    'x',
    'y',
  ]
  const file = getCsvFile('data/stations', 'helsinki-espoo-stations.csv')
  const result: BikeStation[] = parseCsv(headers, file)

  return result.filter(stationIsValid)
}

export const parseJourneys = () => {
  const files = [
    '2021-05.csv',
    '2021-06-part1.csv',
    '2021-06-part2.csv',
    '2021-07-part1.csv',
    '2021-07-part2.csv',
  ]

  return files.reduce(
    (journeys, file) => [...journeys, ...parseFileJourneys(file)],
    [] as BikeJourney[]
  )
}

export const parseFileJourneys = (fileName: string) => {
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

  const file = getCsvFile('data/journeys', fileName)
  const result: BikeJourney[] = parseCsv(headers, file)

  return result.filter(journeyIsValid)
}

const getCsvFile = (dir: string, filePath: string) => {
  const dirPath = path.join(process.cwd(), dir)
  return fs.readFileSync(`${dirPath}/${filePath}`, 'utf8')
}

const parseCsv = (headers: string[], csvFile: string) =>
  parse(csvFile, {
    delimiter: ',',
    columns: headers,
  })

const journeyIsValid = (journey: BikeJourney) =>
  typeof validateJourney(journey) === 'boolean'

const stationIsValid = (station: BikeStation) =>
  typeof validateStation(station) === 'boolean'

const validator = new Validator()

const journeySchema = {
  departureDate: { type: 'date', convert: true },
  returnDate: { type: 'date', convert: true },
  departureStationId: { type: 'string', min: 1 },
  departureStationName: { type: 'string', min: 1 },
  returnStationId: { type: 'string', min: 1 },
  returnStationName: { type: 'string', min: 1 },
  duration: { type: 'number', min: 10, convert: true },
  distance: { type: 'number', min: 10, convert: true },
}

const stationSchema = {
  fid: { type: 'number', convert: true, positive: true },
  stationId: { type: 'string', min: 1 },
  nameFi: { type: 'string', min: 1 },
  nameSv: { type: 'string', min: 1 },
  nameEn: { type: 'string', min: 1 },
  addressFi: { type: 'string', min: 1 },
  addressSv: { type: 'string', min: 1 },
  cityFi: { type: 'string', min: 1 },
  citySv: { type: 'string', min: 1 },
  operator: { type: 'string', min: 1 },
  capacity: { type: 'number', convert: true, positive: true },
  x: { type: 'number', convert: true, positive: true },
  y: { type: 'number', convert: true, positive: true },
}

const validateJourney = validator.compile(journeySchema)
const validateStation = validator.compile(stationSchema)
