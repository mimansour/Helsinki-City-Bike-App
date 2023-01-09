import { parseFileJournies, parseJournies, parseStations } from './csv'
import fs from 'fs'
import path from 'path'

const stationCsvFileHeader =
  'FID,ID,Nimi,Namn,Name,Osoite,Adress,Kaupunki,Stad,Operaattor,Kapasiteet,x,y'

const journeyCsvFileHeader =
  'Departure,Return,Departure station id,Departure station name,Return station id,Return station name,Covered distance (m),Duration (sec.)'

const dirPath = path.join(process.cwd(), 'data/journies')

describe('csv utils', () => {
  const readFileSyncSpy = jest.spyOn(fs, 'readFileSync')

  describe('station data parser', () => {
    it('parses stations data from local csv file', async () => {
      expect(parseStations()).toHaveLength(457)
    })

    it('parses valid rows', () => {
      readFileSyncSpy.mockReturnValueOnce(
        `${stationCsvFileHeader}
1,201,Test1,Test2,Test3,Test4,Test5,Test6,Test7,Test8,1,2,3
4,201,Test1,Test2,Test3,Test4,Test5,Test6,Test7,Test8,1,2,3
`
      )
      expect(parseStations()).toHaveLength(2)
    })

    it('filtes rows without required fields', () => {
      readFileSyncSpy.mockReturnValueOnce(
        `${stationCsvFileHeader}
,201,Test1,Test2,Test3,Test4,Test5,Test6,Test7,Test8,1,2,3
4,,Test1,Test2,Test3,Test4,Test5,Test6,Test7,Test8,1,2,3
4,201,,Test2,Test3,Test4,Test5,Test6,Test7,Test8,1,2,3
4,201,Test1,,Test3,Test4,Test5,Test6,Test7,Test8,1,2,3
4,201,Test1,Test2,,Test4,Test5,Test6,Test7,Test8,1,2,3
4,201,Test1,Test2,Test3,,Test5,Test6,Test7,Test8,1,2,3
4,201,Test1,Test2,Test3,Test4,,Test6,Test7,Test8,1,2,3
4,201,Test1,Test2,Test3,Test4,Test5,,Test7,Test8,1,2,3
4,201,Test1,Test2,Test3,Test4,Test5,Test6,,Test8,1,2,3
4,201,Test1,Test2,Test3,Test4,Test5,Test6,Test7,,1,2,3
4,201,Test1,Test2,Test3,Test4,Test5,Test6,Test7,Test8,,2,3
4,201,Test1,Test2,Test3,Test4,Test5,Test6,Test7,Test8,1,,3
4,201,Test1,Test2,Test3,Test4,Test5,Test6,Test7,Test8,1,2,`
      )
      expect(parseStations()).toHaveLength(0)
    })

    it('filter rows without positive number', () => {
      readFileSyncSpy.mockReturnValueOnce(
        `${stationCsvFileHeader}
-1,201,Test1,Test2,Test3,Test4,Test5,Test6,Test7,Test8,1,2,3
4,-1,Test1,Test2,Test3,Test4,Test5,Test6,Test7,Test8,1,2,3
4,201,Test1,Test2,Test3,Test4,Test5,Test6,Test7,Test8,-1,2,3
4,201,Test1,Test2,Test3,Test4,Test5,Test6,Test7,Test8,1,-1,3
4,201,Test1,Test2,Test3,Test4,Test5,Test6,Test7,Test8,1,2,-1
`
      )
      expect(parseStations()).toHaveLength(0)
    })
  })

  describe('journey data parser', () => {
    it('parses valid rows', () => {
      readFileSyncSpy.mockReturnValueOnce(
        `${journeyCsvFileHeader}
2021-06-20T21:58:28,2021-06-20T22:04:07,Test1,Test2,Test3,Test4,11,11
2021-06-20T21:58:28,2021-06-20T22:04:07,Test1,Test2,Test3,Test4,11,11
`
      )

      expect(parseFileJournies('test')).toHaveLength(2)
    })

    it('filters rows without required fields', () => {
      readFileSyncSpy.mockReturnValueOnce(
        `${journeyCsvFileHeader}
,2021-06-20T22:04:07,Test1,Test2,Test3,Test4,11,11
2021-06-20T21:58:28,,Test1,Test2,Test3,Test4,11,11
2021-06-20T21:58:28,2021-06-20T21:58:28,,Test2,Test3,Test4,11,11
2021-06-20T21:58:28,2021-06-20T21:58:28,Test1,,Test3,Test4,11,11
2021-06-20T21:58:28,2021-06-20T21:58:28,Test1,Test2,,Test4,11,11
2021-06-20T21:58:28,2021-06-20T21:58:28,Test1,Test2,Test3,,11,11
2021-06-20T21:58:28,2021-06-20T21:58:28,Test1,Test2,Test3,Test4,,11
2021-06-20T21:58:28,2021-06-20T21:58:28,Test1,Test2,Test3,Test4,11,
`
      )

      expect(parseFileJournies('test')).toHaveLength(0)
    })

    it('filters rows without valid dates', () => {
      readFileSyncSpy.mockReturnValueOnce(
        `${journeyCsvFileHeader}
2021-06-20T21:58:28,Test,Test1,Test2,Test3,Test4,11,11
`
      )

      expect(parseFileJournies('test')).toHaveLength(0)
    })

    it('filters rows without long enough duration', () => {
      readFileSyncSpy.mockReturnValueOnce(
        `${journeyCsvFileHeader}
2021-06-20T21:58:28,2021-06-20T21:58:28,Test1,Test2,Test3,Test4,7,11
2021-06-20T21:58:28,2021-06-20T21:58:28,Test1,Test2,Test3,Test4,10,11
`
      )

      expect(parseFileJournies('test')).toHaveLength(1)
    })

    it('filters rows without long enough distance', () => {
      readFileSyncSpy.mockReturnValueOnce(
        `${journeyCsvFileHeader}
2021-06-20T21:58:28,2021-06-20T21:58:28,Test1,Test2,Test3,Test4,11,7
2021-06-20T21:58:28,2021-06-20T21:58:28,Test1,Test2,Test3,Test4,11,10
`
      )

      expect(parseFileJournies('test')).toHaveLength(1)
    })

    it('calls correct files with correct path', () => {
      readFileSyncSpy.mockReturnValue(
        `${journeyCsvFileHeader}
2021-06-20T21:58:28,2021-06-20T21:58:28,Test1,Test2,Test3,Test4,11,10
2021-06-20T21:58:28,2021-06-20T21:58:28,Test1,Test2,Test3,Test4,11,10
`
      )
      parseJournies()

      const files = [
        '2021-05.csv',
        '2021-06-part1.csv',
        '2021-06-part2.csv',
        '2021-07-part1.csv',
        '2021-07-part2.csv',
      ]

      files.forEach((arg) =>
        expect(readFileSyncSpy).toHaveBeenCalledWith(
          `${dirPath}/${arg}`,
          'utf8'
        )
      )
    })
  })
})
